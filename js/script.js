/* =========================================================
   PORTAFOLIO — Jennifer Muñoz
   JavaScript Vanilla — sin dependencias
   ========================================================= */
(function () {
  'use strict';

  var THEME_KEY = 'jm-portfolio-theme';
  var html = document.documentElement;

  /* ---------- 1. Año dinámico en footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Modo oscuro / claro (por defecto: claro) ---------- */
  var themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle && themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
    } else {
      html.removeAttribute('data-theme');
      themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle && themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) { /* almacenamiento no disponible */ }
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isDark = html.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignorar */ }
    });
  }

  /* ---------- 3. Header: estado al hacer scroll ---------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ---------- 4. Menú móvil ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  var navOverlay = document.getElementById('navOverlay');
  var navLinks = document.querySelectorAll('.nav__link');

  function openMenu() {
    nav.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.querySelector('.material-symbols-outlined').textContent = 'close';
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    nav.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('.material-symbols-outlined').textContent = 'menu';
    document.body.style.overflow = '';
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }
  navOverlay && navOverlay.addEventListener('click', closeMenu);
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- 5. Botón "bajar" del hero ---------- */
  var scrollCue = document.getElementById('scrollCue');
  if (scrollCue) {
    scrollCue.addEventListener('click', function () {
      var target = document.getElementById('sobre-mi');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- 6. Botón volver arriba ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 7. Nav activo según sección visible ---------- */
  var sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* ---------- 8. Animaciones al hacer scroll (reveal) ---------- */
  var animatedEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animatedEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    animatedEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    animatedEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- 9. Contador animado (stats del hero) ---------- */
  var countEls = document.querySelectorAll('[data-count-to]');
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to'), 10);
    var suffix = el.getAttribute('data-count-suffix') || '';
    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = target + suffix;
      return;
    }
    var duration = 1400;
    var startTime = null;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutExpo(progress);
      var current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  if (countEls.length) {
    if ('IntersectionObserver' in window) {
      var countObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      countEls.forEach(function (el) { countObserver.observe(el); });
    } else {
      countEls.forEach(function (el) { animateCount(el); });
    }
  }

  /* ---------- 10. Recomendaciones: modal de carta completa ---------- */
  var recTriggers = document.querySelectorAll('[data-recommendation-trigger]');
  var openRecModal = null;

  function openRecommendation(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    openRecModal = modal;
    var closeBtn = modal.querySelector('.recommendation-modal__close');
    if (closeBtn) closeBtn.focus();
  }

  function closeRecommendation() {
    if (!openRecModal) return;
    openRecModal.classList.remove('is-open');
    openRecModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openRecModal = null;
  }

  recTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      openRecommendation(btn.getAttribute('data-recommendation-trigger'));
    });
  });
  document.querySelectorAll('[data-recommendation-close]').forEach(function (el) {
    el.addEventListener('click', closeRecommendation);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeRecommendation();
  });

  /* ---------- 11. Formulario de contacto (Netlify Forms + AJAX) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  function encodeFormData(form) {
    var data = new FormData(form);
    return Array.from(data.entries())
      .map(function (pair) {
        return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
      })
      .join('&');
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailInput = contactForm.querySelector('#email');
      var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      if (!contactForm.checkValidity() || !emailValid) {
        formStatus.textContent = 'Por favor completa todos los campos con un email válido.';
        formStatus.className = 'form-status is-error';
        return;
      }

      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      formStatus.textContent = 'Enviando…';
      formStatus.className = 'form-status';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData(contactForm)
      })
        .then(function () {
          formStatus.textContent = '¡Gracias! Tu mensaje fue enviado, te responderé pronto.';
          formStatus.className = 'form-status is-success';
          contactForm.reset();
        })
        .catch(function () {
          formStatus.textContent = 'Hubo un problema al enviar. Intenta de nuevo o escríbeme directo por email.';
          formStatus.className = 'form-status is-error';
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

})();
