/* ATLAS CREA — scroll-animations disabled safely.
   Previous version was too broad and could hide text/images.
   Kept as no-op for backward compatibility if cached HTML references it. */
(function () {
  'use strict';
  function restore() {
    document.querySelectorAll('[data-scroll], [data-stagger]').forEach(function (el) {
      el.style.opacity = '';
      el.style.transform = '';
      el.style.clipPath = '';
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restore);
  } else {
    restore();
  }
})();
