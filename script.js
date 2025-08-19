(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("toggleBtn");
  const lightBtn = document.getElementById("lightBtn");
  const darkBtn = document.getElementById("darkBtn");
  const currentLabel = document.getElementById("currentLabel");
  const btnLabel = document.getElementById("btnLabel");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      currentLabel.textContent = "Night";
      btnLabel.textContent = "Switch to Light";
    } else {
      root.removeAttribute("data-theme");
      currentLabel.textContent = "Light";
      btnLabel.textContent = "Switch to Night";
    }
  }

  function saveTheme(theme) {
    localStorage.setItem("site-theme", theme);
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem("site-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Initialize
  applyTheme(getPreferredTheme());

  // Handlers
  toggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(current);
    saveTheme(current);
  });

  lightBtn.addEventListener("click", () => {
    applyTheme("light");
    saveTheme("light");
  });

  darkBtn.addEventListener("click", () => {
    applyTheme("dark");
    saveTheme("dark");
  });

  // Keyboard shortcut: T
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key.toLowerCase() === "t") toggleBtn.click();
  });
})();
