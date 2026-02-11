document.addEventListener("DOMContentLoaded", () => {

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

    // Preload images
    certificates.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    setInterval(() => {
      currentIndex = (currentIndex + 1) % certificates.length;

      certImage.style.transition = "opacity 0.4s ease";
      certImage.style.opacity = 0;

      setTimeout(() => {
        certImage.src = certificates[currentIndex];
        certImage.style.opacity = 1;
      }, 400);

    }, 3000); // slightly slower = more premium feel
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

  // ===== PREMIUM COUNTER ANIMATION =====
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const duration = 1200; // animation time
        const stepTime = 16;
        const increment = target / (duration / stepTime);

        const updateCounter = () => {
          current += increment;

          if (current < target) {
            counter.innerText = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            // Add suffix based on value
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
