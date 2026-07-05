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

  // ---------------------------------------------------------------------------
  // 5. Theme toggle — light / dark. The effective theme is either an explicit
  // choice on <html data-theme> (persisted to localStorage) or, absent that,
  // the OS preference. Toggling flips to the opposite of what's showing, saves
  // it, and notifies theme-aware widgets (giscus comments, mermaid diagrams).
  // ---------------------------------------------------------------------------
  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function effectiveTheme() {
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return prefersDark() ? 'dark' : 'light';
  }

  // Point giscus (if present) at the matching theme via its postMessage API.
  function syncGiscusTheme(theme) {
    const frame = document.querySelector('iframe.giscus-frame');
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      { giscus: { setConfig: { theme: theme === 'dark' ? 'dark' : 'light' } } },
      'https://giscus.app'
    );
  }

  // The static theme-color metas in head.html are keyed on prefers-color-scheme,
  // so they follow the OS. Once JS is running, manage a single meta that tracks
  // the *active* theme instead, so an explicit choice that differs from the OS
  // still tints the browser chrome to match the page. (No-JS readers keep the
  // static metas as a fallback.)
  function updateThemeColor(theme) {
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      if (!m.hasAttribute('data-dynamic')) m.remove();
    });
    let meta = document.querySelector('meta[name="theme-color"][data-dynamic]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      meta.setAttribute('data-dynamic', '');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', theme === 'dark' ? '#0d0d0f' : '#fdfdfd');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) { /* ignore */ }
    updateThemeColor(theme);
    syncGiscusTheme(theme);
    // Let non-CSS widgets (mermaid) re-render for the new theme.
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
    trackEvent('theme-toggle', { event_label: theme });
  }

  function bindThemeToggle() {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        applyTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');
      });
    }

    // Match the browser chrome to the active theme on load — covers a saved
    // choice that differs from the OS (the static metas alone follow the OS).
    updateThemeColor(effectiveTheme());

    // giscus loads lazily and injects its iframe *after* this runs, so we can't
    // gate on `.giscus` existing yet. Listen for giscus's own ready message and
    // push the current theme whenever it speaks — this themes the comments on
    // first render (e.g. for a dark-mode reader) with no manual toggle needed.
    window.addEventListener('message', function (e) {
      if (e.origin === 'https://giscus.app' && e.data && e.data.giscus) {
        syncGiscusTheme(effectiveTheme());
      }
    });

    // Follow live OS theme flips while the reader has no explicit choice: CSS
    // updates via the media query, but the chrome color and non-CSS widgets
    // (mermaid, giscus) need a nudge.
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onOsChange = function () {
        if (document.documentElement.getAttribute('data-theme')) return; // explicit choice wins
        const theme = mq.matches ? 'dark' : 'light';
        updateThemeColor(theme);
        syncGiscusTheme(theme);
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
      };
      if (mq.addEventListener) mq.addEventListener('change', onOsChange);
      else if (mq.addListener) mq.addListener(onOsChange); // Safari < 14
    }
  }

  // ---------------------------------------------------------------------------
  // 6. Back-to-top button (post pages only). Appears once the reader is well
  // down a long article — the desktop TOC rail is hidden on small screens, so
  // this is the quickest way back up on mobile.
  // ---------------------------------------------------------------------------
  const ICON_ARROW_UP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';

  function bindBackToTop() {
    if (!document.querySelector('article.post')) return;   // post pages only
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = ICON_ARROW_UP;
    document.body.appendChild(btn);

    const reduce = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    let ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function init() {
    injectCopyButtons();
    bindCopyLinkButtons();
    bindTrackedLinks();
    bindReadingProgress();
    bindThemeToggle();
    bindBackToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
