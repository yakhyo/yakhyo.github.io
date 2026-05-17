// Announcement banner: close-to-dismiss with per-version localStorage.
// `data-version` on the banner is derived from the announcement text+link
// (see _includes/announcement-banner.html). When you change the copy in
// _config.yml the version key changes and the banner reappears for everyone.
(function () {
  'use strict';

  function init() {
    var banner = document.getElementById('announcement-banner');
    if (!banner) return;
    var key = 'announcement_dismissed_' + (banner.getAttribute('data-version') || 'default');

    try {
      if (localStorage.getItem(key) === 'true') { banner.style.display = 'none'; return; }
    } catch (_) { /* storage blocked — show banner, dismiss won't persist */ }

    var close = banner.querySelector('.announcement-close');
    if (close) close.addEventListener('click', function () {
      banner.style.display = 'none';
      try { localStorage.setItem(key, 'true'); } catch (_) { /* ignore */ }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
