---
layout: page
permalink: /
custom_css: landing
custom_js: landing
description: "Yakhyokhuja Valikhujaev — ML Software Engineer. Notes on LLMs, computer vision, and MLOps."
---

<div class="landing-page">
    <img src="{{ site.baseurl }}/assets/images/avatar.webp"
         alt="Yakhyo Valikhujaev — ML Software Engineer"
         class="profile-photo"
         width="150" height="150"
         fetchpriority="high">
    <div class="profile-info">
        <div class="name">Yakhyo Valikhujaev</div>
        <div class="title"
             data-titles='{{ site.landing_titles | jsonify }}'
             aria-live="off"
             aria-label="ML Software Engineer">{{ site.landing_titles | first }}</div>
        <div class="social-links">
            <a href="https://scholar.google.com/citations?user=I66QbJIAAAAJ" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar Profile"><i class="fab fa-google-scholar" aria-hidden="true"></i></a>
            <a href="https://github.com/yakhyo" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile"><i class="fab fa-github" aria-hidden="true"></i></a>
            <a href="https://linkedin.com/in/y-valikhujaev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile"><i class="fab fa-linkedin" aria-hidden="true"></i></a>
            <a href="https://youtube.com/codeuz" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel"><i class="fab fa-youtube" aria-hidden="true"></i></a>
            <a href="https://t.me/valikhujaev" target="_blank" rel="noopener noreferrer" aria-label="Telegram Contact"><i class="fab fa-telegram" aria-hidden="true"></i></a>
        </div>
    </div>
    <div class="description">
        Exploring Life Through the Lens of a Computer Scientist: AI, Tech, and Beyond.
    </div>
    <div class="buttons">
        <a href="{{ site.baseurl }}/blog" class="read-blog">Read Blog</a>
        <a href="{{ site.baseurl }}/about" class="about-me">About Me</a>
    </div>

    <div class="scroll-indicator" aria-hidden="true">
        <span>Scroll to explore</span>
        <div class="scroll-arrow">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>

</div>

<div class="timeline-section">
    <h2 class="timeline-section-title">Experience</h2>
    {% include timeline.html %}
</div>
