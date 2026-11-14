// Blog search: a dialog opened from the search bar on the blog index, "/" or Cmd/Ctrl+K.
// Searches the full text of posts by section, plus projects and pages (index: assets/search.json).
(function () {
  'use strict';

  const INDEX_URL = new URL('../search.json', document.currentScript.src).href;
  const MAX_DOCS = 8;
  const MAX_SECTIONS = 3;

  let dialog, input, list, docs = null, loading = null, hits = [], active = -1;

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  }

  function parse(entries) {
    return entries.map(function (e) {
      const sections = [];
      (e.c || '').split('§§').forEach(function (part, i) {
        let id = '', heading = '', text = part;
        if (i > 0) {
          const m = part.match(/^([^"]*)">([\s\S]*?)¶¶([\s\S]*)$/);
          if (m) { id = m[1]; heading = m[2].trim(); text = m[3]; }
        }
        text = text.trim();
        if (text || heading) sections.push({ id: id, heading: heading, text: text, lower: (heading + ' ' + text).toLowerCase(), headingLower: heading.toLowerCase() });
      });
      return { title: e.t, url: e.u, meta: e.m, summary: e.s || '', head: (e.t + ' ' + (e.s || '')).toLowerCase(), titleLower: e.t.toLowerCase(), sections: sections };
    });
  }

  function load() {
    if (!loading) {
      loading = fetch(INDEX_URL)
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (entries) { docs = parse(entries); })
        .catch(function () { loading = null; docs = null; });
    }
    return loading;
  }

  function count(hay, term) {
    let n = 0, i = hay.indexOf(term);
    while (i !== -1 && n < 5) { n++; i = hay.indexOf(term, i + term.length); }
    return n;
  }

  // Every term must appear in the document's title/summary or in the section itself.
  function search(terms) {
    const results = [];
    docs.forEach(function (doc) {
      let headScore = 0;
      const inHead = terms.map(function (t) {
        const hit = doc.head.includes(t);
        if (doc.titleLower.includes(t)) headScore += 10; else if (hit) headScore += 3;
        return hit;
      });
      const matched = [];
      doc.sections.forEach(function (s) {
        let score = 0, any = false;
        const ok = terms.every(function (t, i) {
          const n = count(s.lower, t);
          if (n) { any = true; score += n + (s.headingLower.includes(t) ? 5 : 0); }
          return n || inHead[i];
        });
        if (ok && any) matched.push({ section: s, score: score });
      });
      matched.sort(function (a, b) { return b.score - a.score; });
      const allInHead = inHead.every(Boolean);
      if (!matched.length && !allInHead) return;
      results.push({ doc: doc, sections: matched.slice(0, MAX_SECTIONS), score: headScore + (matched[0] ? matched[0].score : 0) + matched.length });
    });
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, MAX_DOCS);
  }

  function excerpt(text, terms) {
    const lower = text.toLowerCase();
    let at = -1;
    terms.forEach(function (t) { const i = lower.indexOf(t); if (i !== -1 && (at === -1 || i < at)) at = i; });
    if (at === -1) return text.slice(0, 160) + (text.length > 160 ? '…' : '');
    const start = Math.max(0, at - 60), end = Math.min(text.length, at + 120);
    return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
  }

  // Builds text nodes and <mark> elements, so index text is never parsed as HTML.
  function highlight(node, text, terms) {
    const pattern = new RegExp('(' + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'ig');
    text.split(pattern).forEach(function (piece, i) {
      if (!piece) return;
      node.appendChild(i % 2 ? el('mark', '', piece) : document.createTextNode(piece));
    });
  }

  function message(text) {
    list.replaceChildren(el('p', 'search-empty', text));
    hits = []; active = -1;
  }

  function setActive(i) {
    if (hits[active]) hits[active].classList.remove('is-active');
    active = i;
    if (hits[active]) {
      hits[active].classList.add('is-active');
      hits[active].scrollIntoView({ block: 'nearest' });
    }
  }

  function render() {
    const query = input.value.trim();
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) { list.replaceChildren(); hits = []; active = -1; return; }
    if (!docs) return message(loading ? 'Loading…' : 'Search is unavailable right now.');
    const results = search(terms);
    if (!results.length) return message('No results for "' + query + '".');

    const frag = document.createDocumentFragment();
    results.forEach(function (r) {
      const group = el('div', 'search-group');
      const top = el('a', 'search-hit search-hit-doc');
      top.href = r.doc.url;
      const title = el('span', 'search-hit-title');
      highlight(title, r.doc.title, terms);
      top.appendChild(title);
      top.appendChild(el('span', 'search-hit-meta', r.doc.meta));
      if (r.doc.summary) {
        const sum = el('span', 'search-hit-text');
        highlight(sum, r.doc.summary, terms);
        top.appendChild(sum);
      }
      group.appendChild(top);
      r.sections.forEach(function (m) {
        const a = el('a', 'search-hit search-hit-section');
        a.href = r.doc.url + (m.section.id ? '#' + m.section.id : '');
        if (m.section.heading) {
          const h = el('span', 'search-hit-heading');
          highlight(h, m.section.heading, terms);
          a.appendChild(h);
        }
        const t = el('span', 'search-hit-text');
        highlight(t, excerpt(m.section.text, terms), terms);
        a.appendChild(t);
        group.appendChild(a);
      });
      frag.appendChild(group);
    });
    list.replaceChildren(frag);
    list.scrollTop = 0;
    hits = Array.prototype.slice.call(list.querySelectorAll('.search-hit'));
    active = -1;
    setActive(0);
  }

  function build() {
    dialog = el('dialog', 'search-dialog');
    dialog.setAttribute('aria-label', 'Search');
    const panel = el('div', 'search-panel');
    const field = el('div', 'search-field');
    input = el('input', 'search-input');
    input.type = 'search';
    input.placeholder = 'Search';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.setAttribute('aria-label', 'Search the site');
    const esc = el('button', 'search-close', 'esc');
    esc.type = 'button';
    esc.setAttribute('aria-label', 'Close search');
    field.appendChild(input);
    field.appendChild(esc);
    list = el('div', 'search-results');
    list.setAttribute('aria-live', 'polite');
    const foot = el('div', 'search-foot');
    [['↑↓', 'move'], ['↵', 'open'], ['esc', 'close']].forEach(function (k) {
      const item = el('span');
      item.appendChild(el('kbd', '', k[0]));
      item.appendChild(document.createTextNode(' ' + k[1]));
      foot.appendChild(item);
    });
    panel.appendChild(field);
    panel.appendChild(list);
    panel.appendChild(foot);
    dialog.appendChild(panel);
    document.body.appendChild(dialog);

    input.addEventListener('input', render);
    esc.addEventListener('click', function () { dialog.close(); });
    // A click on the dialog element itself is a click on the backdrop.
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    list.addEventListener('mousemove', function (e) {
      const hit = e.target.closest('.search-hit');
      const i = hits.indexOf(hit);
      if (i !== -1 && i !== active) { if (hits[active]) hits[active].classList.remove('is-active'); active = i; hit.classList.add('is-active'); }
    });
    // Same-page section links: close so the jump is visible.
    list.addEventListener('click', function (e) { if (e.target.closest('.search-hit')) dialog.close(); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!hits.length) return;
        const step = e.key === 'ArrowDown' ? 1 : -1;
        setActive((active + step + hits.length) % hits.length);
      } else if (e.key === 'Enter' && hits[active]) {
        e.preventDefault();
        hits[active].click();
      }
    });
  }

  function open() {
    if (!dialog) build();
    if (dialog.open) { input.focus(); return; }
    dialog.showModal();
    input.select();
    render();
    load().then(function () { if (dialog.open) render(); });
  }

  function isTyping(target) {
    return target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
  }

  function init() {
    if (!window.HTMLDialogElement) return;
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    document.querySelectorAll('.search-toggle').forEach(function (btn) {
      const key = btn.querySelector('.search-toggle-key');
      if (key) key.textContent = mac ? '⌘K' : 'Ctrl K';
      btn.hidden = false;
      btn.addEventListener('click', open);
      btn.addEventListener('pointerenter', load, { once: true });
    });
    document.addEventListener('keydown', function (e) {
      const palette = (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k';
      const slash = e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTyping(e.target);
      if (!palette && !slash) return;
      e.preventDefault();
      open();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
