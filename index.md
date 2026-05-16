---
layout: landing
permalink: /
custom_css: landing
custom_js: landing
---

<div class="landing-page">
    <div class="profile">
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
        </div>
        <div class="social-links">
            <a href="{{ site.profiles.scholar }}" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar Profile">{% include icon.html name="google-scholar" %}</a>
            <a href="{{ site.profiles.github }}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">{% include icon.html name="github" %}</a>
            <a href="{{ site.profiles.linkedin }}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">{% include icon.html name="linkedin" %}</a>
            <a href="{{ site.profiles.youtube }}" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel">{% include icon.html name="youtube" %}</a>
            <a href="{{ site.profiles.telegram }}" target="_blank" rel="noopener noreferrer" aria-label="Telegram Contact">{% include icon.html name="telegram" %}</a>
        </div>
    </div>
    <div class="description">
        {{ site.description }}
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
