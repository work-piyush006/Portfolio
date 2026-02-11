// ================= HAMBURGER =================
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ================= SCROLL REVEAL =================

const revealElements = document.querySelectorAll(
  ".hero-content, .hero-image, .card, .page-section h1, .page-section h2"
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ================= CERTIFICATE AUTO SLIDER =================

const certificates = [
  "certificate(1).jpg",
  "certificate(2).jpg",
  "certificate(3).jpg"
];

let currentIndex = 0;
const certImage = document.getElementById("certificateImage");

if (certImage) {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % certificates.length;
    certImage.style.opacity = 0;

    setTimeout(() => {
      certImage.src = certificates[currentIndex];
      certImage.style.opacity = 1;
    }, 400);

  }, 2000);
}

// ================= MODAL PREVIEW =================

const modal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

if (certImage) {
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
