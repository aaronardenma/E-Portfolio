const body = document.body;
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const navLinks = document.querySelectorAll("#site-nav a");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setTheme(theme) {
  const isDark = theme === "dark";
  body.classList.toggle("dark-theme", isDark);
  themeIcon.textContent = isDark ? "☾" : "☼";
  themeButton.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#0f1420" : "#f6f7fb");
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

themeButton.addEventListener("click", () => {
  const nextTheme = body.classList.contains("dark-theme") ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

function closeMenu() {
  body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 16);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px" });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

if (motionAllowed) {
  const hero = document.querySelector(".hero");
  const shapes = document.querySelectorAll(".hero-shapes img");

  hero.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 22;
    const y = (event.clientY / window.innerHeight - 0.5) * 22;

    shapes.forEach((shape) => {
      const speed = Number(shape.dataset.speed);
      shape.style.translate = `${x * speed}px ${y * speed}px`;
    });
  });
}

document.querySelector("#year").textContent = new Date().getFullYear();
