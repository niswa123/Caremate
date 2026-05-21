import React, { useState } from 'react';

export default function Header({ theme, onToggleTheme, lenis }) {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMobileMenu = () => {
    const nextState = !menuActive;
    setMenuActive(nextState);
    if (lenis) {
      if (nextState) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuActive(false);
    if (lenis) {
      lenis.start();
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
    <header className="header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100 }}>
      <div className="container header-container">
        <a href="#" className="logo-link" onClick={(e) => handleLinkClick(e, '#root')}>
          <span>CareMate <span className="text-highlight">AI</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-menu">
          <a href="#problem" className="nav-link" onClick={(e) => handleLinkClick(e, '#problem')}>Проблема</a>
          <a href="#solutions" className="nav-link" onClick={(e) => handleLinkClick(e, '#solutions')}>Решение</a>
          <a href="#simulator" className="nav-link" onClick={(e) => handleLinkClick(e, '#simulator')}>Симулятор</a>
          <a href="#tech" className="nav-link" onClick={(e) => handleLinkClick(e, '#tech')}>Технологии</a>
          <a href="#team" className="nav-link" onClick={(e) => handleLinkClick(e, '#team')}>Команда</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, '#contact')}>Контакты</a>
        </nav>

        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button 
            id="theme-toggle" 
            className="theme-toggle-btn" 
            onClick={onToggleTheme}
            aria-label="Переключить тему оформления"
          >
            <i className={theme === 'dark-theme' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
          </button>

          {/* Mobile Navigation Toggle Button */}
          <div className="mobile-nav-toggle" onClick={toggleMobileMenu}>
            <i className={menuActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuActive ? 'active' : ''}`}>
        <a href="#problem" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#problem')}>Проблема</a>
        <a href="#solutions" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#solutions')}>Решение</a>
        <a href="#simulator" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#simulator')}>Симулятор</a>
        <a href="#tech" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#tech')}>Технологии</a>
        <a href="#team" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#team')}>Команда</a>
        <a href="#contact" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, '#contact')}>Контакты</a>
        <a href="#contact" className="btn btn-primary mobile-cta-btn" onClick={(e) => handleLinkClick(e, '#contact')}>
          Присоединиться <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      {/* Scroll Progress indicator */}
      <div className="scroll-progress-bar" style={{ height: '3px', backgroundColor: 'var(--secondary)', position: 'absolute', bottom: '0', left: '0', zIndex: 101, width: '0%', filter: 'drop-shadow(0 0 2px var(--secondary))', willChange: 'width' }}></div>
    </header>
  );
}
