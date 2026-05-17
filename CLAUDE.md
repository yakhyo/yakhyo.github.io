# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bundle install                                  # install gems (Ruby 3.3, see .ruby-version)
bundle exec jekyll serve                        # local dev at http://localhost:4000
JEKYLL_ENV=production bundle exec jekyll serve  # local preview of production build
bundle exec jekyll build                        # one-shot build into _site/
JEKYLL_ENV=production bundle exec jekyll build  # what GitHub Pages actually runs
bundle exec htmlproofer ./_site \
  --disable-external --allow-hash-href --ignore-empty-alt
                                                # mirrors the CI link/HTML check
```

There are no unit tests. The only "test" in this repo is `html-proofer` (gem in the `:test` group of [Gemfile](Gemfile)) — same flags as CI.

## Deploy

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds with `JEKYLL_ENV=production`, runs `htmlproofer`, then publishes via `actions/deploy-pages`. **The htmlproofer step has `continue-on-error: true`** — it surfaces issues but does not block deploys. If you tighten quality gates, that's the first flag to flip.

## Architecture

Jekyll 4.3 site using the **Minima** theme with substantial overrides. Plugins: `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`. Everything below is layered on top of Minima.

### Content sources

- `_posts/<year>/YYYY-MM-DD-slug.md` — blog posts. Permalink scheme is `/blog/:year/:month/:title/` (set in [_config.yml](_config.yml)), so posts live under `/blog/...` even though source files are flat.
- `_pages/` — non-default Jekyll dir; surfaced by `include: [_pages]` in [_config.yml](_config.yml). Pages are added to the nav via `header_pages:` in the same file.
- `_data/timeline.yml` — experience entries rendered by [_includes/timeline.html](_includes/timeline.html) on the landing page.
- `assets/resumes/` — the **current** resume filename lives in `_config.yml` under `resume.pdf` so [_pages/about.md](_pages/about.md) and others can reference one source of truth.

### Layouts & includes

- [_layouts/default.html](_layouts/default.html) is the chrome (head, header, footer, skip-link). [_layouts/home.html](_layouts/home.html) is the blog index with the search + year + topic filter UI. [_layouts/post.html](_layouts/post.html) renders posts plus JSON-LD `BlogPosting` structured data.
- Per-page asset loading: any page may declare `custom_css: foo` and/or `custom_js: foo` in frontmatter. [_includes/head.html](_includes/head.html) splits on commas and loads `/assets/css/<name>.css` / `/assets/js/<name>.js` accordingly. This is how the landing, blog, and about pages each pull only the CSS/JS they need.
- `assets/main.scss` defines brand-color tokens at the top — reuse them rather than introducing new hex literals.

### Comments

[_includes/giscus.html](_includes/giscus.html) is the only provider and only emits in `production` (and only when `site.giscus.repo` is set). `giscus.theme` is currently hardcoded to `light` in [_config.yml](_config.yml) — toggle here if you ever wire up dark mode.

### Blog index filter

[_layouts/home.html](_layouts/home.html) emits one topic-filter button per category — but **only for categories with `>= 2` posts** (`{%- if cat[1].size >= 2 -%}`). Single-post categories are intentionally hidden from the filter bar. [assets/js/blog-filter.js](assets/js/blog-filter.js) drives search + year + topic filtering client-side over the fully-rendered post list (no pagination; `site.paginate` is not configured even though the layout has a paginator block).

### Single-author convention

The author is intentionally hidden from the visible post meta line ([_layouts/post.html](_layouts/post.html)) but preserved in JSON-LD and `itemprop` for SEO. Don't add a visible byline.

### Analytics & tracked links

[assets/js/site.js](assets/js/site.js) injects copy buttons on `<pre>` blocks and wires any element with `data-track-event="<name>"` to `gtag`. Use that attribute (not inline JS) for new tracked links — example in [_pages/about.md](_pages/about.md) on the resume-download link. GA only loads in `production` via [_includes/google-analytics.html](_includes/google-analytics.html).

## Post frontmatter contract

Established by existing posts in [_posts/](_posts):

```yaml
---
layout: post
title: "..."
date: YYYY-MM-DD 12:00:00 +0900
modified_date: YYYY-MM-DD 12:00:00 +0900   # optional; surfaces a "Modified:" line
comments: true                              # default; set false to suppress giscus
categories: <single-category-slug>          # used by the topic filter
tags: [kebab-case-tags]                     # used in keywords + display
description: "..."                          # used by SEO and as post excerpt
image: /assets/images/...                   # optional; falls back to site default
---
```

`_config.yml` sets a default `image` and `author` for posts under `defaults:`. Do not duplicate those unless overriding.

## SEO / indexing flags

Pages can opt out with `noindex: true` (emits `<meta name="robots" content="noindex,nofollow">` in head) and `sitemap: false` (consumed by `jekyll-sitemap`). Use both when adding internal-only pages.

## Excluded from build

Beyond the usual, [_config.yml](_config.yml) excludes `gemfiles/`, `node_modules/`, and `vendor/`. There is no Node toolchain in this repo — don't introduce one without a strong reason; the site is intentionally Ruby-only.
