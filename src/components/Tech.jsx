import React from 'react';

export default function Tech() {
  const specs = [
    {
      title: "Эмоциональная поддержка",
      tech: "Умное AI-сопровождение",
      icon: "fa-solid fa-heart-pulse",
      desc: "Наш интеллектуальный ассистент регулярно ведет теплые беседы на естественном языке, помогает преодолевать чувство одиночества и заботливо напоминает о приятных мелочах."
    },
    {
      title: "Контроль терапии",
      tech: "Умные напоминания о лекарствах",
      icon: "fa-solid fa-kit-medical",
      desc: "Мягкие и настойчивые голосовые напоминания о необходимости принять медикаменты. Система автоматически фиксирует подтверждения и ведет подробный медицинский журнал."
    },
    {
      title: "Мгновенные оповещения",
      tech: "Абсолютная безопасность близких",
      icon: "fa-solid fa-shield-halved",
      desc: "Многоканальная система экстренной связи в Telegram, через SMS или автоматические звонки. В случае пропущенного замера или тревожной жалобы семья узнает об этом менее чем за минуту."
    },
    {
      title: "Надежность и приватность",
      tech: "Защита данных по стандарту 152-ФЗ",
      icon: "fa-solid fa-user-lock",
      desc: "Вся информация шифруется и хранится в защищенном облачном контуре на серверах в РФ. Мы гарантируем абсолютную конфиденциальность и безопасность личных данных вашей семьи."
    }
  ];

  return (
    <section className="section" id="tech">
      <div className="container">
        <div className="section-header scroll-reveal">
          <div className="section-subtitle">Почему выбирают нас</div>
          <h2>Забота, построенная на <span className="text-highlight">доверии и технологиях</span></h2>
          <p>
            Мы разработали систему, которая решает реальные проблемы семей, обеспечивая постоянную 
            связь между поколениями, душевное спокойствие для близких и профессиональный контроль самочувствия.
          </p>
        </div>

        <div className="tech-grid">
          {specs.map((spec, index) => (
            <div className="tech-card scroll-reveal-card tilt-glow-card" key={index}>
              <div className="tech-icon">
                <i className={spec.icon}></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '4px' }}>{spec.title}</h3>
              <div style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '16px', fontFamily: 'var(--font-accent)' }}>
                {spec.tech}
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>{spec.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
