import { renderNavbar, initNavbarToggle } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";
import { renderCard } from "./components/card.js";
import { initAnimations } from "./animations.js";

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("navbar").innerHTML = renderNavbar(), initNavbarToggle();
  document.getElementById("footer").innerHTML = renderFooter();
  
  initAnimations();

  const cardsContainer = document.getElementById("cards");
  if (cardsContainer) {
    cardsContainer.innerHTML += renderCard("Quiz Edukasi", "Uji pengetahuanmu tentang kesehatan reproduksi.");
    cardsContainer.innerHTML += renderCard("Artikel Kesehatan", "Baca artikel terpercaya untuk generasi muda.");
    cardsContainer.innerHTML += renderCard("Mini Game", "Belajar sambil bermain game interaktif.");
  }
});
