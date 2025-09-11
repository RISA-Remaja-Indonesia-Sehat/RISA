import { renderNavbar, initNavbarToggle } from "./components/navbar.js";
import { renderFooter } from "./components/footer.js";
import { renderCard } from "./components/card.js";
import { initAnimations } from "./animations.js";
import { initHivQuiz } from "./hiv-quiz.js";
import { initTooltip } from "./tooltip.js";
import { initComments } from "./comments.js";

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("navbar").innerHTML = renderNavbar(), initNavbarToggle();
  document.getElementById("footer").innerHTML = renderFooter();
  
  
  // Only init animations on home page
  if (document.getElementById('hero')) {
    initAnimations();
  }
  
  // Only init animations on article page
  if (document.getElementById('article')) {
    initHivQuiz();
    initTooltip();
    initComments();
  }

  const cardsContainer = document.getElementById("cards");
  if (cardsContainer) {
    cardsContainer.innerHTML += renderCard("Quiz Edukasi", "Uji pengetahuanmu tentang kesehatan reproduksi.");
    cardsContainer.innerHTML += renderCard("Artikel Kesehatan", "Baca artikel terpercaya untuk generasi muda.");
    cardsContainer.innerHTML += renderCard("Mini Game", "Belajar sambil bermain game interaktif.");
  }
});
