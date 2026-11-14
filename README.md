# yakhyo.github.io

<p align="center">
  <img src="assets/images/landing-page.gif" alt="Landing page switching between light and dark mode" width="100%">
</p>

[![License](https://img.shields.io/github/license/yakhyo/yakhyo.github.io?label=License)](LICENSE)
[![Deploy](https://github.com/yakhyo/yakhyo.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/yakhyo/yakhyo.github.io/actions/workflows/deploy.yml)

Source for [yakhyo.github.io](https://yakhyo.github.io), my personal website and blog. Built with Jekyll.

## Run Locally

Requires Ruby 3.3.

```bash
bundle install
bundle exec jekyll serve
```

The site is served at [http://localhost:4000](http://localhost:4000).

Comments and analytics load only in production mode, which is what the deployed site uses:

```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

## License

[MIT](LICENSE)
