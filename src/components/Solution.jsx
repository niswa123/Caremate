import React, { useState, useEffect } from 'react';

export default function Solution() {
  const solutions = [
    {
      num: "01",
      title: "Лекарственная приверженность",
      icon: "fa-solid fa-clock",
      desc: "Умные голосовые напоминания и простые чек-листы приема лекарств. Сокращают количество пропусков препаратов не менее чем на 30% за счет мягкого голосового контакта."
    },
    {
      num: "02",
      title: "Мониторинг самочувствия",
      icon: "fa-solid fa-heart-pulse",
      desc: "Ежедневные быстрые опросы о давлении, пульсе и настроении. Анализ свободных голосовых жалоб пожилого человека и перевод их в структурированные медицинские маркеры."
    },
    {
      num: "03",
      title: "ИИ-компаньон 24/7",
      icon: "fa-solid fa-comments",
      desc: "Виртуальный собеседник с теплым тоном общения, который готов поговорить, обсудить погоду, напомнить о делах и незаметно вовлечь пожилого человека в заботу о здоровье."
    },
    {
      num: "04",
      title: "Мгновенная эскалация",
      icon: "fa-solid fa-bell",
      desc: "При фиксации высокого давления, сильного головокружения или отсутствии ответов на важные чек-листы система автоматически отправляет тревожное SMS, email и звонит сыну или врачу менее чем за 1 минуту."
    },
    {
      num: "05",
      title: "Семейный дашборд",
      icon: "fa-solid fa-chart-line",
      desc: "Интуитивный веб-кабинет для родственников. История приемов, динамика самочувствия, аналитика активности и архив предупреждений в простом виде, без сложной терминологии."
    },
    {
      num: "06",
      title: "Безопасность по 152-ФЗ",
      icon: "fa-solid fa-shield-halved",
      desc: "Хранение и обработка медицинских и личных данных осуществляются в сертифицированном облаке на территории РФ. Полная независимость от зарубежных API."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [maxIndex, setMaxIndex] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
        setMaxIndex(solutions.length - 1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
        setMaxIndex(solutions.length - 2);
      } else {
        setVisibleCount(3);
        setMaxIndex(solutions.length - 3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [solutions.length]);

  // Handle resetting index if it exceeds maxIndex on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  // Dragging / Swipe touch support for mobile & tablet
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    const swipeThreshold = 50; // min distance in px for swipe
    if (diff > swipeThreshold) {
      // Swiped left -> Next
      handleNext();
    } else if (diff < -swipeThreshold) {
      // Swiped right -> Prev
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const gap = 32;
  const slideWidthStyle = {
    flex: `0 0 calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`
  };

  const trackTranslate = `translate3d(calc(-${currentIndex} * ((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount} + ${gap}px)), 0, 0)`;
  const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;

  return (
    <section className="section" id="solutions" style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', gap: '40px' }} className="scroll-reveal">
          <div className="section-header" style={{ marginBottom: 0, maxWidth: '650px', textAlign: 'left' }}>
            <div className="section-subtitle">Наше решение</div>
            <h2 style={{ marginBottom: '16px' }}>CareMate AI — это комплексная экосистема заботы</h2>
            <p style={{ margin: 0 }}>
              Мы не просто напоминалка для таблеток. Продукт объединяет мобильное приложение для сеньора, 
              ИИ-анализ голоса, облачный сервер оповещений и спокойствие для его семьи.
            </p>
          </div>
          
          <div className="slider-controls" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
            <button 
              className="slider-btn" 
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Предыдущий слайд"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button 
              className="slider-btn" 
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Следующий слайд"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div 
          className="solutions-slider-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="solutions-slider-track" 
            style={{ transform: trackTranslate }}
          >
            {solutions.map((sol, index) => (
              <div 
                className="solution-slide solution-item scroll-reveal-card tilt-glow-card" 
                style={slideWidthStyle}
                key={index}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span className="solution-num">{sol.num}</span>
                  <div className="card-icon" style={{ marginBottom: 0, width: '44px', height: '44px', borderRadius: '12px', fontSize: '1.2rem' }}>
                    <i className={sol.icon}></i>
                  </div>
                </div>
                <h3>{sol.title}</h3>
                <p>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Bottom Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }} className="scroll-reveal">
          <div className="slider-progress-container" style={{ width: '200px', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
            <div 
              className="slider-progress-bar" 
              style={{ 
                width: `${progressPercent}%`, 
                height: '100%', 
                backgroundColor: 'var(--primary)', 
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '2px' 
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
