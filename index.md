---
layout: landing
permalink: /
description: "Yakhyokhuja Valikhujaev is an AI/ML Software Engineer working across Computer Vision, LLMs, and multimodal AI."
custom_css: landing
custom_js: landing
image:
  path: /assets/images/landing-page-preview.png
  width: 1200
  height: 630
  alt: Yakhyokhuja Valikhujaev personal website landing page
---

<div class="landing-page">
    <div class="profile">
        <img src="{{ site.baseurl }}/assets/images/avatar.webp"
             alt="Yakhyokhuja Valikhujaev — AI/ML Software Engineer"
             class="profile-photo"
             width="150" height="150"
             fetchpriority="high">
        <div class="profile-info">
            <div class="whoami" aria-hidden="true"><span class="whoami-prompt">$</span> whoami</div>
            <h1 class="name">Yakhyokhuja Valikhujaev</h1>
            <div class="title"
                 data-titles='{{ site.landing_titles | jsonify }}'
                 aria-live="off"
                 aria-label="AI/ML Software Engineer">{{ site.landing_titles | first }}</div>
        </div>
        <div class="social-links">
            <a href="{{ site.profiles.scholar }}" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar Profile" title="Google Scholar">{% include icon.html name="google-scholar" %}</a>
            <a href="{{ site.profiles.github }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" title="GitHub">{% include icon.html name="github" %}</a>
            <a href="{{ site.profiles.linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" title="LinkedIn">{% include icon.html name="linkedin" %}</a>
            <a href="{{ site.profiles.youtube }}" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" title="YouTube">{% include icon.html name="youtube" %}</a>
            <a href="{{ site.profiles.telegram }}" target="_blank" rel="noopener noreferrer" aria-label="Telegram Contact" title="Telegram">{% include icon.html name="telegram" %}</a>
        </div>
    </div>
    <div class="description">
        {{ site.description }}
    </div>
    <div class="buttons">
        <a href="{{ site.baseurl }}/blog" class="read-blog">Read the Blog{% include icon.html name="arrow-right" %}</a>
        <a href="{{ site.baseurl }}/about" class="about-me">About Me</a>
    </div>

</div>

<a href="#experience" class="scroll-down-btn" aria-label="Scroll to experience">
    <span class="scroll-dot"></span>
</a>

<div class="timeline-section" id="experience">
    <h2 class="timeline-section-title">Experience</h2>
    {% include timeline.html %}
</div>
