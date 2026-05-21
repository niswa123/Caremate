import React, { useState } from 'react';

export default function Footer({ lenis }) {
  // Form State
  const [formState, setFormState] = useState('idle'); // 'idle', 'submitting', 'success'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');

    // Simulate API request delay
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', org: '', message: '' });
    }, 1200);
  };

  const handleLinkClick = (e, targetId) => {
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
    <>
      {/* ==========================================================================
         CONTACT & PARTNERSHIP SECTION
         ========================================================================== */}
      <section className="section" id="contact">
        <div className="container">
          <div className="contact-layout">
            <div className="scroll-reveal-left">
              <div className="section-subtitle">Сотрудничество</div>
              <h2>Давайте создавать заботу <span className="text-highlight">вместе</span></h2>
              <p style={{ marginBottom: '24px' }}>
                Мы активно пилотируем систему и ищем стратегических партнеров среди частных клиник, 
                пансионатов, страховых компаний и региональных социальных служб.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)' }}>
                Заполните форму обратной связи — наш представитель свяжется с вами для демонстрации 
                полнофункционального личного кабинета и обсуждения вариантов интеграции.
              </p>
            </div>

            {/* Form Card */}
            <div className="form-card scroll-reveal-right">
              {formState !== 'success' ? (
                <form id="partner-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-name">Ваше имя *</label>
                    <input 
                      type="text" 
                      id="form-name" 
                      name="name" 
                      className="form-input" 
                      required 
                      placeholder="Александр Иванов"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-email">Электронная почта *</label>
                    <input 
                      type="email" 
                      id="form-email" 
                      name="email" 
                      className="form-input" 
                      required 
                      placeholder="example@mail.ru"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-org">Организация</label>
                    <input 
                      type="text" 
                      id="form-org" 
                      name="org" 
                      className="form-input" 
                      placeholder="Клиника «Здоровье»"
                      value={formData.org}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="form-msg">Сообщение</label>
                    <textarea 
                      id="form-msg" 
                      name="message" 
                      className="form-input" 
                      placeholder="Опишите ваши задачи и сферу интересов..."
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary form-submit-btn"
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin"></i> Отправка...
                      </>
                    ) : (
                      <>
                        Отправить запрос <i className="fa-solid fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div id="form-success" className="form-success">
                  <div className="form-success-icon">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <h3>Запрос успешно отправлен!</h3>
                  <p>
                    Благодарим вас за проявленный интерес к проекту CareMate AI. Наша команда свяжется 
                    с вами по указанной почте в течение 24 часов.
                  </p>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setFormState('idle')} 
                    style={{ marginTop: '24px' }}
                  >
                    Отправить еще раз
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER
         ========================================================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <a href="#" className="logo-link" onClick={(e) => handleLinkClick(e, '#root')}>
                <span>CareMate <span className="text-highlight">AI</span></span>
              </a>
              <p className="footer-brand-text">
                Интеллектуальный комплекс домашнего сопровождения и заботы о пожилых людях на основе голосового ИИ.
              </p>
            </div>

            <div className="footer-links-col">
              <h4>Навигация</h4>
              <ul className="footer-links-list">
                <li><a href="#problem" onClick={(e) => handleLinkClick(e, '#problem')}>Проблема</a></li>
                <li><a href="#solutions" onClick={(e) => handleLinkClick(e, '#solutions')}>Решения</a></li>
                <li><a href="#simulator" onClick={(e) => handleLinkClick(e, '#simulator')}>Симулятор</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>Технологии</h4>
              <ul className="footer-links-list">
                <li><a href="#tech" onClick={(e) => handleLinkClick(e, '#tech')}>Стек архитектуры</a></li>
                <li><a href="#tech" onClick={(e) => handleLinkClick(e, '#tech')}>Безопасность ИИ</a></li>
                <li><a href="#team" onClick={(e) => handleLinkClick(e, '#team')}>Наша команда</a></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4>Связь</h4>
              <ul className="footer-links-list">
                <li><a href="mailto:support@caremate.ai"><i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i> support@caremate.ai</a></li>
                <li><span style={{ fontSize: '0.95rem' }}><i className="fa-solid fa-location-dot" style={{ marginRight: '8px' }}></i> Симферополь, Россия</span></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              &copy; {new Date().getFullYear()} CareMate AI. Все права защищены.
            </div>
            <div>
              Инновационные технологии для безопасной и заботливой жизни пожилых людей.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
