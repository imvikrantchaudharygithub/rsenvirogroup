/* =========================================
   RS ENVIRO GROUP — particles.js
   Hero Canvas Water Particle Effect
   ========================================= */

(function () {
  'use strict';

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.reset();
    }

    reset() {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.x = Math.random() * w;
      this.y = h + Math.random() * 60;
      this.radius = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.8 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.5 + 0.1;
      this.fadeIn  = true;
      this.life    = 0;
      this.maxLife = Math.random() * 300 + 150;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;

      if (this.fadeIn) {
        this.opacity += this.maxOpacity / 40;
        if (this.opacity >= this.maxOpacity) this.fadeIn = false;
      } else {
        this.opacity -= this.maxOpacity / (this.maxLife - 40);
      }

      if (this.life >= this.maxLife || this.y < -20) this.reset();
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 201, 177, ${Math.max(0, this.opacity)})`;
      ctx.fill();
    }
  }

  class ParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.animFrame = null;
      this.count = this.getParticleCount();

      this.resize();
      this.initParticles();
      this.bindEvents();
      this.animate();
    }

    getParticleCount() {
      return window.innerWidth < 768 ? 40 : 90;
    }

    resize() {
      const parent = this.canvas.parentElement;
      this.canvas.width  = parent.offsetWidth;
      this.canvas.height = parent.offsetHeight;
    }

    initParticles() {
      this.particles = [];
      for (let i = 0; i < this.count; i++) {
        const p = new Particle(this.canvas);
        p.y = Math.random() * this.canvas.height;
        p.life = Math.random() * p.maxLife;
        p.opacity = Math.random() * p.maxOpacity;
        p.fadeIn = false;
        this.particles.push(p);
      }
    }

    bindEvents() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.initParticles();
        }, 200);
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles.forEach(p => {
        p.update();
        p.draw(this.ctx);
      });
      this.animFrame = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
    }
  }

  // Initialize when DOM ready
  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    new ParticleSystem('hero-canvas');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
