const titles = ["ML Software Engineer", "MLOps Engineer"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const titleElement = document.querySelector('.title');
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeTitle, typingSpeed);
}

window.onload = function() {
    typeTitle();
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'none';
    }
};

let timelineRevealed = false;

function revealTimelineOnScroll() {
    const timelineSection = document.querySelector('.timeline-section');
    const footer = document.querySelector('footer');
    if (!timelineSection) return;

    const sectionTop = timelineSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 200) {
        if (!timelineRevealed) {
            timelineRevealed = true;
            timelineSection.classList.add('visible');

            const entries = timelineSection.querySelectorAll('.timeline-entry');
            entries.forEach((entry, index) => {
                setTimeout(() => entry.classList.add('visible'), 150 + index * 120);
            });
        }
        if (footer) footer.style.display = 'block';
    } else {
        if (timelineRevealed) {
            timelineRevealed = false;
            timelineSection.classList.remove('visible');
            timelineSection.querySelectorAll('.timeline-entry').forEach(entry => {
                entry.classList.remove('visible');
            });
        }
        if (footer) footer.style.display = 'none';
    }
}

window.addEventListener('scroll', revealTimelineOnScroll);
window.addEventListener('load', revealTimelineOnScroll);
