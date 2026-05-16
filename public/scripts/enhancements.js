/* ============================================
   ATLAS CREA — ENHANCEMENTS JS
   Scroll progress, scroll reveal, counters,
   magnetic buttons, custom cursor, parallax
   ============================================ */
(function () {
  'use strict';

  /* ─── SCROLL PROGRESS BAR ────────────────── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (scrolled / total * 100) + '%';
    }, { passive: true });
  }

  /* ─── CUSTOM CURSOR ──────────────────────── */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    // Remove existing cursor elements if any
    document.querySelectorAll('.custom-cursor, .custom-cursor-ring').forEach(el => el.remove());

    const dot = document.createElement('div');
    dot.className = 'custom-cursor';
    const ring = document.createElement('div');
    ring.className = 'custom-cursor-ring';
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
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect
    const hoverEls = document.querySelectorAll('a, button, [role="button"]');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  /* ─── HERO WORD REVEAL ───────────────────── */
  function initHeroAnimation() {
    const heroH1 = document.querySelector('main h1, .hero h1, section:first-of-type h1, h1');
    if (!heroH1) return;

    // Don't re-wrap if already wrapped with word-reveal (our existing setup)
    if (heroH1.querySelector('.word-reveal')) return;

    const text = heroH1.textContent.trim();
    const words = text.split(' ');
    heroH1.innerHTML = words.map((word, i) =>
      `<span class="hero-word" style="transition-delay:${0.05 * i + 0.3}s">
        <span class="hero-word-inner stagger-${Math.min(i + 1, 6)}">${word}</span>
       </span>`
    ).join(' ');

    // Sub elements
    const heroSubEls = document.querySelectorAll(
      'main h1 ~ p, main h1 ~ .hero-tags, main h1 ~ a, ' +
      'section:first-of-type p, section:first-of-type a, ' +
      '.hero-subtitle, .hero-cta, .hero-tags, .hero-stats'
    );

    heroSubEls.forEach((el, i) => {
      el.classList.add('fade-up');
      el.style.transitionDelay = `${0.6 + i * 0.12}s`;
    });

    // Trigger after loader
    function triggerHero() {
      const loader = document.querySelector('.loader, [class*="loader"], [class*="loading"], [id*="loader"]');
      if (loader) {
        const obs = new MutationObserver(() => {
          const style = window.getComputedStyle(loader);
          if (style.opacity === '0' || style.display === 'none' || style.visibility === 'hidden') {
            revealHero();
            obs.disconnect();
          }
        });
        obs.observe(loader, { attributes: true, attributeFilter: ['style', 'class'] });
        setTimeout(revealHero, 3000);
      } else {
        setTimeout(revealHero, 200);
      }
    }

    function revealHero() {
      heroH1.querySelectorAll('.hero-word-inner').forEach((el, i) => {
        setTimeout(() => el.classList.add('revealed'), i * 60);
      });
      document.querySelectorAll('.fade-up').forEach(el => {
        el.classList.add('visible');
      });
    }

    triggerHero();
  }

  /* ─── SCROLL ANIMATIONS ──────────────────── */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const selectors = [
      '.service-row',
      '.portfolio-card',
      '.process-step',
      '.team-member',
      '.stat-value, .stats-value, [class*="stat"]',
      '.faq-item',
      '.testimonial-box',
      'section h2, section h3',
      'section > * > p'
    ];

    const allEls = new Set();
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => allEls.add(el));
    });

    const heroSection = document.querySelector('section');
    allEls.forEach((el) => {
      if (heroSection && heroSection.contains(el)) return;

      el.classList.add('scroll-reveal');

      const parent = el.parentElement;
      const siblings = Array.from(parent.children).filter(c => c.classList.contains('scroll-reveal'));
      const idx = siblings.indexOf(el);
      if (idx >= 0) {
        el.style.transitionDelay = Math.min(idx * 0.09, 0.54) + 's';
      }

      observer.observe(el);
    });

    // Clip reveal on section headings
    document.querySelectorAll('section h2').forEach(h2 => {
      if (heroSection && heroSection.contains(h2)) return;

      const text = h2.innerHTML;
      h2.classList.add('clip-reveal');
      h2.innerHTML = `<span class="clip-reveal-inner">${text}</span>`;
      observer.observe(h2);
    });
  }

  /* ─── TEAM AVATARS ───────────────────────── */
  function initTeamSection() {
    // Only replace images that are INSIDE a team section
    const teamImgs = document.querySelectorAll('.team-member img, .team-card img, [class*="team"] img');

    if (!teamImgs.length) return;

    const teamData = {
      'Yassine': { letter: 'Y', cls: 'team-avatar-y' },
      'Sara':    { letter: 'S', cls: 'team-avatar-s' },
      'Omar':    { letter: 'O', cls: 'team-avatar-o' },
      'Imane':   { letter: 'I', cls: 'team-avatar-i' },
    };

    teamImgs.forEach(img => {
      const card = img.closest('.team-member, .team-card, [class*="team"] li, [class*="team"] > *');
      if (!card) return;

      let memberName = null;
      const nameEl = card.querySelector('h3, h4, strong, p, [class*="name"]');
      if (nameEl) {
        memberName = nameEl.textContent.trim().split(' ')[0];
      }

      const data = teamData[memberName] || { letter: '?', cls: 'team-avatar-y' };

      const placeholder = document.createElement('div');
      placeholder.className = `team-avatar-placeholder ${data.cls}`;
      placeholder.textContent = data.letter;
      placeholder.style.cssText = `width: ${img.width || 200}px; max-width: 100%; aspect-ratio: 1;`;

      img.replaceWith(placeholder);
    });
  }

  /* ─── STATS COUNTERS ─────────────────────── */
  function initCounters() {
    const stats = document.querySelectorAll('.stat-value, .stat-number, .stats-value, [class*="stat"] strong, [class*="stat"] span, [class*="count"]');

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)([+%★]?)$/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = match[2] || '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    stats.forEach(el => {
      if (/^\d+[+%★]?$/.test(el.textContent.trim())) {
        counterObs.observe(el);
      }
    });
  }

  /* ─── MAGNETIC BUTTONS ───────────────────── */
  function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('a[class*="btn"], a[class*="cta"], button').forEach(btn => {
      btn.classList.add('magnetic-btn');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        btn.style.transform = `translate(${dx}px, ${dy}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ─── PARALLAX HERO ──────────────────────── */
  function initParallax() {
    const heroBg = document.querySelector('section:first-of-type .hero-mesh, section:first-of-type [class*="hero-bg"], .hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight * 1.5) {
        heroBg.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    }, { passive: true });
  }

  /* ─── INIT ───────────────────────────────── */
  function init() {
    initScrollProgress();
    initCursor();
    initScrollAnimations();
    initCounters();
    initMagneticButtons();
    initParallax();
    // Wait for DOM to stabilize before hero animation
    requestAnimationFrame(() => setTimeout(initHeroAnimation, 100));
    // Team section after full load (images etc.)
    if (document.readyState === 'complete') {
      initTeamSection();
    } else {
      window.addEventListener('load', initTeamSection);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
