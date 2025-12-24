// 5. DARK MODE LOGIC (System Default Aware)
const toggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;
const bodyElement = document.body;

function setTheme(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark-mode');
        bodyElement.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Icon becomes Sun
        localStorage.setItem('engineering-theme', 'dark'); // Save preference
    } else {
        htmlElement.classList.remove('dark-mode');
        bodyElement.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon'); // Icon becomes Moon
        localStorage.setItem('engineering-theme', 'light'); // Save preference
    }
}

// INITIALIZATION LOGIC
const savedTheme = localStorage.getItem('engineering-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// If we are already dark (from the anti-flash script) OR local storage says dark OR system says dark (and no storage)
if (htmlElement.classList.contains('dark-mode') || savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    // We don't call setTheme(true) here because it writes to localStorage immediately.
    // Instead, just ensure the icon is correct visually:
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Click Event Listener
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = htmlElement.classList.contains('dark-mode');
        setTheme(!isCurrentlyDark);
    });
}