// Landing page: typewriter title + scroll-revealed timeline.
// Titles are read from a `data-titles` JSON attribute set in index.md so the
// list lives in _config.yml rather than this file.
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
      // Nothing to animate — make sure something is visible.
      titleElement.textContent = titleElement.textContent || '';
      titleElement.classList.add('typewriter-static');
      return;
    }

    // The typewriter is a signature visual element of the landing page, so
    // we always run it. Screen readers don't spam-announce the changing text
    // because the markup uses aria-live="off". Reduced-motion users still get
    // the animation but skip the cursor blink (handled in landing.css).
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
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
    tick();
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

    let revealed = false;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !revealed) {
          revealed = true;
          timelineSection.classList.add('visible');
          const items = timelineSection.querySelectorAll('.timeline-entry');
          items.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('visible'); }, 150 + i * 120);
          });
          if (footer) footer.style.display = 'block';
        }
      });
    }, { rootMargin: '0px 0px -200px 0px', threshold: 0 });

    observer.observe(timelineSection);
  }

  function init() {
    initTypewriter();
    initTimelineReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
