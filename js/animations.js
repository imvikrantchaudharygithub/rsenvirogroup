/* =========================================
   RS ENVIRO GROUP — animations.js
   Scroll Reveals, Counters, GSAP Animations
   =========================================
   FIX: Replaced GSAP from() (which hides content)
   with CSS IntersectionObserver system for ALL
   content. GSAP is only used for hero entrance
   and cosmetic parallax — never to hide cards.
   ========================================= */

(function () {
  'use strict';

  /* =========================================
     Scroll Reveal — IntersectionObserver
     Handles ALL reveal/gsap-stagger-child els
     ========================================= */
  function initScrollReveal() {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -20px 0px'
    });

    // Observe existing .reveal* elements (section labels, headings)
    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    ).forEach(el => {
      // If already fully in viewport (e.g. above fold), reveal immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      } else {
        observer.observe(el);
      }
    });

    // Wire up gsap-stagger-child elements with stagger delays
    document.querySelectorAll('.gsap-stagger-parent').forEach(parent => {
      const children = parent.querySelectorAll('.gsap-stagger-child');

      // Check if parent is already in viewport
      const parentRect = parent.getBoundingClientRect();
      const parentVisible = parentRect.top < window.innerHeight && parentRect.bottom > 0;

      children.forEach((child, i) => {
        if (parentVisible) {
          // Already on screen — just add reveal and revealed with stagger delay
          child.classList.add('reveal');
          child.style.transitionDelay = (i * 0.07) + 's';
          // Small timeout so CSS transition plays properly
          setTimeout(() => child.classList.add('revealed'), 50 + i * 70);
        } else {
          // Off screen — add reveal class and observe
          child.classList.add('reveal');
          child.style.transitionDelay = (i * 0.07) + 's';
          observer.observe(child);
        }
      });
    });
  }

  /* =========================================
     Counter Animation
     ========================================= */
  function animateCounter(el) {
    const target   = parseFloat(el.dataset.target || '0');
    const suffix   = el.dataset.suffix || '';
    const prefix   = el.dataset.prefix || '';
    const duration = 1800;
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const val      = target * eased;

      el.textContent = prefix + (isFloat ? val.toFixed(1) : Math.floor(val)) + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target + suffix;
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    // Store original target value before zeroing
    counters.forEach(el => {
      const raw = el.textContent.replace(/[^\d.]/g, '');
      el.dataset.target = raw || '0';
      el.textContent = '0';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  }

  /* =========================================
     Process Line Draw
     ========================================= */
  function initProcessLine() {
    const line = document.getElementById('process-line');
    if (!line) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.style.width = '100%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(line.parentElement);
  }

  /* =========================================
     Process Steps — Active State
     ========================================= */
  function initProcessSteps() {
    const steps = document.querySelectorAll('.process-step');
    if (!steps.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.5 });

    steps.forEach(step => observer.observe(step));
  }

  /* =========================================
     GSAP — Hero Entrance ONLY
     (never used for content cards/grids)
     ========================================= */
  function initGSAPHero() {
    // If GSAP not available, make hero visible immediately
    if (typeof gsap === 'undefined') {
      document.querySelectorAll('.hero-label,.hero-title,.hero-subtitle,.hero-buttons .btn,#hero-decoration')
        .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero entrance — safe because these elements are already visible
    // We animate them into better positions, not from invisible
    const heroTl = gsap.timeline({ delay: 2.1 });
    heroTl
      .fromTo('.hero-label',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
      )
      .fromTo('.hero-title',
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo('.hero-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo('.hero-buttons .btn',
        { y: 25, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.12, ease: 'back.out(1.4)' },
        '-=0.2'
      )
      .fromTo('#hero-decoration',
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );

    // Parallax on hero decoration — cosmetic only, never hides content
    if (typeof ScrollTrigger !== 'undefined' && window.innerWidth >= 1024) {
      gsap.to('.hero-decoration', {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        ease: 'none'
      });
    }
  }

  /* =========================================
     Gallery Filter
     ========================================= */
  function initGalleryFilter() {
    const tabs  = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('.gallery-item');
    if (!tabs.length || !items.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        items.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? 'block' : 'none';
          if (show) {
            item.style.animation = 'fadeInUp 0.35s ease both';
          }
        });
      });
    });
  }

  /* =========================================
     Client Tabs
     ========================================= */
  function initClientTabs() {
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    if (!tabBtns.length) return;

    // Show first panel on init
    const firstPanel = document.querySelector('.tab-panel.active');
    if (firstPanel) firstPanel.style.display = 'grid';

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });
        btn.classList.add('active');
        const target = document.getElementById('tab-' + btn.dataset.tab);
        if (target) {
          target.classList.add('active');
          target.style.display = 'grid';
        }
      });
    });
  }

  /* =========================================
     Ensure all elements are visible
     (safety net — runs after everything)
     ========================================= */
  function ensureVisibility() {
    setTimeout(() => {
      document.querySelectorAll(
        '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)'
      ).forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 1.2) {
          el.classList.add('revealed');
        }
      });
    }, 400);
  }

  /* =========================================
     Init
     ========================================= */
  function init() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Show everything immediately for accessibility
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .gsap-stagger-child')
        .forEach(el => {
          el.classList.add('revealed');
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.style.transitionDelay = '0s';
        });
    } else {
      initScrollReveal();
    }

    initCounters();
    initProcessLine();
    initProcessSteps();
    initGalleryFilter();
    initClientTabs();

    // GSAP hero only — fire after a tiny delay to ensure GSAP CDN loaded
    setTimeout(initGSAPHero, 100);

    // Safety net
    ensureVisibility();
    window.addEventListener('scroll', ensureVisibility, { once: true, passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
