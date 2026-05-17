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
  // 1. Copy icon button on every <pre> code block in post content.
  // Lucide "files" icon → check icon on success; blue tint on success state.
  // ---------------------------------------------------------------------------
  const ICON_COPY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 7H10a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/><path d="M16 3H6a2 2 0 0 0-2 2v10"/></svg>';
  const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

  function injectCopyButtons() {
    document.querySelectorAll('.post-content pre').forEach(function (pre) {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.innerHTML = ICON_COPY;
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.addEventListener('click', function () {
        if (btn.classList.contains('copied')) return;
        const code = pre.querySelector('code') || pre;
        copyToClipboard(code.innerText,
          function () {
            btn.classList.add('copied');
            btn.innerHTML = ICON_CHECK;
            btn.setAttribute('aria-label', 'Copied');
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.innerHTML = ICON_COPY;
              btn.setAttribute('aria-label', 'Copy code to clipboard');
            }, 1500);
          },
          function () { btn.setAttribute('aria-label', 'Copy failed'); }
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

  // ---------------------------------------------------------------------------
  // 4. Reading-progress bar (post pages only — element absent elsewhere).
  // ---------------------------------------------------------------------------
  function bindReadingProgress() {
    const bar = document.querySelector('.reading-progress-bar');
    if (!bar) return;
    let ticking = false;
    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const pct = scrollable > 0 ? (doc.scrollTop || document.body.scrollTop) / scrollable : 0;
      bar.style.width = Math.min(100, Math.max(0, pct * 100)) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  function init() {
    injectCopyButtons();
    bindCopyLinkButtons();
    bindTrackedLinks();
    bindReadingProgress();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
