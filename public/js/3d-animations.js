/* ═══════════════════════════════════════════════════════
   ATLAS CREA — 3D Animations (Framer-Style)
   Inspired by createstudio.framer.media
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ───────────────────────────────────────────────
     ANIMATION 1 — 3D TILT on Cards
     ─────────────────────────────────────────────── */
  function initTiltCards() {
    const cards = document.querySelectorAll(
      '.portfolio-item, .portfolio-card, .service-card, [class*="portfolio"], [class*="project"]'
    );

    cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
      card.style.willChange = 'transform';
      card.style.cursor = 'pointer';

      // Create shine overlay
      const shine = document.createElement('div');
      shine.style.cssText = `
        position: absolute; inset: 0; border-radius: inherit;
        background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
        opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 10;
      `;
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(shine);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * -18;
        const tiltY = (x - 0.5) * 18;

        card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.boxShadow = `
          ${-tiltY * 2}px ${tiltX * 2}px 40px rgba(54,84,227,0.25),
          0 20px 60px rgba(2,14,38,0.5)
        `;
        shine.style.opacity = '1';
        shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1) 0%, transparent 55%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.boxShadow = 'none';
        shine.style.opacity = '0';
      });
    });
  }

  /* ───────────────────────────────────────────────
     ANIMATION 2 — 3D FLOAT on Hero
     ─────────────────────────────────────────────── */
  function initHeroFloat() {
    const heroBg = document.querySelector(
      '.hero-bg, .hero img, .hero-image, [class*="hero"] img, [class*="hero-bg"], .hero-mesh'
    );
    if (!heroBg) return;

    heroBg.style.cssText += `
      animation: atlasHeroFloat 8s ease-in-out infinite;
      transform-origin: center center;
      will-change: transform;
    `;

    if (!document.getElementById('atlas-hero-float-style')) {
      const style = document.createElement('style');
      style.id = 'atlas-hero-float-style';
      style.textContent = `
        @keyframes atlasHeroFloat {
          0%   { transform: scale(1.00) translate(0px, 0px); }
          25%  { transform: scale(1.02) translate(-4px, -3px); }
          50%  { transform: scale(1.01) translate(3px, -4px); }
          75%  { transform: scale(1.03) translate(-3px, 3px); }
          100% { transform: scale(1.00) translate(0px, 0px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* ───────────────────────────────────────────────
     ANIMATION 3 — PARALLAX DEPTH on Scroll
     ─────────────────────────────────────────────── */
  function initParallaxScroll() {
    const parallaxItems = [
      { selector: '.hero-bg, .hero img, .hero-mesh', speed: 0.35 },
      { selector: '.portfolio-item img, .portfolio-card img', speed: 0.12 },
      { selector: '.team-card img, .team img, .team-member', speed: 0.10 },
    ];

    const elements = [];
    parallaxItems.forEach(({ selector, speed }) => {
      document.querySelectorAll(selector).forEach(el => {
        elements.push({ el, speed });
        el.style.willChange = 'transform';
      });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          elements.forEach(({ el, speed }) => {
            const rect = el.getBoundingClientRect();
            const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
            el.style.transform = `translateY(${centerOffset * speed * -1}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ───────────────────────────────────────────────
     ANIMATION 4 — 3D STACK REVEAL (cards dealt)
     ─────────────────────────────────────────────── */
  function init3DScrollReveal() {
    const style = document.createElement('style');
    style.textContent = `
      .atlas-3d-hidden {
        opacity: 0;
        transform: perspective(600px) rotateX(20deg) translateY(60px) scale(0.94);
        transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                    transform 0.7s cubic-bezier(0.16,1,0.3,1);
        will-change: transform, opacity;
      }
      .atlas-3d-visible {
        opacity: 1 !important;
        transform: perspective(600px) rotateX(0deg) translateY(0px) scale(1) !important;
      }
    `;
    document.head.appendChild(style);

    const targets = document.querySelectorAll(
      '.portfolio-item, .portfolio-card, .service-card, .service-row, .team-card, .team-member, .process-step, .testimonial-card, .testimonial-box, .stats-box, [class*="portfolio"] > *, [class*="project"]'
    );

    targets.forEach((el, i) => {
      el.classList.add('atlas-3d-hidden');
      el.style.transitionDelay = `${(i % 6) * 90}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('atlas-3d-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* ───────────────────────────────────────────────
     ANIMATION 5 — MAGNETIC BUTTONS
     ─────────────────────────────────────────────── */
  function initMagneticButtons() {
    const buttons = document.querySelectorAll(
      '.btn-primary, .cta-button, .contact-btn, [class*="btn"][class*="primary"], a[href*="contact"]'
    );

    buttons.forEach(btn => {
      btn.style.transition = 'transform 0.35s cubic-bezier(0.23,1,0.32,1)';
      btn.style.display = 'inline-block';

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ───────────────────────────────────────────────
     ANIMATION 6 — IMAGE CLIP REVEAL (cinematic wipe)
     ─────────────────────────────────────────────── */
  function initImageClipReveal() {
    const images = document.querySelectorAll(
      '.portfolio-item img, .portfolio-card img, .team-card img, .team-member img, .about-img img, section img:not(.logo):not([class*="nav"])'
    );

    const style = document.createElement('style');
    style.textContent = `
      .atlas-img-wrap {
        position: relative; overflow: hidden; display: block;
      }
      .atlas-img-wrap::after {
        content: '';
        position: absolute; inset: 0;
        background: #020E26;
        transform: translateX(0%);
        transition: transform 0.85s cubic-bezier(0.76,0,0.24,1);
        z-index: 2;
      }
      .atlas-img-wrap.atlas-revealed::after {
        transform: translateX(101%);
      }
    `;
    document.head.appendChild(style);

    images.forEach(img => {
      const parent = img.parentElement;
      if (!parent.classList.contains('atlas-img-wrap')) {
        const wrap = document.createElement('div');
        wrap.className = 'atlas-img-wrap';
        parent.insertBefore(wrap, img);
        wrap.appendChild(img);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('atlas-revealed'), 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.atlas-img-wrap').forEach(wrap => observer.observe(wrap));
  }

  /* ───────────────────────────────────────────────
     ANIMATION 7 — CUSTOM CURSOR (Framer-style)
     ─────────────────────────────────────────────── */
  function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    // Avoid duplicating if another cursor already set
    if (document.querySelector('.atlas-cursor-dot')) return;

    const style = document.createElement('style');
    style.textContent = `
      * { cursor: none !important; }
      .atlas-cursor-dot {
        width: 8px; height: 8px; background: #F0EEE8; border-radius: 50%;
        position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background 0.2s;
        will-change: transform;
      }
      .atlas-cursor-ring {
        width: 36px; height: 36px; border: 1px solid rgba(240,238,232,0.3);
        border-radius: 50%; position: fixed; top: 0; left: 0;
        pointer-events: none; z-index: 99998;
        transform: translate(-50%, -50%);
        transition: width 0.35s, height 0.35s, border-color 0.35s, background 0.35s;
        will-change: transform;
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

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverEls = document.querySelectorAll('a, button, [role="button"]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ───────────────────────────────────────────────
     ANIMATION 8 — PORTFOLIO SCREENSHOTS
     Replace placeholder images with themed shots
     ─────────────────────────────────────────────── */
  function initPortfolioScreenshots() {
    const portfolioScreenshots = {
      'Munich Recruitment':   'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=75&auto=format',
      'Abdol Luxury Tour':    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=75&auto=format',
      'Mondrap':              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75&auto=format',
      'Potentiel Consulting': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=75&auto=format',
      'Atlas Epic Trek':      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75&auto=format',
      'Charpente Maroc':      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75&auto=format',
    };

    // Find all portfolio cards and check if they already have real images
    document.querySelectorAll('.portfolio-card, [class*="portfolio"] > a, .portfolio-item').forEach(card => {
      const img = card.querySelector('img');
      if (!img) return;

      // Find the project name
      const nameEl = card.querySelector('h3, [class*="name"], h4');
      if (!nameEl) return;

      const projectName = nameEl.textContent.trim();
      const newSrc = portfolioScreenshots[projectName];
      if (newSrc && img.getAttribute('src') !== newSrc) {
        img.setAttribute('src', newSrc);
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  /* ───────────────────────────────────────────────
     INIT ALL — Start after DOM ready
     ─────────────────────────────────────────────── */
  function init() {
    requestAnimationFrame(() => {
      initTiltCards();
      initHeroFloat();
      initParallaxScroll();
      init3DScrollReveal();
      initMagneticButtons();
      initImageClipReveal();
      initCustomCursor();
      initPortfolioScreenshots();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
