document.addEventListener("DOMContentLoaded", () => {

  // ===== PAGE FADE-IN =====
  document.body.classList.add("page-loaded");


  // ===== DARK MODE SYSTEM =====
  const themeToggle = document.getElementById("theme-toggle");

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      }
    });
  }


  // ===== SAFE INTERNAL PAGE TRANSITION =====
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");

    if (
      href &&
      href.endsWith(".html") &&
      !link.hasAttribute("target") &&
      !link.hasAttribute("download")
    ) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.remove("page-loaded");

        setTimeout(() => {
          window.location.href = href;
        }, 250);
      });
    }
  });


  // ===== HAMBURGER =====
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }


  // ===== AUTO ACTIVE NAV =====
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("#nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });


  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .card, .page-section h1, .page-section h2, .stat-card"
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


  // ===== CERTIFICATE SLIDER =====
  const certImage = document.getElementById("certificateImage");
  const certificates = [
    "certificate(1).jpg",
    "certificate(2).jpg",
    "certificate(3).jpg"
  ];

  if (certImage) {

    certificates.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    let index = 0;

    setInterval(() => {
      index = (index + 1) % certificates.length;

      certImage.style.opacity = "0";

      setTimeout(() => {
        certImage.src = certificates[index];
        certImage.style.opacity = "1";
      }, 400);

    }, 3000);
  }


  // ===== MODAL =====
  const modal = document.getElementById("certificateModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");

  if (certImage && modal && modalImage) {
    certImage.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImage.src = certImage.src;
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.style.display === "flex") {
      modal.style.display = "none";
    }
  });


  // ===== COUNTER =====
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const duration = 1200;
        const step = target / (duration / 16);

        const animate = () => {
          current += step;

          if (current < target) {
            counter.innerText = Math.floor(current);
            requestAnimationFrame(animate);
          } else {
            counter.innerText = target === 40 ? target + "%" : target + "+";
          }
        };

        animate();
        observer.unobserve(counter);
      }

    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

});
