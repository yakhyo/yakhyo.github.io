// Site-wide enhancements: code-block copy buttons + safe analytics tracking.
(function () {
  'use strict';

  // 1. Copy button on every <pre> code block in post content.
  function injectCopyButtons() {
    const blocks = document.querySelectorAll('.post-content pre');
    blocks.forEach(function (pre) {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', function () {
        const code = pre.querySelector('code') || pre;
        const text = code.innerText;
        const done = function () {
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 1500);
        };
        const fail = function () {
          btn.textContent = 'Failed';
          setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(fail);
        } else {
          // Fallback for older browsers.
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'absolute';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); done(); } catch (_) { fail(); }
          document.body.removeChild(ta);
        }
      });
      pre.appendChild(btn);
    });
  }

  // 2. Generic analytics tracker driven by `data-track-event` attribute.
  function trackEvent(name, params) {
    if (typeof window.gtag === 'function') {
      try { window.gtag('event', name, params || {}); } catch (_) { /* ignore */ }
    }
  }

  function bindTrackedLinks() {
    document.querySelectorAll('[data-track-event]').forEach(function (el) {
      el.addEventListener('click', function () {
        const name = el.getAttribute('data-track-event');
        if (!name) return;
        trackEvent(name, {
          event_category: el.getAttribute('data-track-category') || 'engagement',
          event_label: el.getAttribute('data-track-label') || el.getAttribute('href') || ''
        });
      });
    });
  }

  function init() {
    injectCopyButtons();
    bindTrackedLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
