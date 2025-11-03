function checkWindowHeight() {
    var footer = document.querySelector('footer');
    if (window.innerHeight > 900) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
}

// Run the function on window load and resize
window.onload = checkWindowHeight;
window.onresize = checkWindowHeight;

