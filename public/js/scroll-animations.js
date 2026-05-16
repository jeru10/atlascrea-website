/* ============================================
   ATLAS CREA — Scroll Animations System
   data-scroll / data-stagger auto-tagging
   ============================================ */
(function () {
  'use strict';

  /* ─── INJECT CSS ──────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    [data-scroll] {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
      will-change: opacity, transform;
    }
    [data-scroll="left"]  { transform: translateX(-36px); }
    [data-scroll="right"] { transform: translateX(36px); }
    [data-scroll="scale"] { transform: scale(0.93) translateY(20px); }
    [data-scroll="clip"]  { clip-path: inset(0 0 100% 0); opacity:1; transform:none; transition: clip-path 0.75s cubic-bezier(0.16,1,0.3,1); }
    [data-scroll].in-view { opacity:1; transform:none; }
    [data-scroll="clip"].in-view { clip-path: inset(0 0 0% 0); }

    [data-stagger] > * {
      opacity: 0;
      transform: translateY(28px) scale(0.97);
      transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
    }
    [data-stagger].in-view > *:nth-child(1) { opacity:1; transform:none; transition-delay: 0ms; }
    [data-stagger].in-view > *:nth-child(2) { opacity:1; transform:none; transition-delay: 80ms; }
    [data-stagger].in-view > *:nth-child(3) { opacity:1; transform:none; transition-delay: 160ms; }
    [data-stagger].in-view > *:nth-child(4) { opacity:1; transform:none; transition-delay: 240ms; }
    [data-stagger].in-view > *:nth-child(5) { opacity:1; transform:none; transition-delay: 320ms; }
    [data-stagger].in-view > *:nth-child(6) { opacity:1; transform:none; transition-delay: 400ms; }
  `;
  document.head.appendChild(style);

  /* ─── AUTO-TAG ────────────────────────────── */
  function autoTag() {
    // Skip elements already with data-scroll or in hero section
    const heroSection = document.querySelector('section');

    // h2 headings → clip reveal
    document.querySelectorAll('section h2').forEach(el => {
      if (el.dataset.scroll || el.dataset.stagger) return;
      if (heroSection && heroSection.contains(el) && !el.closest('section:not(:first-of-type)')) return;
      el.setAttribute('data-scroll', 'clip');
    });

    // Section labels / tags → left
    document.querySelectorAll('[class*="section-label"], [class*="section-tag"], [class*="eyebrow"], .text-\\[11px\\].font-mono').forEach(el => {
      if (!el.dataset.scroll && !el.dataset.stagger) el.setAttribute('data-scroll', 'left');
    });

    // Paragraphs → fade up
    document.querySelectorAll('section p').forEach(el => {
      if (!el.dataset.scroll && !el.dataset.stagger) el.setAttribute('data-scroll', '');
    });

    // Grid containers → stagger
    document.querySelectorAll('[class*="grid"], .services-list, .process-list, .team-grid, .testimonial-list, [class*="faq"]').forEach(el => {
      if (!el.dataset.stagger && !el.dataset.scroll) el.setAttribute('data-stagger', '');
    });

    // Images → scale
    document.querySelectorAll('section img:not([class*="logo"])').forEach(el => {
      if (!el.dataset.scroll && !el.dataset.stagger) el.setAttribute('data-scroll', 'scale');
    });

    // Buttons → fade up
    document.querySelectorAll('.btn-primary, .btn-outline, [class*="btn"], [class*="cta"]').forEach(el => {
      if (!el.dataset.scroll && !el.dataset.stagger) el.setAttribute('data-scroll', '');
    });

    // Highlight numbers / stats → scale
    document.querySelectorAll('.stats-box, .stat-value, .process-step').forEach(el => {
      if (!el.dataset.scroll && !el.dataset.stagger) el.setAttribute('data-scroll', 'scale');
    });
  }

  autoTag();

  /* ─── OBSERVER ────────────────────────────── */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-scroll], [data-stagger]').forEach(el => obs.observe(el));

})();
