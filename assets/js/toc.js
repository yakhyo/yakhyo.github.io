// Post page: "On this page" TOC (right rail + mobile disclosure) built from the rendered headings, with scrollspy.
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

    // Per-post `toc_depth` front matter: 3 (default) = h2+h3, 2 = h2 only.
    var tocDepth = parseInt(nav.getAttribute('data-toc-depth'), 10);
    if (!(tocDepth >= 2)) tocDepth = 3;
    var headings = Array.prototype.slice.call(
      content.querySelectorAll(tocDepth >= 3 ? 'h2, h3' : 'h2')
    );
    if (headings.length < 2) {
      if (nav.parentNode) nav.parentNode.removeChild(nav);
      return;
    }

    var list = document.createElement('ul');
    list.className = 'post-toc-list';
    var currentSubList = null;
    var linkFor = {};

    headings.forEach(function (h) {
      // kramdown auto_ids normally sets these.
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

    // Collapsible copy at the top of the article for screens below 1280px, where the rail is hidden.
    var details = document.createElement('details');
    details.className = 'post-toc-mobile';
    var summary = document.createElement('summary');
    summary.className = 'post-toc-mobile-summary';
    summary.textContent = 'On this page';
    details.appendChild(summary);
    details.appendChild(list.cloneNode(true));
    content.insertBefore(details, content.firstChild);

    // Scrollspy: active = last heading above ACTIVATE_OFFSET. A scroll handler, not
    // IntersectionObserver, so the result never depends on which entries happened to fire.
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
