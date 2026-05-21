import React from 'react';

export default function Problem() {
  return (
    <section className="section" id="problem">
      <div className="container">
        <div className="section-header scroll-reveal">
          <div className="section-subtitle">Масштаб вызова</div>
          <h2>Почему забота на расстоянии <span className="text-alt-highlight">не работает</span> без умных помощников?</h2>
          <p>
            Ежедневный домашний уход за пожилыми людьми — это десятки мелких, но жизненно важных задач: 
            контроль лекарств, фиксация давления, мониторинг симптомов. В суете дней родственники 
            физически не могут контролировать каждый шаг близкого человека.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: 11.8M & 42.6% */}
          <div className="bento-card col-8 scroll-reveal-card tilt-glow-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon">
                <i className="fa-solid fa-house-chimney-user"></i>
              </div>
              <span className="card-tag">Демография России</span>
              <h3>11.8 миллионов одиноких сердец</h3>
              <p>
                По данным демографических исследований в России, более 11.8 млн домохозяйств состоят 
                из одного человека. Из них <strong>42.6%</strong> — это люди старше трудоспособного возраста. Миллионы 
                пожилых людей каждый день остаются наедине с риском внезапного ухудшения здоровья.
              </p>
            </div>
            <div className="card-metric">42.6%</div>
          </div>

          {/* Card 2: 52.5% Drug Compliance */}
          <div className="bento-card col-4 scroll-reveal-card tilt-glow-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon secondary">
                <i className="fa-solid fa-pills"></i>
              </div>
              <span className="card-tag secondary">Приверженность терапии</span>
              <h3>Половина таблеток пропускается</h3>
              <p>
                Уровень приверженности терапии у пожилых пациентов составляет всего <strong>52.5%</strong>. Почти половина 
                прописанных лекарств забывается или принимается не вовремя, сводя на нет результаты лечения.
              </p>
            </div>
            <div className="card-metric secondary">52.5%</div>
          </div>

          {/* Card 3: +15% Risk */}
          <div className="bento-card col-4 scroll-reveal-card tilt-glow-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <span className="card-tag">Риски усложнения</span>
              <h3>Множественная терапия</h3>
              <p>
                При назначении 9 и более препаратов риск критического нарушения режима приема возрастает 
                на <strong>15%</strong>. Схемы усложняются, а самоконтроль с возрастом снижается.
              </p>
            </div>
            <div className="card-metric">+15%</div>
          </div>

          {/* Card 4: 24% Senior demographic */}
          <div className="bento-card col-8 scroll-reveal-card tilt-glow-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-icon secondary">
                <i className="fa-solid fa-users"></i>
              </div>
              <span className="card-tag secondary">Анализ текущих методов</span>
              <h3>Ограничения стандартного контроля</h3>
              <p>
                Люди старше трудоспособного возраста составляют более <strong>24%</strong> населения. Звонки раз в день 
                и бумажные блокноты не формируют единую медицинскую картину. Они не улавливают плавное 
                ухудшение самочувствия, а главное — не способны автоматически отправить сигнал тревоги 
                родственникам или врачу при возникновении опасных признаков.
              </p>
            </div>
            <div className="card-metric secondary">24%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
