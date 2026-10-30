
const themeToggle = document.getElementById("themeToggle");

// Apply a theme and update the button.
function setTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;

  themeToggle.textContent = isDark
    ? "☀️ Light mode"
    : "🌙 Dark mode";

  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );

  try {
    localStorage.setItem("siam-theme", theme);
  } catch (error) {
    // The website still works if storage is unavailable.
  }
}

// Load the saved theme.
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("siam-theme");
} catch (error) {
  // Use light mode if storage is unavailable.
}

setTheme(savedTheme === "dark" ? "dark" : "light");

// Toggle between light and dark modes.
themeToggle.addEventListener("click", function () {
  const currentTheme = document.documentElement.dataset.theme;
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Keep the copyright year current.
document.getElementById("year").textContent =
  new Date().getFullYear();
