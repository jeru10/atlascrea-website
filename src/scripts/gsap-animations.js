// ═══════════ PRO ANIMATIONS — GSAP + ScrollTrigger ═══════════
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Wait for DOM ───
document.addEventListener('DOMContentLoaded', () => {

  // ─── 1. SYNC with Lenis ───
  if (window.__lenis) {
    window.__lenis.on('scroll', ScrollTrigger.update);
  }

  // ─── 2. HERO SECTION — Parallax ───
  const hero = document.querySelector('#hero-section');
  const heroBg = hero?.querySelector('img[alt=""]');
  
  if (hero) {
    if (heroBg) {
      gsap.to(heroBg, {
        y: '15%',
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }
  }

  // ─── 3. SECTION-FADE — GSAP ScrollTrigger ───
  gsap.utils.toArray('.section-fade').forEach((el) => {
    el.classList.remove('visible');
    
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
    const children = parent.children;
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

  // ─── 5. SECTION NUMBERS ───
  gsap.utils.toArray('.section-number').forEach((num) => {
    gsap.fromTo(num,
      { opacity: 0, x: -20, scale: 0.9 },
      {
        opacity: 1, x: 0, scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: num,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 6. WORK CARDS ───
  gsap.utils.toArray('.work-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.95 },
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

  // ─── 7. PRICING CARDS ───
  gsap.utils.toArray('.pricing-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        delay: i * 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 8. SERVICE / PROCESS CARDS ───
  gsap.utils.toArray('.process-card, .service-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // ─── 9. TEAM CARDS ───
  gsap.utils.toArray('.team-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5,
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

  // ─── 10. STATS COUNTER ───
  gsap.utils.toArray('.stat-number').forEach((stat) => {
    const target = parseFloat(stat.dataset.count || stat.textContent.replace(/[^0-9.]/g, ''));
    const suffix = stat.textContent.replace(/[0-9.]/g, '');
    const obj = { val: 0 };
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            stat.textContent = (Number.isInteger(target) ? Math.floor(obj.val) : obj.val.toFixed(1)) + suffix;
          },
        });
      },
      once: true,
    });
  });

  // ─── REFRESH ───
  ScrollTrigger.refresh();
});
