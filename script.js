// Siam Islam portfolio interactions
// IMPORTANT: replace this with an email address you want visitors to contact.
const PORTFOLIO_EMAIL = "YOUR_EMAIL@example.com";

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Theme: remember the visitor's choice in this browser.
function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.textContent = isDark ? "☼" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#090d1c" : "#f5f7ff");
}

const savedTheme = localStorage.getItem("siam-portfolio-theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("siam-portfolio-theme", nextTheme);
});

// Mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Reveal sections as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Animate skill bars once the skills section is visible.
const skillSection = document.getElementById("skills");
if ("IntersectionObserver" in window && skillSection) {
  const skillObserver = new IntersectionObserver((entries, observer) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      document.querySelectorAll(".skill-track span").forEach((bar) => {
        bar.style.width = `${bar.dataset.level}%`;
      });
      observer.disconnect();
    }
  }, { threshold: 0.25 });
  skillObserver.observe(skillSection);
} else {
  document.querySelectorAll(".skill-track span").forEach((bar) => {
    bar.style.width = `${bar.dataset.level}%`;
  });
}

// Contact form opens the visitor's email app; it does not send/store data itself.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const emailDisplay = document.getElementById("emailDisplay");

emailDisplay.textContent = PORTFOLIO_EMAIL;
emailDisplay.href = `mailto:${PORTFOLIO_EMAIL}`;

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (PORTFOLIO_EMAIL === "YOUR_EMAIL@example.com") {
    formStatus.textContent = "Website owner: first replace YOUR_EMAIL@example.com in script.js with your real email address.";
    return;
  }

  const formData = new FormData(contactForm);
  const senderName = String(formData.get("name")).trim();
  const senderEmail = String(formData.get("email")).trim();
  const message = String(formData.get("message")).trim();

  const subject = encodeURIComponent(`Portfolio message from ${senderName}`);
  const body = encodeURIComponent(
    `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`
  );

  formStatus.textContent = "Opening your email app. Review the message and press Send there.";
  window.location.href = `mailto:${PORTFOLIO_EMAIL}?subject=${subject}&body=${body}`;
});

// Current year in the footer.
document.getElementById("year").textContent = new Date().getFullYear();
