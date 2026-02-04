const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const cartButton = document.querySelector(".add-to-cart");
if (cartButton) {
  cartButton.addEventListener("click", () => {
    alert("Added to cart! (Demo only)");
  });
}

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("focusin", () => {
    card.style.boxShadow = "0 10px 24px rgba(47, 59, 47, 0.2)";
  });
  card.addEventListener("focusout", () => {
    card.style.boxShadow = "";
  });
});
