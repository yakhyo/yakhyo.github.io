# Yakhyo Valikhujaev - Personal Website

[![GitHub License](https://img.shields.io/github/license/yakhyo/yakhyo.github.io)](LICENSE)
[![Build Status](https://github.com/yakhyo/yakhyo.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/yakhyo/yakhyo.github.io/actions)

> Personal website and technical blog for ML Software Engineer Yakhyo Valikhujaev

**Live Site:** [https://yakhyo.github.io](https://yakhyo.github.io)

## About

This is my personal website where I share insights about machine learning engineering, computer vision, natural language processing, and MLOps. The site showcases my portfolio, technical blog posts, and professional experience.

## Tech Stack

- **Static Site Generator:** Jekyll 4.3.4
- **Theme:** Minima 2.5.2 (customized)
- **Hosting:** GitHub Pages
- **Plugins:**
  - jekyll-feed (RSS)
  - jekyll-seo-tag (SEO optimization)
  - jekyll-sitemap (XML sitemap)
- **Comments:** Disqus
- **Analytics:** Google Analytics

---

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby** 3.0 or higher
- **Bundler** gem
- **Jekyll** gem

#### Install Ruby (macOS)

```bash
# Using Homebrew
brew install ruby

# Add Ruby to your PATH (add to ~/.zshrc or ~/.bash_profile)
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
```

#### Install Ruby (Ubuntu/Debian)

```bash
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev

# Add to ~/.bashrc
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

#### Install Bundler and Jekyll

```bash
gem install bundler jekyll
```

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/yakhyo/yakhyo.github.io.git
cd yakhyo.github.io
```

### 2. Install Dependencies

```bash
bundle install
```

This will install all required gems including:
- Jekyll 4.3.4
- Minima theme 2.5.2
- jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- Ruby 3.4+ compatibility gems (csv, logger, base64, bigdecimal, ostruct)

### 3. Run Development Server

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

#### Run with Live Reload

```bash
bundle exec jekyll serve --livereload
```

#### Run on Different Port

```bash
bundle exec jekyll serve --port 4001
```

#### Run with Production Settings

```bash
JEKYLL_ENV=production bundle exec jekyll serve
```

This enables:
- Google Analytics
- Disqus comments
- Production-optimized assets

---

## Building for Production

### Build Static Site

```bash
bundle exec jekyll build
```

The static site will be generated in the `_site/` directory.

### Clean Build

```bash
bundle exec jekyll clean
bundle exec jekyll build
```

---

## Project Structure

```
.
├── _config.yml          # Site configuration
├── _includes/           # Reusable components
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   ├── google-analytics.html
│   ├── social.html
│   ├── disqus_comments.html
│   └── reading-time.html
├── _layouts/            # Page templates
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
├── _pages/              # Static pages
│   ├── about.md
│   ├── blog.md
│   └── resume.md
├── _posts/              # Blog posts (YYYY-MM-DD-title.md)
│   └── 2024-*.md
├── assets/              # Static assets
│   ├── main.scss       # Theme entry point
│   ├── css/            # Custom stylesheets
│   │   └── landing.css
│   ├── js/             # Custom JavaScript
│   │   └── landing.js
│   └── images/         # Images and media
├── index.md            # Homepage
├── 404.html            # Error page
├── robots.txt          # SEO crawler instructions
├── site.webmanifest    # PWA manifest
├── Gemfile             # Ruby dependencies
└── README.md           # This file
```

---

## Content Management

### Adding Blog Posts

Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS +0900
categories: category1 category2 category3
comments: true
---

Your content here...
```

**Categories available:**
- deep-learning
- computer-vision
- machine-learning
- neural-networks
- facial-recognition
- semantic-segmentation
- mathematics
- linear-algebra

### Adding Pages

Create markdown files in `_pages/` directory:

```markdown
---
layout: page
title: "Page Title"
permalink: /page-url/
---

Your content here...
```

### Adding Custom CSS/JS to a Page

```markdown
---
layout: page
title: "Page Title"
permalink: /page-url/
custom_css: filename
custom_js: filename
---
```

Place `filename.css` in `assets/css/` and `filename.js` in `assets/js/`

---

## Customization

### Site Settings

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social media links
- Google Analytics ID
- Disqus shortname
- Navigation menu

### Styles

Modify `assets/main.scss` to override theme defaults:

```scss
@import "minima";

// Your custom styles here
.custom-class {
  color: blue;
}
```

### Layouts

Customize templates in `_layouts/` directory to change page structure.

### Components

Edit includes in `_includes/` directory to modify reusable components.

---

## Troubleshooting

### Port Already in Use

```bash
# Kill existing Jekyll processes
pkill -f jekyll

# Or use a different port
bundle exec jekyll serve --port 4001
```

### Changes Not Showing

```bash
# Clean cache and rebuild
rm -rf _site .jekyll-cache .sass-cache
bundle exec jekyll build
bundle exec jekyll serve
```

**Important:** Changes to `_config.yml` require server restart!

### Bundle Install Fails

```bash
# Update bundler
gem install bundler

# Update all gems
bundle update
```

### Ruby Version Issues

Ensure you're using Ruby 3.0+:

```bash
ruby --version
```

---

## Deployment

### GitHub Pages (Automatic)

The site automatically deploys to GitHub Pages when changes are pushed to the main branch via GitHub Actions.

### Manual Deployment

```bash
# Build the site
JEKYLL_ENV=production bundle exec jekyll build

# The _site/ directory contains the static site
# Upload to your hosting provider
```

---

## Contributing

If you find issues or have suggestions:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

- **Email:** yakhyo9696@gmail.com
- **LinkedIn:** [y-valikhujaev](https://linkedin.com/in/y-valikhujaev)
- **GitHub:** [@yakhyo](https://github.com/yakhyo)
- **Google Scholar:** [Profile](https://scholar.google.com/citations?user=I66QbJIAAAAJ)

---

Built with Jekyll and hosted on GitHub Pages
