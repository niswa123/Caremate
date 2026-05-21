import React from 'react';

export default function Hero({ lenis }) {
  const handleCtaClick = (e, targetId) => {
    e.preventDefault();
    if (lenis) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
      }
    } else {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title" style={{ marginTop: '24px', lineHeight: 1.15 }}>
            <span className="word-reveal-line" style={{ display: 'block', overflow: 'hidden', paddingBottom: '4px' }}>
              <span className="word-reveal-item" style={{ display: 'inline-block', transformOrigin: 'left center', willChange: 'transform, opacity' }}>
                Забота, которая всегда <span className="text-highlight">рядом</span>.
              </span>
            </span>
            <span className="word-reveal-line" style={{ display: 'block', overflow: 'hidden', paddingBottom: '4px' }}>
              <span className="word-reveal-item" style={{ display: 'inline-block', transformOrigin: 'left center', willChange: 'transform, opacity' }}>
                Интеллект, который <span className="text-alt-highlight">слышит</span>.
              </span>
            </span>
          </h1>
          <p className="hero-desc fade-in">
            Интеллектуальный комплекс домашнего сопровождения пожилых людей. Мы соединяем передовые 
            голосовые ИИ-технологии и заботливый семейный мониторинг, даря близким абсолютное спокойствие, 
            а сеньорам — искреннее общение и поддержку 24/7.
          </p>
          <div className="hero-actions fade-in">
            <a href="#simulator" className="btn btn-primary" onClick={(e) => handleCtaClick(e, '#simulator')}>
              Попробовать симулятор <i className="fa-solid fa-play"></i>
            </a>
            <a href="#team" className="btn btn-secondary" onClick={(e) => handleCtaClick(e, '#team')}>
              Выбрать тариф
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
