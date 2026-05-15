---
# Copy this file to _posts/<year>/YYYY-MM-DD-your-slug.md and edit.
# The filename's date is what drives the URL — keep it consistent with `date:`.
#
# Required fields:
layout: post
title: "Your post title goes here"
date: 2026-01-15 12:00:00 +0900       # YYYY-MM-DD HH:MM:SS +TZ-offset
description: "One-line description. Used in SEO meta and as the blog-index excerpt."
categories: machine-learning           # SINGLE category slug (kebab-case).
                                       # Drives the topic-filter button on /blog/.
                                       # Only categories with ≥2 posts get a filter button.

# Optional fields (remove the lines you don't need):
modified_date: 2026-02-01 12:00:00 +0900   # Surfaces "Updated <date>" on the post.
tags: [transformers, retrieval, rag]       # kebab-case, used as keywords + JSON-LD.
image: /assets/images/posts/cover.jpg      # Cover/OG image. Falls back to avatar.
                                           # Use 1200×630 for best social previews.
comments: false                            # Default is true (giscus). Set false to
                                           # suppress comments on this post only.
---

<!--
  Body content starts below. Notes on what you can use:

  - Code blocks get a copy button automatically (see assets/js/site.js).
  - Tables are styled site-wide; just write them as markdown.
  - Inline LaTeX needs no setup — write $a^2 + b^2 = c^2$ where supported.
  - For a table of contents, drop  `* TOC{:toc}`  after a list.
  - Images: place under /assets/images/posts/<slug>/ to keep things tidy.
-->

## Section heading

Open with a short paragraph that frames the problem or context.

## Another section

Body text. Use **bold** sparingly — only for the key technologies and the
measurable outcomes. Don't bold every other word.

```python
# Code blocks get a "Copy" button on hover in posts.
def hello():
    return "world"
```

| Column A | Column B           |
| -------- | ------------------ |
| Markdown | tables work too    |
| They     | fill the container |

## Closing

End with a takeaway or a link to the code / paper / repo.
