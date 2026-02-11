// ================= SAFE DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  // ================= HAMBURGER =================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ================= AUTO ACTIVE NAV =================
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  const navItems = document.querySelectorAll("#nav-links a");

  navItems.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ================= SCROLL REVEAL (INTERSECTION OBSERVER) =================
  const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .card, .page-section h1, .page-section h2, .stat-card"
  );

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));

  // ================= CERTIFICATE AUTO SLIDER =================
  const certificates = [
    "certificate(1).jpg",
    "certificate(2).jpg",
    "certificate(3).jpg"
  ];

  let currentIndex = 0;
  const certImage = document.getElementById("certificateImage");

  if (certImage) {

    // Preload images
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

    }, 2500);
  }

  // ================= MODAL PREVIEW =================
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

  // ================= COUNTER ANIMATION (RUN ONCE) =================
  const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const increment = target / 80;

          const updateCounter = () => {
            const current = +counter.innerText;

            if (current < target) {
              counter.innerText = Math.ceil(current + increment);
              setTimeout(updateCounter, 20);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
          observer.unobserve(counter); // run once only
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

});
