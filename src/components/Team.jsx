import React from 'react';

export default function Team() {
  const teamMembers = [
    {
      role: "Руководитель проекта",
      name: "Иващенко Егор",
      desc: "Управление командой, проектирование продуктовых циклов, разработка архитектурных требований, GR и партнерство с медицинскими службами."
    },
    {
      role: "Фулстэк-разработчик",
      name: "Щербова Ангелина",
      desc: "Разработка высоконагруженного бэкенда на Go, баз данных PostgreSQL и интеграционного API для мобильного клиента на React Native."
    },
    {
      role: "Дизайнер",
      name: "Добрыдник Кирилл",
      desc: "Исследования эргономики пожилых пользователей, создание тактильных, легко читаемых интерфейсов, снижающих барьер взаимодействия."
    },
    {
      role: "Медицинский консультант",
      name: "Елизавета Запрудина",
      desc: "Врач-геронтолог с 4-летней клинической практикой. Экспертиза в разработке чек-листов и алгоритмов сценарной оценки жалоб."
    }
  ];

  return (
    <section className="section" id="team" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="team-layout">
          {/* Left Column: Team Structure */}
          <div>
            <div className="section-header scroll-reveal" style={{ marginBottom: '40px' }}>
              <div className="section-subtitle">Основатели и Команда</div>
              <h2>Кто создает будущее <span className="text-highlight">домашней заботы</span>?</h2>
              <p style={{ marginBottom: '32px' }}>
                Мы — команда единомышленников, объединившая разработчиков, дизайнеров и медицинских 
                консультантов для решения важной социальной проблемы.
              </p>
            </div>

            <div className="members-grid">
              {teamMembers.map((member, index) => (
                <div className="member-card scroll-reveal-card tilt-glow-card" key={index}>
                  <div className="member-role">{member.role}</div>
                  <div className="member-name">{member.name}</div>
                  <p className="member-desc">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pricing Plans Card */}
          <div className="grant-card scroll-reveal-right tilt-glow-card" style={{ borderColor: 'var(--primary)' }}>
            <div className="grant-badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderColor: 'var(--primary-border)' }}>
              Тарифные планы
            </div>
            <h3 style={{ marginBottom: '8px' }}>Гибкие решения для заботы</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Выберите оптимальный формат поддержки ваших близких или внедрения платформы в вашем учреждении.
            </p>

            <div className="pricing-plans-stack" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              {/* Plan 1: B2C */}
              <div className="pricing-plan-item" style={{ 
                padding: '16px', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '12px',
                border: '1px solid var(--border)',
                transition: 'border-color 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-house-chimney" style={{ color: 'var(--primary)' }}></i>
                    Семейный
                  </div>
                  <div style={{ 
                    fontWeight: 800, 
                    fontSize: '1.1rem', 
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-accent)'
                  }}>
                    990 ₽ <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-tertiary)' }}>/ мес.</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  Для 1 пожилого человека. Голосовой ИИ-компаньон, напоминания о лекарствах, умная аналитика жалоб и оповещения близких в Telegram.
                </p>
              </div>

              {/* Plan 2: B2B */}
              <div className="pricing-plan-item" style={{ 
                padding: '16px', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '12px',
                border: '1px solid var(--border)',
                transition: 'border-color 0.3s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <i className="fa-solid fa-building-user" style={{ color: 'var(--secondary)' }}></i>
                    Корпоративный
                  </div>
                  <div style={{ 
                    fontWeight: 800, 
                    fontSize: '1.05rem', 
                    color: 'var(--secondary)',
                    fontFamily: 'var(--font-accent)'
                  }}>
                    Индивидуально
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                  Для пансионатов, клиник и социальных служб. Интеграция с МИС, панель оператора на 100+ пациентов, мониторинг через IoT-датчики.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="#contact" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={(e) => {
                  e.preventDefault();
                  const contactEl = document.querySelector('#contact');
                  if (contactEl) {
                    window.scrollTo({
                      top: contactEl.offsetTop - 80,
                      behavior: 'smooth'
                    });
                    // Focus name field if it exists
                    setTimeout(() => {
                      const nameInput = document.getElementById('form-name');
                      if (nameInput) nameInput.focus();
                    }, 800);
                  }
                }}
              >
                Оформить подписку <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                * Первые 14 дней бесплатно. Отмена в любой момент.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
