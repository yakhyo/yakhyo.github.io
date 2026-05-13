// Blog index: search + year + topic filtering.
// Extracted from _layouts/home.html.
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postItems = document.querySelectorAll('.post-item');
    const noPostsMessage = document.getElementById('no-posts');
    const searchInput = document.getElementById('search-input');
    const yearFilter = document.getElementById('year-filter');
    if (!postItems.length) return;

    let currentTopic = 'all';
    let currentYear = 'all';

    function setNoPosts(visible, message) {
      if (!noPostsMessage) return;
      noPostsMessage.style.display = visible ? 'block' : 'none';
      if (visible && message) {
        const p = noPostsMessage.querySelector('p');
        if (p) p.textContent = message;
      }
    }

    function applyFiltersWithSearch() {
      const term = searchInput ? searchInput.value.toLowerCase().trim() : '';
      let visibleCount = 0;
      postItems.forEach(function (post) {
        const categories = post.getAttribute('data-categories') || '';
        const year = post.getAttribute('data-year') || '';
        const topicMatch = currentTopic === 'all' || categories.includes(currentTopic);
        const yearMatch = currentYear === 'all' || year === currentYear;
        var textMatch = true;
        if (term) {
          var link = post.querySelector('.post-link');
          var title = link ? link.textContent.toLowerCase() : '';
          var cats = categories.toLowerCase();
          var excerptEl = post.querySelector('.post-excerpt');
          var excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
          textMatch = title.includes(term) || cats.includes(term) || excerpt.includes(term);
        }
        if (topicMatch && yearMatch && textMatch) {
          post.style.display = 'block';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }
      });
      setNoPosts(visibleCount === 0, term ? 'No posts found matching your search.' : 'No posts found for this selection.');
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        applyFiltersWithSearch();
      });
    }

    if (yearFilter) {
      yearFilter.addEventListener('change', function () {
        currentYear = this.value;
        applyFiltersWithSearch();
      });
    }

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        currentTopic = this.getAttribute('data-topic');
        applyFiltersWithSearch();
      });
    });
  });
})();
