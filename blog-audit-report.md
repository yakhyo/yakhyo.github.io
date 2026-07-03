# Blog Audit Report

**Audit Date:** 2026-07-03
**Site:** https://yakhyo.github.io (Jekyll / Minima)
**Total Posts:** 8 published (+ 1 draft template, excluded)
**Average Score:** 66/100 (Acceptable — targeted improvements needed)

---

## Health Overview

| Metric | Count |
|--------|-------|
| Posts scoring 90+ (Exceptional) | 0 |
| Posts scoring 70–89 (Strong) | 2 |
| Posts scoring 50–69 (Acceptable) | 6 |
| Posts scoring <50 (Rewrite) | 0 |
| Orphan pages (0 inbound internal links) | **8 (all)** |
| Dead-end pages (0 outbound internal links) | **8 (all)** |
| Cannibalization issues | 1 (low severity) |
| Stale content (>90 days) | 0 |

The site is technically clean and content is honest and first-hand, but it is a **collection of disconnected pages, not a linked content ecosystem**. The two highest-impact opportunities are site-wide, not per-post: (1) internal linking, (2) answer-first / schema formatting for AI citations.

---

## Per-Post Scores

| Post | Score | Content /30 | SEO /25 | E-E-A-T /15 | Technical /15 | AI Cite /15 |
|------|-------|-------------|---------|-------------|---------------|-------------|
| python-core-interview-questions | **83** | 27 | 20 | 13 | 11 | 12 |
| uniface-all-in-one-face-analysis | **70** | 23 | 18 | 12 | 10 | 7 |
| high-performance-retinaface-detector | 63 | 20 | 16 | 11 | 10 | 6 |
| head-pose-estimation | 63 | 20 | 17 | 11 | 9 | 6 |
| math-for-machine-learning | 63 | 21 | 16 | 11 | 9 | 6 |
| face-parsing-bisenet | 63 | 19 | 17 | 11 | 10 | 6 |
| efficient-tiny-face-detector | 61 | 18 | 17 | 10 | 10 | 6 |
| gaze-estimation | 60 | 19 | 15 | 11 | 9 | 6 |

**Reading the scores:** the two long-form, reader-facing posts (Python interview, UniFace) clearly outperform the six repo-announcement posts. The CV posts all cluster at 60–63 for the same reasons: strong data and honesty, but short (386–586 words), README-style depth, no answer-first openers, and no internal links.

---

## Prioritized Action Queue (highest leverage first)

| # | Scope | Issue | Recommended Action | Effort |
|---|-------|-------|--------------------|--------|
| 1 | **Site-wide** | Every post is an orphan & dead-end — no internal links | Build a hub-and-spoke: make UniFace the hub; link the 6 CV model posts ⇄ UniFace, and cross-link the 4 face-* posts | Moderate |
| 2 | **Site-wide** | No answer-first openers, TL;DR, or citation capsules on the 7 project posts | Add a 40–60 word "Key Takeaways" / answer-first lead to each — the Python post's `> Short answer:` pattern is the template | Moderate |
| 3 | python-core-interview | Perfect 11-Q&A structure but no `FAQPage` JSON-LD | Add FAQPage schema — high rich-result + AI-citation upside for near-zero content change | Light |
| 4 | gaze, math, retinaface, python | Title tags >60 chars (77/70/75/74) — SERP truncation | Trim to ≤60 chars, keep primary keyword first | Light |
| 5 | head-pose, gaze, math, uniface, python | No `image:` frontmatter → generic landing-page OG image | Add a topic-relevant `image:` per post for social/preview CTR | Light |
| 6 | gaze (166), python (169) | Meta description >160 chars | Trim to 150–160 | Light |
| 7 | Site-wide | External `<img>` without width/height → CLS risk | Add explicit dimensions (Core Web Vitals) | Light |

