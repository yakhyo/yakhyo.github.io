// Typing animation
const titles = ["ML Software Engineer", "MLOps Engineer"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const titleElement = document.querySelector('.title');
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        // Remove characters
        titleElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Add characters
        titleElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeTitle, typingSpeed);
}

// Run the function on window load
window.onload = function() {
    typeTitle();
    // Hide footer initially
    const footer = document.querySelector('footer');
    if (footer) {
        footer.style.display = 'none';
    }
};


// Timeline scroll reveal and footer visibility
function revealTimelineOnScroll() {
    const timelineSection = document.querySelector('.timeline-section');
    const footer = document.querySelector('footer');
    if (!timelineSection) return;

    const sectionTop = timelineSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Show timeline when it's 200px from viewport, hide when scrolling back up
    if (sectionTop < windowHeight - 200) {
        timelineSection.classList.add('visible');
        // Show footer when timeline is visible
        if (footer) {
            footer.style.display = 'block';
        }
    } else {
        timelineSection.classList.remove('visible');
        // Hide footer when timeline is not visible
        if (footer) {
            footer.style.display = 'none';
        }
    }
}

// Add scroll listener
window.addEventListener('scroll', revealTimelineOnScroll);
// Check on load in case timeline is already in view
window.addEventListener('load', revealTimelineOnScroll);
