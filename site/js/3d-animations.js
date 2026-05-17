/* ═══════════════════════════════════════════════════════
   ATLAS CREA — SAFE 3D Animations
   Framer-style, without breaking layout/content
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  function initTiltCards() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('.portfolio-card');

    cards.forEach(card => {
      if (card.dataset.atlasTiltBound === '1') return;
      card.dataset.atlasTiltBound = '1';

      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.18s ease, box-shadow 0.18s ease';
      card.style.willChange = 'transform';
      card.style.cursor = 'pointer';
      const image = card.querySelector('img');
      const content = card.querySelector(':scope > div:last-child');

      if (image) {
        image.style.transform = 'translateZ(28px) scale(1.01)';
        image.style.transformOrigin = 'center center';
        image.style.transition = 'transform 0.18s ease, filter 0.18s ease';
        image.style.willChange = 'transform';
      }
      if (content) {
        content.style.transform = 'translateZ(20px)';
        content.style.transformStyle = 'preserve-3d';
      }

      let shine = card.querySelector(':scope > .atlas-shine');
      if (!shine) {
        shine = document.createElement('div');
        shine.className = 'atlas-shine';
        shine.style.cssText = `
          position:absolute;
          inset:0;
          border-radius:inherit;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
          opacity:0;
          transition: opacity 0.25s ease;
          pointer-events:none;
          z-index:10;
        `;
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(shine);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -14;
        const tiltY = (x - 0.5) * 14;

        card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-tiltY * 1.8}px ${tiltX * 1.8}px 32px rgba(54,84,227,0.18), 0 18px 50px rgba(2,14,38,0.35)`;
        if (image) {
          image.style.transform = `translateZ(36px) scale(1.05) translate(${(x - 0.5) * -10}px, ${(y - 0.5) * -10}px)`;
        }
        shine.style.opacity = '1';
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1) 0%, transparent 58%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.boxShadow = 'none';
        if (image) {
          image.style.transform = 'translateZ(28px) scale(1.01)';
        }
        shine.style.opacity = '0';
      });
    });
  }

  function initHeroFloat() {
    const heroBg = document.querySelector('.hero-mesh');
    if (!heroBg) return;
    heroBg.classList.add('atlas-hero-enhanced');
    heroBg.style.willChange = 'background, filter';

    if (window.matchMedia('(hover: hover)').matches && heroBg.dataset.atlasHeroPointerBound !== '1') {
      heroBg.dataset.atlasHeroPointerBound = '1';

      const renderHeroGradient = (x, y) => {
        heroBg.style.setProperty('--hero-focus-x', `${x}%`);
        heroBg.style.setProperty('--hero-focus-y', `${y}%`);
        heroBg.style.background = [
          `radial-gradient(42% 42% at ${x}% ${y}%, rgba(84,121,255,0.2) 0%, rgba(84,121,255,0.05) 34%, transparent 68%)`,
          'radial-gradient(58% 52% at 78% 24%, rgba(45,168,226,0.18) 0%, transparent 62%)',
          'radial-gradient(46% 54% at 14% 78%, rgba(34,211,197,0.14) 0%, transparent 58%)',
          'linear-gradient(145deg, #020e26 0%, #071537 36%, #0c1f4a 62%, #020e26 100%)'
        ].join(',');
      };

      renderHeroGradient(50, 38);

      heroBg.addEventListener('mousemove', (e) => {
        const rect = heroBg.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
        const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
        renderHeroGradient(x, y);
      });

      heroBg.addEventListener('mouseleave', () => {
        renderHeroGradient(50, 38);
      });
    }
  }

  function initMagneticButtons() {
    return;
  }

  function initCustomCursor() {
    return;
  }

  function init() {
    requestAnimationFrame(() => {
      // Safety cleanup from older cached versions
      document.querySelectorAll('.atlas-3d-hidden, .atlas-3d-visible').forEach(function (el) {
        el.classList.remove('atlas-3d-hidden', 'atlas-3d-visible');
        el.style.opacity = '';
        el.style.transitionDelay = '';
      });
      document.querySelectorAll('.atlas-img-wrap').forEach(function (wrap) {
        wrap.classList.add('atlas-revealed');
      });

      initTiltCards();
      initHeroFloat();
      initMagneticButtons();
      initCustomCursor();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
