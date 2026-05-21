import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Simulator({ lenis }) {
  // Scenarios data
  const scenarios = {
    good: {
      userMessage: "Да, 120/80, всё отлично, чувствую себя хорошо!",
      botReply: "Замечательно, Мария Ивановна! Показатели идеальные. Я сохранил данные в ваш журнал и отправил отчёт Константину. Продолжайте в том же духе!",
      alertClass: "status-good",
      alertIcon: <i className="fa-solid fa-circle-check"></i>,
      alertTitle: "Статус: Всё в порядке",
      alertDesc: "Мария Ивановна подтвердила хорошее самочувствие.",
      pressure: "120/80 мм рт. ст.",
      logs: [
        { time: "17:50", text: "Вход в приложение" },
        { time: "17:51", text: "Голосовое подтверждение: Жалоб нет" },
        { time: "17:51", text: "Внесено измерение давления: 120/80 (Норма)" },
        { time: "17:51", text: "Родственники уведомлены: данные стабильны" }
      ]
    },
    bad: {
      userMessage: "Давление высокое, 165/95, сильно кружится голова...",
      botReply: "Мария Ивановна, пожалуйста, присядьте или прилягте и постарайтесь расслабиться. Я немедленно отправляю критический сигнал тревоги Константину. Он уже связывается с вами!",
      alertClass: "status-danger",
      alertIcon: <i className="fa-solid fa-triangle-exclamation"></i>,
      alertTitle: "ТРЕВОГА: Высокое давление!",
      alertDesc: "Обнаружен критический симптом: головокружение и гипертония.",
      pressure: "165/95 мм рт. ст.",
      logs: [
        { time: "17:50", text: "Вход в приложение" },
        { time: "17:51", text: "Голосовой ответ: Жалобы на головокружение" },
        { time: "17:51", text: "КРИТИЧЕСКИЙ ПОКАЗАТЕЛЬ: Давление 165/95" },
        { time: "17:51", text: "Запущена мгновенная эскалация близким (SMS + Звонки)" },
        { time: "17:52", text: "Сын (Константин) принял вызов оповещения" }
      ]
    },
    skip: {
      userMessage: "Забыла сегодня измерить, совсем из головы вылетело...",
      botReply: "Ничего страшного, Мария Ивановна! Дела подождут, здоровье важнее. Пожалуйста, измерьте давление, когда освободитесь, а я напомню вам через часик.",
      alertClass: "status-warning",
      alertIcon: <i className="fa-solid fa-circle-question"></i>,
      alertTitle: "Внимание: Замер пропущен",
      alertDesc: "Мария Ивановна пропустила утреннюю проверку давления.",
      pressure: "Пропущено",
      logs: [
        { time: "17:50", text: "Вход в приложение" },
        { time: "17:51", text: "Голосовое сообщение: Замер забыт" },
        { time: "17:51", text: "Предупреждение: утренний чек-лист не заполнен" },
        { time: "17:51", text: "Семья уведомлена об отсутствии планового замера" }
      ]
    }
  };

  // State
  const [messages, setMessages] = useState([
    { type: 'system', text: 'Диалог начат. CareMate AI анализирует состояние...' },
    { type: 'bot', text: 'Мария Ивановна, здравствуйте! Как ваше давление сегодня? Вы измерили его утром?' }
  ]);
  const [activeScenario, setActiveScenario] = useState(null); // 'good', 'bad', 'skip'
  const [dashboardState, setDashboardState] = useState('waiting'); // 'waiting', 'analyzing', 'active'
  const [currentTime, setCurrentTime] = useState('');
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll phone chat container to the bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, dashboardState]);

  const handleAction = (type) => {
    const data = scenarios[type];
    if (!data) return;

    setActiveScenario(type);
    
    // 1. Append senior's message
    setMessages(prev => [...prev, { type: 'user', text: data.userMessage }]);
    
    // 2. Set dashboard to analyzing state
    setDashboardState('analyzing');

    // Scroll main window slightly down to keep simulator in absolute center
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo('.simulator-layout', { offset: -60, duration: 1.2 });
      } else {
        const layoutEl = document.querySelector('.simulator-layout');
        if (layoutEl) {
          window.scrollTo({
            top: layoutEl.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      }
    }, 50);

    // 3. Natural delay to simulate speech/AI computation
    setTimeout(() => {
      // Append bot's reply
      setMessages(prev => [...prev, { type: 'bot', text: data.botReply }]);
      
      // Update dashboard state
      setDashboardState('active');
      
      // Format current time
      const now = new Date();
      setCurrentTime(`${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);

      // Scroll main window further down to bring the newly loaded logs and alerts into full screen view
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo('.db-logs-panel', { offset: -180, duration: 1.2 });
        } else {
          const logsEl = document.querySelector('.db-logs-panel');
          if (logsEl) {
            const absoluteTop = logsEl.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: absoluteTop - 180,
              behavior: 'smooth'
            });
          }
        }
      }, 100);
    }, 1500);
  };

  const handleReset = () => {
    setMessages([
      { type: 'system', text: 'Диалог начат. CareMate AI анализирует состояние...' },
      { type: 'bot', text: 'Мария Ивановна, здравствуйте! Как ваше давление сегодня? Вы измерили его утром?' }
    ]);
    setActiveScenario(null);
    setDashboardState('waiting');

    // Scroll main window back to top of simulator section
    if (lenis) {
      lenis.scrollTo('#simulator', { offset: -80, duration: 1.0 });
    } else {
      const simEl = document.querySelector('#simulator');
      if (simEl) {
        window.scrollTo({
          top: simEl.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  const scenarioData = activeScenario ? scenarios[activeScenario] : null;

  return (
    <section className="section" id="simulator">
      <div className="container">
        <div className="section-header scroll-reveal">
          <div className="section-subtitle">Живой симулятор</div>
          <h2>Почувствуйте заботу в <span className="text-highlight">действии</span></h2>
          <p>
            Слева — интерфейс голосового помощника на телефоне Марии Ивановны (82 года). 
            Справа — семейный дашборд в реальном времени на компьютере ее сына Константина. 
            **Выберите вариант ответа мамы и посмотрите, как сработает система.**
          </p>
        </div>

        <div className="simulator-layout">
          {/* LEFT COLUMN: ELDERLY PHONE MOCKUP */}
          <div className="phone-mockup scroll-reveal-left">
            <div className="phone-header">
              <div className="phone-user-profile">
                <div className="phone-avatar">МИ</div>
                <span>Мария Ивановна (Мама)</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <i className="fa-solid fa-wifi"></i>
                <i className="fa-solid fa-battery-three-quarters"></i>
              </div>
            </div>

            <div ref={chatContainerRef} className="phone-chat">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`sim-msg ${
                    msg.type === 'system' ? 'system-msg' : msg.type === 'user' ? 'user-msg' : 'bot-msg'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {dashboardState === 'analyzing' && (
                <div className="sim-msg bot-msg" style={{ alignSelf: 'flex-start', display: 'flex', gap: '6px', alignItems: 'center', padding: '12px 18px', borderBottomLeftRadius: '4px' }}>
                  <span className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: '#e5e5e5', borderRadius: '50%', display: 'inline-block', animation: 'jumping-dots 1.4s infinite ease-in-out' }}></span>
                  <span className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: '#e5e5e5', borderRadius: '50%', display: 'inline-block', animation: 'jumping-dots 1.4s infinite ease-in-out', animationDelay: '0.2s' }}></span>
                  <span className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: '#e5e5e5', borderRadius: '50%', display: 'inline-block', animation: 'jumping-dots 1.4s infinite ease-in-out', animationDelay: '0.4s' }}></span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="phone-controls">
              {!activeScenario ? (
                <>
                  <button className="sim-action-btn" onClick={() => handleAction('good')}>
                    <span className="pulse-mic" style={{ display: 'inline-flex', padding: '6px', background: 'oklch(0.58 0.18 245 / 0.1)', borderRadius: '50%', marginRight: '8px' }}>
                      <i className="fa-solid fa-microphone text-highlight"></i>
                    </span>
                    <span>«Всё отлично, 120/80, чувствую себя хорошо»</span>
                  </button>
                  <button className="sim-action-btn" onClick={() => handleAction('bad')}>
                    <span className="pulse-mic" style={{ display: 'inline-flex', padding: '6px', background: 'oklch(0.72 0.14 210 / 0.1)', borderRadius: '50%', marginRight: '8px' }}>
                      <i className="fa-solid fa-microphone text-alt-highlight"></i>
                    </span>
                    <span>«Давление высокое 165/95, кружится голова»</span>
                  </button>
                  <button className="sim-action-btn" onClick={() => handleAction('skip')}>
                    <span className="pulse-mic" style={{ display: 'inline-flex', padding: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginRight: '8px' }}>
                      <i className="fa-solid fa-microphone" style={{ color: '#888' }}></i>
                    </span>
                    <span>«Забыла измерить давление сегодня»</span>
                  </button>
                </>
              ) : (
                <button 
                  id="sim-reset-btn" 
                  className="sim-action-btn" 
                  onClick={handleReset} 
                  style={{ justifyContent: 'center', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                >
                  <i className="fa-solid fa-rotate-left"></i> Пройти симуляцию заново
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: FAMILY DASHBOARD PANEL */}
          <div className="dashboard-mockup scroll-reveal-right">
            <div className="dashboard-header">
              <div className="dashboard-title">
                <h4>Личный кабинет: Константин (Сын)</h4>
              </div>
              <div className="dashboard-timestamp">
                Сегодня, {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
              </div>
            </div>

            {/* WAITING STATE */}
            {dashboardState === 'waiting' && (
              <div className="dashboard-empty">
                <div className="empty-icon">
                  <i className="fa-solid fa-spinner"></i>
                </div>
                <h4>Ожидание действий Марии Ивановны</h4>
                <p>
                  Как только Мария Ивановна ответит на утренний запрос голосового ИИ-помощника, 
                  здесь моментально обновится статус активности и загрузятся показатели здоровья.
                </p>
              </div>
            )}

            {/* ANALYZING STATE */}
            {dashboardState === 'analyzing' && (
              <div className="dashboard-empty">
                <div className="empty-icon">
                  <i className="fa-solid fa-circle-notch fa-spin text-primary"></i>
                </div>
                <h4>Анализируем ответы и акустический профиль...</h4>
                <p>
                  Нейросеть CareMate AI извлекает показатели давления из речи, проверяет наличие жалоб 
                  и сопоставляет частотный спектр голоса с базовым профилем Марии Ивановны на предмет усталости.
                </p>
              </div>
            )}

            {/* ACTIVE STATE */}
            {dashboardState === 'active' && scenarioData && (
              <div className="dashboard-active">
                {/* Alert Card */}
                <div className={`alert-status-card ${scenarioData.alertClass}`}>
                  <div className="alert-card-icon">{scenarioData.alertIcon}</div>
                  <div className="alert-card-details">
                    <h5>{scenarioData.alertTitle}</h5>
                    <p>{scenarioData.alertDesc}</p>
                  </div>
                </div>

                {/* Grid Metrics */}
                <div className="db-metrics-grid">
                  <div className="db-metric-card">
                    <div className="db-metric-label">Тонометр (Давление)</div>
                    <div className="db-metric-value">{scenarioData.pressure}</div>
                  </div>
                  <div className="db-metric-card">
                    <div className="db-metric-label">Время ответа мамы</div>
                    <div className="db-metric-value">{currentTime}</div>
                  </div>
                </div>

                {/* Event Logs */}
                <div className="db-logs-panel">
                  <h5>Журнал событий (Сегодня)</h5>
                  <ul className="db-log-list">
                    {scenarioData.logs.map((log, i) => (
                      <li key={i}>
                        <span className="time">{log.time}</span>
                        <span>{log.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