Suggested first move: `/blog rewrite _posts/2024/2024-09-18-gaze-estimation.md` (lowest score, 60) and `/blog geo _posts/2026/2026-05-17-python-core-interview-questions.md` (add FAQ schema + capture the flagship's citation upside).

---

## Topic Cannibalization

| Primary keyword | Competing posts | Severity | Recommendation |
|-----------------|-----------------|----------|----------------|
| "face detection" (WIDER FACE, MobileNet) | retinaface-detector, efficient-tiny-face-detector | Low | **Differentiate** — RetinaFace = standard/high-accuracy detector; Tiny-Face = ultra-compact edge (<2 MB). Make the intent split explicit in each intro + cross-link |

Overall cannibalization risk is **low** — each post maps to a distinct repo/model. The only real overlap is the two face-detection posts sharing the "face detection" head term; they target different constraints (accuracy vs. size), so differentiate-and-link is correct, not merge.

---

## Orphan Pages (No Inbound Internal Links)

All 8 posts have zero inbound internal links. Highest-value links to build:

| Orphan | Recommended inbound link sources |
|--------|----------------------------------|
| uniface-all-in-one-face-analysis (the natural hub) | retinaface, tiny-face, face-parsing, gaze, head-pose (all 5 ship in UniFace and already name it) |
| head-pose-estimation | uniface, gaze-estimation |
| gaze-estimation | uniface, head-pose-estimation |
| high-performance-retinaface-detector | uniface, tiny-face-detector |
| efficient-tiny-face-detector | uniface, retinaface-detector |
| face-parsing-bisenet | uniface |
| math-for-machine-learning | (topical outlier — link from any CV post's "background math" mention, or leave as a standalone) |
| python-core-interview-questions | (topical outlier — no natural CV sibling) |

Note: retinaface, face-parsing, and gaze already **mention** UniFace but link to the GitHub repo, not the UniFace blog post. Converting those three mentions into internal post links is the single easiest win.

---

## Stale Content

**No stale content.** Every post carries a `modified_date` in May 2026 (46–52 days before audit), all inside the 90-day freshness window.

| Post | Published | Modified | Days since modified | Priority |
|------|-----------|----------|---------------------|----------|
| python-core-interview | 2026-05-17 | 2026-05-19 | 45 | Low |
| head-pose-estimation | 2024-09-17 | 2026-05-18 | 46 | Low |
| gaze-estimation | 2024-09-18 | 2026-05-18 | 46 | Low |
| retinaface-detector | 2024-10-28 | 2026-05-18 | 46 | Low |
| tiny-face-detector | 2024-11-09 | 2026-05-18 | 46 | Low |
| face-parsing-bisenet | 2024-11-29 | 2026-05-18 | 46 | Low |
| uniface | 2025-11-11 | 2026-05-18 | 46 | Low |
| math-for-machine-learning | 2024-09-19 | 2026-05-12 | 52 | Low |

Caveat: the uniform `2026-05-18` modified date across six 2024 posts looks like a batch touch-up rather than a genuine content refresh. Freshness *signals* are fine; just don't rely on them as evidence the underlying benchmarks are current.

---

## What's Working (keep doing this)

- **First-hand experience** — every CV post documents the author's own repo with real benchmark tables. This is the hardest E-E-A-T signal to fake and it's genuine here.
- **Honest framing** — "release weights are not available," "the tradeoff is visible on the hard split." No overclaiming; this ages well under Google's helpful-content system.
- **Clean heading hierarchy** — no skipped levels anywhere; H2/H3 only.
- **jekyll-seo-tag baseline** — BlogPosting + Person + OG + Twitter cards are emitted automatically site-wide.
- **The Python interview post** — deep (4,923 words), original, `Short answer` capsules, Q&A headings, a References section, mermaid diagrams. This is the template the rest of the blog should follow.

---

## Methodology

Scored on the claude-blog 5-category, 100-point rubric: Content Quality (30), SEO (25), E-E-A-T (15), Technical (15), AI Citation Readiness (15). Internal-link graph, title/description lengths, and OG-image coverage verified by static scan of `_posts/`. Freshness computed against audit date 2026-07-03.
