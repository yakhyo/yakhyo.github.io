function checkWindowHeight() {
    var footer = document.querySelector('footer');
    if (window.innerHeight > 900) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
}

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

// Run the function on window load and resize
window.onload = function() {
    checkWindowHeight();
    typeTitle();
};
window.onresize = checkWindowHeight;

