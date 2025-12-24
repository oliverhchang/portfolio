// script.js

// 1. TYPING EFFECT CONFIGURATION
const textElement = document.querySelector(".role-sec-text");
const words = ["Mechanical Designer", "MechE Student", "FRC Alumni", "CAD Addict"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        // Deleting characters
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing characters
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Dynamic Speed: Faster when deleting, slower when typing
    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        // Word is complete. Pause before deleting.
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Word is fully deleted. Move to next word.
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing when page loads
document.addEventListener("DOMContentLoaded", typeEffect);


// 2. SCROLL REDIRECT LOGIC
let redirected = false;

window.addEventListener("scroll", () => {
    const trigger = document.getElementById("scroll-detect");

    // Safety check: ensure element exists
    if (!trigger) return;

    const triggerPos = trigger.offsetTop;
    const scrollBottom = window.scrollY + window.innerHeight;

    if (!redirected && scrollBottom >= triggerPos) {
        redirected = true;
        document.body.style.transition = "opacity 0.6s ease";
        document.body.style.opacity = 0;
        setTimeout(() => {
            window.location.href = "projects.html";
        }, 600);
    }
});

document.addEventListener('mousemove', (e) => {
    const gridContainer = document.querySelector('.grid-background-container');

    if (gridContainer) {
        // Update CSS variables with mouse position
        gridContainer.style.setProperty('--mouse-x', `${e.clientX}px`);
        gridContainer.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
});