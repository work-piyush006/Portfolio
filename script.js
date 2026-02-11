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

  // ================= AUTO ACTIVE NAV (EDGE CASE FIXED) =================
  let currentPage = window.location.pathname.split("/").pop();

  // If homepage URL is just "/", treat as index.html
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  const navItems = document.querySelectorAll("#nav-links a");

  navItems.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ================= INTERSECTION OBSERVER (SCROLL REVEAL) =================
  const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .card, .page-section h1, .page-section h2"
  );

  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Animate once only
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    observer.observe(el);
  });

  // ================= CERTIFICATE AUTO SLIDER =================
  const certificates = [
    "certificate(1).jpg",
    "certificate(2).jpg",
    "certificate(3).jpg"
  ];

  let currentIndex = 0;
  const certImage = document.getElementById("certificateImage");

  if (certImage) {

    const preloadImages = () => {
      certificates.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadImages();

    setInterval(() => {
      currentIndex = (currentIndex + 1) % certificates.length;

      certImage.style.transition = "opacity 0.4s ease";
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

  // ESC key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });

});
