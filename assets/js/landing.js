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
    //
    // We start in "deleting" mode at the end of the first title (which is
    // already rendered by Liquid as the initial textContent) so the hero
    // fade-in lands on stable text — no flash of half-typed letters.
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
    // Start once the title's own entrance has settled (~0.16s stagger delay +
    // ~0.45s rise ≈ 0.6s) so deleting begins on stable, fully-visible text —
    // right as the cascade finishes, not after a long static hold.
    setTimeout(tick, 700);
  }

  // Floating scroll-down button: smooth-scrolls to the timeline on click, and
  // hides itself once you've scrolled past the hero, reappearing when you
  // scroll back up to the top. Native anchor navigation (and the global
  // scroll-padding-top that clears the sticky header) still works without JS.
  function initScrollButton() {
    const btn = document.querySelector('.scroll-down-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      const target = document.querySelector(btn.getAttribute('href'));
      if (!target) return; // fall back to the bare hash jump
      e.preventDefault();
      // Land the section flush under the sticky header instead of relying on
      // the global scroll-padding-top (5rem), which overshoots the ~57px header.
      // NOTE: use the offsetTop chain, not getBoundingClientRect(): the section
      // still has its reveal transform (translateY(30px)) until it scrolls into
      // view, and getBoundingClientRect() would include that 30px, leaving a gap
      // once the transform clears. offsetTop is layout-based and transform-free.
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

    // Hide once scrolled past ~40% of the first screen; show again above that.
    // rAF-throttled so the scroll handler stays cheap.
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
    initScrollButton();
    initTimelineReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
