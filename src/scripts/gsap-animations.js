// ═══════════ PRO ANIMATIONS — GSAP + ScrollTrigger ═══════════
// Rewritten to match actual ATLAS CREA HTML structure
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Wait for everything ───
function init() {
  // ─── 1. SYNC with Lenis ───
  if (window.__lenis) {
    window.__lenis.on('scroll', ScrollTrigger.update);
  }

  // ─── 2. HERO — Animated gradient accelerator on scroll ───
  const hero = document.querySelector('#hero-section');
  if (hero) {
    const orbs = hero.querySelectorAll('[class*="animate-hero-orb"]');
    if (orbs.length) {
      gsap.to(orbs, {
        y: () => -window.innerHeight * 0.08,
        scale: 0.9,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    }
  }

  // ─── 3. SECTION-FADE — Animate in on scroll ───
  gsap.utils.toArray('.section-fade').forEach((el) => {
    // Skip process-cards inside sticky containers
    if (el.closest('.sticky')) return;
    
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 4. STAGGER CHILDREN ───
  gsap.utils.toArray('.stagger-children').forEach((parent) => {
    const children = [...parent.children];
    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 82%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 5. SERVICE CATEGORY ROWS (horizontal list) ───
  gsap.utils.toArray('.service-category-row').forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        duration: 0.5,
        delay: i * 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 6. WORK CARDS ───
  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 7. PROCESS CARDS (sticky ones) ───
  gsap.utils.toArray('.process-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 8. TEAM MEMBER KPIs — counter animation ───
  gsap.utils.toArray('[class*="stagger-children"] .group .gradient-text').forEach((kpiEl) => {
    const raw = kpiEl.textContent || '0';
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const suffix = raw.replace(/[0-9.]/g, '');
    if (isNaN(num)) return;
    
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: kpiEl,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: num,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            const display = Number.isInteger(num) 
              ? Math.floor(obj.val) 
              : obj.val.toFixed(1);
            kpiEl.textContent = display + suffix;
          },
        });
      },
      once: true,
    });
  });

  // ─── 9. REFRESH ScrollTrigger ───
  ScrollTrigger.refresh();
}

// Run after everything is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
