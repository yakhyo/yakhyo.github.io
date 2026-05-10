// Announcement banner: dismiss + reveal-on-pull-down behavior.
// Extracted from _includes/announcement-banner.html.
(function () {
  'use strict';

  const STORAGE_KEY = 'announcementClosed';
  const PULL_DISTANCE_PX = 100;

  function init() {
    const banner = document.getElementById('announcement-banner');
    if (!banner) return;

    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      banner.style.display = 'none';
    }

    const closeBtn = banner.querySelector('.announcement-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        banner.style.display = 'none';
        try { localStorage.setItem(STORAGE_KEY, 'true'); } catch (_) { /* ignore */ }
      });
    }

    let lastScrollY = 0;
    let scrollUpDistance = 0;
    let scrollScheduled = false;

    function onScroll() {
      const currentScrollY = window.scrollY;
      const wasClosed = localStorage.getItem(STORAGE_KEY) === 'true';

      if (currentScrollY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentScrollY;
      } else {
        scrollUpDistance = 0;
      }

      if (currentScrollY === 0 && scrollUpDistance > PULL_DISTANCE_PX && wasClosed) {
        banner.style.display = 'block';
        try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* ignore */ }
        scrollUpDistance = 0;
      }

      lastScrollY = currentScrollY;
      scrollScheduled = false;
    }

    window.addEventListener('scroll', function () {
      if (!scrollScheduled) {
        scrollScheduled = true;
        window.requestAnimationFrame(onScroll);
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
