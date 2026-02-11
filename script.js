const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Optional: Close menu when link clicked (mobile UX better) */
const links = navLinks.querySelectorAll("a");

links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
