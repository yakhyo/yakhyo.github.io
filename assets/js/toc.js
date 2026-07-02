// Post page: build a right-rail "On this page" table of contents from the
// rendered h2/h3 and highlight the section currently in view (MkDocs-style
// scrollspy). Vanilla, no deps — matches site.js / blog-filter.js conventions.
(function () {
  'use strict';

  function slugify(s) {
    return s.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  function init() {
    var nav = document.querySelector('.post-toc');
    var content = document.querySelector('.post-content');
    if (!nav || !content) return;

    var headings = Array.prototype.slice.call(
      content.querySelectorAll('h2, h3')
    );
    // A TOC with one (or zero) entries is noise — drop the rail entirely.
    if (headings.length < 2) {
      if (nav.parentNode) nav.parentNode.removeChild(nav);
      return;
    }

    var list = document.createElement('ul');
    list.className = 'post-toc-list';
    var currentSubList = null;
    var linkFor = {};

    headings.forEach(function (h) {
      // kramdown auto_ids usually sets these already; guard for safety.
      if (!h.id) {
        h.id = slugify(h.textContent) ||
          ('section-' + Math.random().toString(36).slice(2, 7));
      }

      var li = document.createElement('li');
      li.className = 'post-toc-item post-toc-' + h.tagName.toLowerCase();
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.className = 'post-toc-link';
      li.appendChild(a);
      linkFor[h.id] = a;

      if (h.tagName === 'H3') {
        if (!currentSubList) {
          currentSubList = document.createElement('ul');
          currentSubList.className = 'post-toc-sublist';
          (list.lastElementChild || list).appendChild(currentSubList);
        }
        currentSubList.appendChild(li);
      } else {
        currentSubList = null;
        list.appendChild(li);
      }
    });

    var title = document.createElement('p');
    title.className = 'post-toc-title';
    title.textContent = 'On this page';
    nav.appendChild(title);
    nav.appendChild(list);
    nav.hidden = false;

    // Mobile disclosure: the same list, collapsible, inserted at the top of the
    // article. The fixed right-rail nav above is hidden below 1280px, so this is
    // the only in-page navigation small screens get.
    var details = document.createElement('details');
    details.className = 'post-toc-mobile';
    var summary = document.createElement('summary');
    summary.className = 'post-toc-mobile-summary';
    summary.textContent = 'On this page';
    details.appendChild(summary);
    details.appendChild(list.cloneNode(true));
    content.insertBefore(details, content.firstChild);

    // Scrollspy: the current section is the last heading whose top has
    // scrolled past a line near the top of the viewport. A throttled scroll
    // handler (rather than IntersectionObserver) keeps this deterministic.
    var activeLink = null;
    function setActive(a) {
      if (!a || a === activeLink) return;
      if (activeLink) activeLink.classList.remove('is-active');
      a.classList.add('is-active');
      activeLink = a;
    }

    var ACTIVATE_OFFSET = 120; // px from viewport top
    function currentHeading() {
      var current = headings[0];
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top - ACTIVATE_OFFSET <= 0) {
          current = headings[i];
        } else {
          break;
        }
      }
      return current;
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        setActive(linkFor[currentHeading().id]);
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    var prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // One delegated handler covers both the rail and the mobile disclosure.
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a.post-toc-link');
      if (!a) return;
      var target = document.getElementById(
        decodeURIComponent(a.getAttribute('href').slice(1))
      );
      if (!target) return;
      if (details.open) details.open = false;   // collapse mobile TOC after a jump
      if (prefersReducedMotion) return;          // let the native anchor jump happen
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
