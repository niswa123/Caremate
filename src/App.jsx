import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import custom sections
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Simulator from './components/Simulator';
import Tech from './components/Tech';
import Team from './components/Team';
import Footer from './components/Footer';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark-theme' : 'light-theme';
  });

  const [lenisInstance, setLenisInstance] = useState(null);

  // Sync theme to body element class
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Initialize Smooth Scrolling (Lenis) and ScrollTrigger Animations (GSAP)
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenisInstance(lenis);

    // Sync ScrollTrigger with Lenis scroll events
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP Ticker setup
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // --- ANIMATIONS TIMELINE ON MOUNT (HERO) ---
    const heroTl = gsap.timeline();
    
    // First, animate the line reveal of the Hero title
    heroTl.fromTo('.word-reveal-item',
      { y: '120%', rotate: 1.5, opacity: 0 },
      {
        y: '0%',
        rotate: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.2,
        ease: 'power4.out',
        clearProps: 'transform,opacity'
      }
    );

    // Then fade in the supporting elements
    heroTl.fromTo('.fade-in', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.9, 
        stagger: 0.12, 
        ease: 'power3.out',
        clearProps: 'transform' // clean up for hover effects later
      },
      '-=0.7' // overlap with title animation
    );

    // --- SCROLL REVEALS ---
    const triggers = [];

    // Scroll progress bar indicator
    const progressAnim = gsap.to('.scroll-progress-bar', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });
    triggers.push(progressAnim.scrollTrigger);

    // Reveal standard text headers
    gsap.utils.toArray('.scroll-reveal').forEach((el) => {
      const anim = gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
      triggers.push(anim.scrollTrigger);
    });

    // Reveal Bento Cards (fade in & lift up)
    gsap.utils.toArray('.scroll-reveal-card').forEach((card) => {
      const anim = gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
      triggers.push(anim.scrollTrigger);
    });

    // Slide in reveals (left & right columns)
    gsap.utils.toArray('.scroll-reveal-left').forEach((el) => {
      const anim = gsap.fromTo(el,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
      triggers.push(anim.scrollTrigger);
    });

    gsap.utils.toArray('.scroll-reveal-right').forEach((el) => {
      const anim = gsap.fromTo(el,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
      triggers.push(anim.scrollTrigger);
    });

    // --- NESTED PARALLAX (Only on Desktop) ---
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Parallax for card metrics in bento cards
      gsap.utils.toArray('.bento-card .card-metric').forEach((metric) => {
        const anim = gsap.to(metric, {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: metric,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        triggers.push(anim.scrollTrigger);
      });

      // Parallax for icons
      gsap.utils.toArray('.bento-card .card-icon, .tech-card .tech-icon, .solution-item .card-icon').forEach((icon) => {
        const anim = gsap.to(icon, {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: icon,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        triggers.push(anim.scrollTrigger);
      });
    });

    // --- TILT & GLOW INTERACTIVE SYSTEM ---
    const handleCardMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 4; // Max 4 degrees tilt
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
      card.style.setProperty('--glow-opacity', '1');
    };

    const handleCardLeave = (e) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.setProperty('--glow-opacity', '0');
    };

    const tiltCards = document.querySelectorAll('.tilt-glow-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', handleCardMove);
      card.addEventListener('mouseleave', handleCardLeave);
    });

    // Cleanup on unmount
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      triggers.forEach(tr => tr.kill());
      mm.revert();
      tiltCards.forEach(card => {
        card.removeEventListener('mousemove', handleCardMove);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
    };
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  return (
    <>
      <Header theme={theme} onToggleTheme={handleToggleTheme} lenis={lenisInstance} />
      <Hero lenis={lenisInstance} />
      <Problem />
      <Solution />
      <Simulator lenis={lenisInstance} />
      <Tech />
      <Team />
      <Footer lenis={lenisInstance} />
    </>
  );
}
