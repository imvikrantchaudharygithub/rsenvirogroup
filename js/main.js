/* =========================================
   RS ENVIRO GROUP — main.js
   Navbar, Cursor, Scroll, Form, Utilities
   ========================================= */

(function () {
  'use strict';

  /* ---- Custom Cursor ---- */
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot     = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
    });

    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%,-50%)`;
      requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .service-card, .division-card, .gallery-item, .client-card, .filter-tab, .tab-btn, .product-card');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => outline.classList.add('hover'));
      el.addEventListener('mouseleave', () => outline.classList.remove('hover'));
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      outline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      outline.style.opacity = '1';
    });
  }

  /* ---- Navbar ---- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];
    if (!navbar) return;

    // Scroll state
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;

      // Add/remove scrolled class
      if (scrollY > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');

      // Active nav link based on section
      updateActiveNav(scrollY);

      lastScroll = scrollY;
    }, { passive: true });

    // Hamburger toggle
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        mobileNav.setAttribute('aria-hidden', String(!isOpen));
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';

        // Stagger mobile links
        if (isOpen) {
          mobileLinks.forEach((link, i) => {
            link.style.transitionDelay = (0.05 + i * 0.07) + 's';
          });
        } else {
          mobileLinks.forEach(link => { link.style.transitionDelay = '0s'; });
        }
      });

      // Close on link click
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Smooth scroll for all nav/anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  function updateActiveNav(scrollY) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    let current = '';
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - 200) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }

  /* ---- Back to Top ---- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) btn.classList.add('visible');
      else btn.classList.remove('visible');
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Contact Form ---- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn  = form.querySelector('.form-submit');
    const successMsg = document.getElementById('form-success');

    function validateField(input) {
      const group = input.closest('.form-group');
      const errorEl = group ? group.querySelector('.form-error') : null;
      let valid = true;

      if (input.required && !input.value.trim()) {
        valid = false;
        if (errorEl) errorEl.textContent = 'This field is required.';
      } else if (input.type === 'email' && input.value) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(input.value)) {
          valid = false;
          if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
        }
      } else if (input.type === 'tel' && input.value) {
        const telRe = /^[+\d\s\-()]{7,15}$/;
        if (!telRe.test(input.value)) {
          valid = false;
          if (errorEl) errorEl.textContent = 'Please enter a valid phone number.';
        }
      }

      if (group) group.classList.toggle('has-error', !valid);
      return valid;
    }

    // Real-time validation
    form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('has-error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      // Validate all fields
      let allValid = true;
      form.querySelectorAll('input[required], select[required], textarea').forEach(field => {
        if (!validateField(field)) allValid = false;
      });

      if (!allValid) return;

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Sending...`;
      }

      // Simulate async submit (replace with real endpoint)
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
      }, 1500);
    });
  }

  /* ---- Lazy Load Images ---- */
  function initLazyLoad() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) return; // native support

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => observer.observe(img));
  }

  /* ---- Init ---- */
  function init() {
    initCursor();
    initNavbar();
    initBackToTop();
    initContactForm();
    initLazyLoad();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
