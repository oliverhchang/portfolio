// navbar.js

// 1. SMART PATH LOGIC
const inProjectsFolder = window.location.pathname.includes("/Projects/");
const p = inProjectsFolder ? "../" : "";

// 2. Define the Navbar HTML (Added Progress Bar Container at the top)
const navHTML = `
  <div class="progress-container">
    <div class="progress-bar" id="myBar"></div>
  </div>

  <header>
    <nav>
      <div>
        <ul><li><a href="${p}index.html">Oliver Chang</a></li></ul>
      </div>
      <ul>
        <li><a href="${p}about.html">About Me</a></li>
        <li><a href="${p}projects.html">Projects</a></li>
        <li><a href="${p}resume.html">Resume</a></li>
      </ul>
      
      <div class="social-icons">
        <a href="https://www.linkedin.com/in/oliver-h-chang/" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/oliverhchang" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://instagram.com/oliverhchang" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="mailto:oli.chang664@gmail.com" target="_blank"><i class="fas fa-envelope"></i></a>
      </div>
    </nav>
  </header>

  <div class="theme-toggle-fab" id="theme-toggle-btn" title="Toggle Dark Mode">
    <i class="fas fa-moon" id="theme-icon"></i>
  </div>
`;

// 3. Inject Navbar
document.body.insertAdjacentHTML('afterbegin', navHTML);

// 4. HIGHLIGHT ACTIVE PAGE
const currentFile = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    const cleanHref = link.getAttribute('href').replace("../", "");
    if (
        cleanHref === currentFile ||
        (currentFile === '' && cleanHref === 'index.html') ||
        (inProjectsFolder && cleanHref === 'projects.html')
    ) {
        link.classList.add('active');
    }
});

// 5. PROGRESS BAR LOGIC (New)
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Avoid dividing by zero if page is short
    let scrolled = 0;
    if (height > 0) {
        scrolled = (winScroll / height) * 100;
    }

    document.getElementById("myBar").style.width = scrolled + "%";
});

// 6. DARK MODE LOGIC
const toggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;
const bodyElement = document.body;

function setTheme(isDark) {
    if (isDark) {
        htmlElement.classList.add('dark-mode');
        bodyElement.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('engineering-theme', 'dark');
    } else {
        htmlElement.classList.remove('dark-mode');
        bodyElement.classList.remove('dark-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('engineering-theme', 'light');
    }
}

// Initialization Logic
const savedTheme = localStorage.getItem('engineering-theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (htmlElement.classList.contains('dark-mode') || savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = htmlElement.classList.contains('dark-mode');
        setTheme(!isCurrentlyDark);
    });
}