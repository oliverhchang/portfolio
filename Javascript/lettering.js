// lettering.js

// 1. TYPING EFFECT CONFIGURATION
const textElement = document.querySelector(".role-sec-text");
const words = ["MechE Student", "Chassis Engineer", "Lead Research Engineer", "Hybrid Athlete", "CAD Addict"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!textElement) return; // Safety check
    const currentWord = words[wordIndex];

    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener("DOMContentLoaded", typeEffect);


// 2. REDIRECT LOGIC (Scroll & Button Clicks)
let redirected = false;

function fadeOutAndRedirect(url) {
    if (redirected) return;
    redirected = true;

    document.body.style.transition = "opacity 0.6s ease";
    document.body.style.opacity = 0;

    setTimeout(() => {
        window.location.href = url;
    }, 600);
}

// Trigger: Scrolling down
window.addEventListener("scroll", () => {
    const trigger = document.getElementById("scroll-detect");
    if (!trigger) return;

    const triggerPos = trigger.offsetTop;
    const scrollBottom = window.scrollY + window.innerHeight;

    if (scrollBottom >= triggerPos) {
        fadeOutAndRedirect("projects.html");
    }
});

// Trigger: Clicking the Index Buttons
const indexLinks = document.querySelectorAll('.index-buttons a');
indexLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = link.getAttribute('href');
        fadeOutAndRedirect(targetUrl);
    });
});

// 3. GRID BACKGROUND TRACKING
document.addEventListener('mousemove', (e) => {
    const gridContainer = document.querySelector('.grid-background-container');
    if (gridContainer) {
        gridContainer.style.setProperty('--mouse-x', `${e.clientX}px`);
        gridContainer.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
});

// 4. DOODLE REVEAL
document.addEventListener('mousemove', (e) => {
    const doodles = document.querySelectorAll('.hidden-doodle');
    const revealRadius = 250;

    doodles.forEach(doodle => {
        const rect = doodle.getBoundingClientRect();
        const doodleX = rect.left + rect.width / 2;
        const doodleY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - doodleX, e.clientY - doodleY);

        if (dist < revealRadius) {
            const opacity = 1 - (dist / revealRadius);
            doodle.style.opacity = Math.max(0, opacity);
        } else {
            doodle.style.opacity = 0;
        }
    });
});

// Magnetic Buttons
const magneticButtons = document.querySelectorAll('.index-buttons button');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        // Calculate distance from center of button
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Move the button slightly towards the cursor
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.08)`;
    });

    btn.addEventListener('mouseleave', () => {
        // Snap back to center when mouse leaves
        btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
});