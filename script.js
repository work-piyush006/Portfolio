document.addEventListener("DOMContentLoaded", () => {

  // ===== PAGE FADE-IN =====
  document.body.classList.add("page-loaded");

  // ===== SMOOTH PAGE TRANSITION (FADE OUT BEFORE NAVIGATION) =====
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");

    if (href && !href.startsWith("#") && !href.startsWith("http") && !link.hasAttribute("download")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.body.classList.remove("page-loaded");

        setTimeout(() => {
          window.location.href = href;
        }, 300);
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
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

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
  const certificates = [
    "certificate(1).jpg",
    "certificate(2).jpg",
    "certificate(3).jpg"
  ];

  const certImage = document.getElementById("certificateImage");
  let currentIndex = 0;

  if (certImage) {

    certificates.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % certificates.length;

      certImage.style.opacity = 0;

      setTimeout(() => {
        certImage.src = certificates[currentIndex];
        certImage.style.opacity = 1;
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

  if (closeModal && modal) {
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
    if (e.key === "Escape" && modal && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });

  // ===== PREMIUM COUNTER =====
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const duration = 1200;
        const increment = target / (duration / 16);

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            counter.innerText = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            if (target === 40) {
              counter.innerText = target + "%";
            } else {
              counter.innerText = target + "+";
            }
          }
        };

        updateCounter();
        observer.unobserve(counter);
      }

    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));

});
