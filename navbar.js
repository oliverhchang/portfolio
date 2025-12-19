// navbar.js

// 1. Define the HTML for the navigation bar
const navHTML = `
  <header>
    <nav>
      <div>
        <ul><li><a href="index.html">Oliver Chang</a></li></ul>
      </div>
      <ul>
        <li><a href="about.html">About Me</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="resume.html">Resume</a></li>
      </ul>
      <div class="social-icons">
        <a href="https://www.linkedin.com/in/oliver-h-chang/" target="_blank"><i class="fab fa-linkedin"></i></a>
        <a href="https://github.com/oliverhchang" target="_blank"><i class="fab fa-github"></i></a>
        <a href="https://www.instagram.com/myportableworkshop/" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="mailto:oliverhchang.mech@gmail.com" target="_blank"><i class="fas fa-envelope"></i></a>
      </div>
    </nav>
  </header>
`;

// 2. Inject the HTML at the very top of the Body
document.body.insertAdjacentHTML('afterbegin', navHTML);

// 3. Highlight the "Active" page automatically
const currentFile = window.location.pathname.split("/").pop(); // Gets 'about.html'
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    // Get the href of the link (e.g. 'about.html')
    const linkPath = link.getAttribute('href');

    // If the filename matches, add the class
    if (linkPath === currentFile || (currentFile === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});