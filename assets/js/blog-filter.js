// Blog index: search + year + topic filtering.
// Extracted from _layouts/home.html.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const postItems = document.querySelectorAll('.post-item');
    const yearGroups = document.querySelectorAll('.post-year-group');
    const noPostsMessage = document.getElementById('no-posts');
    const searchInput = document.getElementById('search-input');
    if (!postItems.length || !searchInput) return;

    function setNoPosts(visible, message) {
      if (!noPostsMessage) return;
      noPostsMessage.style.display = visible ? 'block' : 'none';
      if (visible && message) {
        const p = noPostsMessage.querySelector('p');
        if (p) p.textContent = message;
      }
    }

    function applyFiltersWithSearch() {
      const term = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;
      postItems.forEach(function (post) {
        var match = true;
        if (term) {
          var link = post.querySelector('.post-link');
          var title = link ? link.textContent.toLowerCase() : '';
          var excerptEl = post.querySelector('.post-excerpt');
          var excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
          match = title.includes(term) || excerpt.includes(term);
        }
        if (match) {
          post.style.display = '';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }
      });
      // Hide year sections whose posts are all filtered out.
      yearGroups.forEach(function (section) {
        const anyVisible = section.querySelector('.post-item:not([style*="display: none"])');
        section.style.display = anyVisible ? '' : 'none';
      });
      setNoPosts(visibleCount === 0, 'No posts found matching your search.');
    }

    let searchTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(applyFiltersWithSearch, 200);
    });
  });
})();
