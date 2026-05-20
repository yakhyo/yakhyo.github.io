# Personal Blog Built with Jekyll + Minima

<p align="center">
  <img src="assets/images/landing-page.png" alt="Preview of Yakhyo Valikhujaev's personal website" width="800">
</p>

[![License](https://img.shields.io/github/license/yakhyo/yakhyo.github.io)](LICENSE)
[![Deploy](https://github.com/yakhyo/yakhyo.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/yakhyo/yakhyo.github.io/actions/workflows/deploy.yml)

This is the source code for [yakhyo.github.io](https://yakhyo.github.io), my personal website and technical blog. It is a Jekyll site based on Minima, customized for a simple landing page, experience timeline, resume, and blog posts.

## Run Locally

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at [http://localhost:4000](http://localhost:4000).

To build the site:

```bash
bundle exec jekyll build
```

To run the same local HTML check used in CI:

```bash
bundle exec htmlproofer ./_site --disable-external --allow-hash-href \
  --ignore-empty-alt
```

## Structure

```text
_posts/        Blog posts
_pages/        Standalone pages such as About, Blog, and Resume
_layouts/      Jekyll layouts
_includes/     Shared partials
_data/         Timeline data
_sass/         Shared styles
assets/        CSS, JavaScript, images, and resume files
_config.yml    Site configuration
```

## Writing

Blog posts live in `_posts/<year>/` and use this URL format:

```text
/blog/:year/:month/:title/
```

Start from [_drafts/post-template.md](_drafts/post-template.md) when adding a new post.

## License

Code is released under the [MIT License](LICENSE). Blog content belongs to Yakhyokhuja Valikhujaev.
