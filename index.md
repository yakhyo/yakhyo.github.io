---
layout: page
permalink: /
---

<script>
    function checkWindowHeight() {
        var footer = document.querySelector('footer');
        if (window.innerHeight > 900) { // Adjust the height threshold as needed
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    }

    // Run the function on window load and resize
    window.onload = checkWindowHeight;
    window.onresize = checkWindowHeight;
</script>

<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

    @keyframes bottomToTop {
        from {
            transform: translateY(5%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .landing-page {
        text-align: left;
        padding: 50px 0;
        margin-left: 0;
        animation: bottomToTop 1s ease-out;
    }
    .profile-photo {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        vertical-align: middle;
        animation: bottomToTop 1s ease-out;
    }
    .profile-info {
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
        animation: bottomToTop 1s ease-out;
    }
    .name {
        font-size: 2.5em;
        font-weight: bold;
        animation: bottomToTop 1s ease-out;
    }
    .title {
        font-size: 1.5em;
        color: gray;
        animation: bottomToTop 1s ease-out;
    }
    .social-links {
        margin-top: 10px;
        animation: bottomToTop 1s ease-out;
    }
    .social-links a {
        margin: 0 10px 0 0;
        font-size: 1.5em;
        color: black;
    }
    .description {
        margin: 20px 0;
        font-size: 1.2em;
        color: gray;
        animation: bottomToTop 1s ease-out;
    }
    .buttons {
        animation: bottomToTop 1s ease-out;
    }
    .buttons a {
        display: inline-block;
        margin: 10px 10px 10px 0;
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        /* color: initial; */
        font-size: 1.2em;
        font-weight: 600;
        
    }
    .read-blog {
        background-color: #1e90ff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .15);
        color: white !important;
    }
    .about-me {
        background: 0 0;
        color: #1e90ff !important;
        border: 1px solid #1e90ff;
    }
    .page-title {
        display: none;
    }
    footer {
        display: none;
    }
</style>

<div class="landing-page">
    <img src="{{ site.baseurl }}/assets/images/logo.webp" alt="Your Photo" class="profile-photo">
    <div class="profile-info">
        <div class="name">Yakhyo Valikhujaev</div>
        <div class="title">ML Software Engineer</div>
        <div class="social-links">
            <a href="https://youtube.com/codeuz" target="_blank"><i class="fab fa-youtube"></i></a>
            <a href="https://github.com/yakhyo" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://linkedin.com//in/y-valikhujaev" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://t.me/valikhujaev" target="_blank"><i class="fab fa-telegram"></i></a>
        </div>
    </div>
    <div class="description">
        Exploring Life Through the Lens of a Computer Scientist: AI, Tech, and Beyond.
    </div>
    <div class="buttons">
        <a href="{{ site.baseurl }}/blog" class="read-blog">Read Blog</a>
        <a href="{{ site.baseurl }}/about" class="about-me">About Me</a>
    </div>
</div>
