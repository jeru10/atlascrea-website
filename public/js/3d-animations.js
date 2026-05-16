/* ═══════════════════════════════════════════════════════
   ATLAS CREA — SAFE 3D Animations
   Framer-style, without breaking layout/content
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';

  function initTiltCards() {
    const cards = document.querySelectorAll('.portfolio-card');

    cards.forEach(card => {
      if (card.dataset.atlasTiltBound === '1') return;
      card.dataset.atlasTiltBound = '1';

      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.18s ease, box-shadow 0.18s ease';
      card.style.willChange = 'transform';
      card.style.cursor = 'pointer';

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
        shine.style.opacity = '1';
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1) 0%, transparent 58%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.boxShadow = 'none';
        shine.style.opacity = '0';
      });
    });
  }

  function initHeroFloat() {
    const heroBg = document.querySelector('.hero-mesh');
    if (!heroBg) return;

    if (!document.getElementById('atlas-hero-float-style')) {
      const style = document.createElement('style');
      style.id = 'atlas-hero-float-style';
      style.textContent = `
        @keyframes atlasHeroFloat {
          0%   { transform: scale(1.00) translate(0px, 0px); }
          25%  { transform: scale(1.015) translate(-4px, -3px); }
          50%  { transform: scale(1.01) translate(3px, -4px); }
          75%  { transform: scale(1.02) translate(-3px, 3px); }
          100% { transform: scale(1.00) translate(0px, 0px); }
        }
      `;
      document.head.appendChild(style);
    }

    heroBg.style.animation = 'atlasHeroFloat 10s ease-in-out infinite';
    heroBg.style.transformOrigin = 'center center';
    heroBg.style.willChange = 'transform';
  }

  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .cta-button, .contact-btn, a[href*="contact"]');

    buttons.forEach(btn => {
      if (btn.dataset.atlasMagneticBound === '1') return;
      btn.dataset.atlasMagneticBound = '1';

      btn.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1)';
      btn.style.display = 'inline-flex';

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    if (document.querySelector('.atlas-cursor-dot')) return;

    const style = document.createElement('style');
    style.textContent = `
      .atlas-cursor-dot {
        width: 8px; height: 8px; background: #F0EEE8; border-radius: 50%;
        position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99999;
        transform: translate(-50%, -50%);
      }
      .atlas-cursor-ring {
        width: 36px; height: 36px; border: 1px solid rgba(240,238,232,0.3);
        border-radius: 50%; position: fixed; top: 0; left: 0;
        pointer-events: none; z-index: 99998;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
      }
      .atlas-cursor-ring.hovered {
        width: 52px; height: 52px;
        border-color: rgba(45,168,226,0.25);
        background: rgba(45,168,226,0.06);
      }
    `;
    document.head.appendChild(style);

    const dot = document.createElement('div');
    dot.className = 'atlas-cursor-dot';
    const ring = document.createElement('div');
    ring.className = 'atlas-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animate() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  function init() {
    requestAnimationFrame(() => {
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
