// Hamburger
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

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
    }, 300);

  }, 2000); // 2 seconds
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
