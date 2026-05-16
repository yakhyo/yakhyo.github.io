(function () {
  'use strict';

  var STORAGE_PREFIX = 'announcement_dismissed_';
  var PULL_DISTANCE_PX = 100;

  function storageAvailable() {
    try {
      var key = '__storage_test__';
      localStorage.setItem(key, '1');
      localStorage.removeItem(key);
      return true;
    } catch (_) {
      return false;
    }
  }

  function init() {
    var banner = document.getElementById('announcement-banner');
    if (!banner) return;

    var version = banner.getAttribute('data-version') || 'default';
    var storageKey = STORAGE_PREFIX + version;
    var hasStorage = storageAvailable();

    if (hasStorage && localStorage.getItem(storageKey) === 'true') {
      banner.style.display = 'none';
    }

    var closeBtn = banner.querySelector('.announcement-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        banner.style.display = 'none';
        if (hasStorage) localStorage.setItem(storageKey, 'true');
      });
    }

    var lastScrollY = 0;
    var scrollUpDistance = 0;
    var scrollScheduled = false;

    function onScroll() {
      var currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        scrollUpDistance += lastScrollY - currentScrollY;
      } else {
        scrollUpDistance = 0;
      }

      if (currentScrollY === 0 && scrollUpDistance > PULL_DISTANCE_PX && hasStorage &&
          localStorage.getItem(storageKey) === 'true') {
        banner.style.display = 'block';
        localStorage.removeItem(storageKey);
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
