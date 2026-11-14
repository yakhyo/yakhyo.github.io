// Landing page: typewriter title, scroll-down button, scroll-revealed timeline.
// Titles come from data-titles in index.md (site.landing_titles in _config.yml).
(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initTypewriter() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;

    let titles;
    try {
      titles = JSON.parse(titleElement.getAttribute('data-titles') || '[]');
    } catch (_) {
      titles = [];
    }
    if (!titles.length) {
      titleElement.classList.add('typewriter-static');
      return;
    }

    // Runs under reduced motion too, by design; there landing.scss only stops the cursor blink.
    // Starts by deleting the first title, which Liquid already rendered, so the hero fades in on stable text.
    let titleIndex = 0;
    let charIndex = titles[0].length;
    let isDeleting = true;
    let typingSpeed = 100;

    function tick() {
      const current = titles[titleIndex];
      if (isDeleting) {
        titleElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        titleElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      if (!isDeleting && charIndex === current.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
      }
      setTimeout(tick, typingSpeed);
    }
    // Waits out the title's entrance (0.16s delay + 0.45s rise in landing.scss).
    setTimeout(tick, 700);
  }

  // Without JS the bare #experience anchor still works via the global scroll-padding-top.
  function initScrollButton() {
    const btn = document.querySelector('.scroll-down-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      const target = document.querySelector(btn.getAttribute('href'));
      if (!target) return; // fall back to the bare hash jump
      e.preventDefault();
      // Land flush under the sticky header (scroll-padding-top's 5rem overshoots it). Use offsetTop, not
      // getBoundingClientRect(): the latter includes the section's pending reveal translateY(30px).
      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight : 0;
      let top = 0;
      for (let el = target; el; el = el.offsetParent) {
        top += el.offsetTop;
      }
      window.scrollTo({
        top: top - offset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });

    let ticking = false;
    function update() {
      const hideAfter = window.innerHeight * 0.4;
      btn.classList.toggle('is-hidden', window.scrollY > hideAfter);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function initTimelineReveal() {
    const timelineSection = document.querySelector('.timeline-section');
    const footer = document.querySelector('footer');
    if (!timelineSection) return;

    // Reduced motion: just show everything immediately.
    if (prefersReducedMotion) {
      timelineSection.classList.add('visible');
      timelineSection.querySelectorAll('.timeline-entry').forEach(function (e) {
        e.classList.add('visible');
      });
      if (footer) footer.style.display = 'block';
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.disconnect();
          timelineSection.classList.add('visible');
          const items = timelineSection.querySelectorAll('.timeline-entry');
          items.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('visible'); }, i * 60);
          });
          if (footer) footer.style.display = 'block';
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0 });

    observer.observe(timelineSection);
  }

  function init() {
    initTypewriter();
    initScrollButton();
    initTimelineReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
