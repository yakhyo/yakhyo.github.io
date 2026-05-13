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

    function applyFilters() {
      let visibleCount = 0;
      postItems.forEach(function (post) {
        const categories = post.getAttribute('data-categories') || '';
        const year = post.getAttribute('data-year') || '';
        const topicMatch = currentTopic === 'all' || categories.includes(currentTopic);
        const yearMatch = currentYear === 'all' || year === currentYear;
        if (topicMatch && yearMatch) {
          post.style.display = 'block';
          visibleCount++;
        } else {
          post.style.display = 'none';
        }
      });
      setNoPosts(visibleCount === 0, 'No posts found for this selection.');
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const term = this.value.toLowerCase().trim();
        if (term === '') {
          applyFilters();
          return;
        }
        let visibleCount = 0;
        postItems.forEach(function (post) {
          const link = post.querySelector('.post-link');
          const title = link ? link.textContent.toLowerCase() : '';
          const categories = (post.getAttribute('data-categories') || '').toLowerCase();
          const excerptEl = post.querySelector('.post-excerpt');
          const excerpt = excerptEl ? excerptEl.textContent.toLowerCase() : '';
          if (title.includes(term) || categories.includes(term) || excerpt.includes(term)) {
            post.style.display = 'block';
            visibleCount++;
          } else {
            post.style.display = 'none';
          }
        });
        setNoPosts(visibleCount === 0, 'No posts found matching your search.');
      });
    }

    if (yearFilter) {
      yearFilter.addEventListener('change', function () {
        currentYear = this.value;
        if (searchInput) searchInput.value = '';
        applyFilters();
      });
    }

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        filterButtons.forEach(function (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        currentTopic = this.getAttribute('data-topic');
        applyFilters();
      });
    });
  });
})();
