/* =========================================
   RS ENVIRO GROUP — preloader.js
   Loading Screen with Typewriter Effect
   ========================================= */

(function () {
  'use strict';

  const COMPANY = 'RS ENVIRO GROUP';
  let charIndex = 0;

  function typeChar() {
    const textEl = document.getElementById('preloader-text');
    const cursorEl = document.getElementById('preloader-cursor');
    if (!textEl) return;

    if (charIndex < COMPANY.length) {
      const span = document.createElement('span');
      span.textContent = COMPANY[charIndex];
      span.style.animationDelay = (charIndex * 0.06) + 's';
      textEl.insertBefore(span, cursorEl);
      charIndex++;
      setTimeout(typeChar, 65);
    }
  }

  function startPreloader() {
    const progressEl = document.getElementById('preloader-progress');

    // Start progress bar
    requestAnimationFrame(() => {
      if (progressEl) progressEl.style.width = '100%';
    });

    // Start typewriter
    setTimeout(typeChar, 300);

    // Hide preloader
    const hideAfter = 1800;
    setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
          preloader.style.display = 'none';
          document.body.style.overflow = '';
        }, 650);
      }
    }, hideAfter);
  }

  // Block scroll during preload
  document.body.style.overflow = 'hidden';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPreloader);
  } else {
    startPreloader();
  }
})();
