// Site-wide enhancements: code-block copy buttons, share copy-link buttons,
// and a generic analytics-event tracker.
(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Shared helpers
  // ---------------------------------------------------------------------------

  // Copy `text` to the clipboard using the modern API where available,
  // falling back to a hidden <textarea> + execCommand for older browsers.
  function copyToClipboard(text, onOk, onFail) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onOk).catch(onFail);
      return;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); onOk(); } catch (_) { onFail(); }
    document.body.removeChild(ta);
  }

  // Fire a Google Analytics event when gtag is loaded. No-op otherwise.
  function trackEvent(name, params) {
    if (typeof window.gtag === 'function') {
      try { window.gtag('event', name, params || {}); } catch (_) { /* ignore */ }
    }
  }

  // ---------------------------------------------------------------------------
  // 1. Copy button injected on every <pre> code block in post content.
  // ---------------------------------------------------------------------------
  function injectCopyButtons() {
    document.querySelectorAll('.post-content pre').forEach(function (pre) {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', function () {
        const code = pre.querySelector('code') || pre;
        const flash = function (label, klass) {
          btn.textContent = label;
          if (klass) btn.classList.add(klass);
          setTimeout(function () {
            btn.textContent = 'Copy';
            if (klass) btn.classList.remove(klass);
          }, 1500);
        };
        copyToClipboard(
          code.innerText,
          function () { flash('Copied!', 'copied'); },
          function () { flash('Failed', null); }
        );
      });
      pre.appendChild(btn);
    });
  }

  // ---------------------------------------------------------------------------
  // 2. Copy-link buttons in the post share row.
  // ---------------------------------------------------------------------------
  function bindCopyLinkButtons() {
    document.querySelectorAll('.copy-link-btn').forEach(function (btn) {
      // Capture the original aria-label once at bind time so rapid clicks
      // (which transiently set it to "Link copied") can't poison the restore.
      const originalLabel = btn.getAttribute('aria-label');
      btn.addEventListener('click', function () {
        if (btn.classList.contains('copied')) return;   // already mid-flash
        const url = btn.getAttribute('data-copy-url') || window.location.href;
        const flash = function (ok) {
          btn.classList.add('copied');
          btn.setAttribute('aria-label', ok ? 'Link copied' : 'Copy failed');
          setTimeout(function () {
            btn.classList.remove('copied');
            btn.setAttribute('aria-label', originalLabel);
          }, 1500);
        };
        copyToClipboard(url, function () { flash(true); }, function () { flash(false); });
        trackEvent('share-copy-link', { event_label: url });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Generic analytics tracker driven by `data-track-event` attributes.
  // ---------------------------------------------------------------------------
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
    bindCopyLinkButtons();
    bindTrackedLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
