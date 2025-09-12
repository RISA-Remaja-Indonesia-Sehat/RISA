import { renderFooter } from "./components/footer.js";
import { renderNavbar, initNavbarToggle } from "./components/navbar.js";

(document.getElementById("navbar").innerHTML = renderNavbar()),
  initNavbarToggle();
document.getElementById("footer").innerHTML = renderFooter();

// Register ScrollTrigger plugin

gsap.registerPlugin(ScrollTrigger);

// Confetti burst function (menggunakan canvas-confetti)
function confettiBurst() {
  confetti({
    particleCount: 500,
    spread: 90,
    origin: { y: 0.6 },
  });
}






// Hero section animation: fade + slide on scroll into viewport
gsap.utils.toArray("#hero .gsap-fade-slide").forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
});
// Games section: stagger scale-in for each game image
gsap.fromTo(
  "#games .gsap-scale-in",
  { opacity: 0, scale: 0.8 },
  {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#games",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  }
);
// Achievement trophy: rotate + scale-in on scroll, no delay
gsap.fromTo(
  "#trophy",
  { opacity: 0, scale: 0, rotation: 0 },
  {
    opacity: 1,
    scale: 1,
    rotation: 360,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#trophy",
      start: "top 80%",
      toggleActions: "play none none none",
      onEnter: () => {
        confettiBurst();
      },
    },
  }
);
// Leaderboard rows: fadeIn + slideUp stagger
gsap.fromTo(
  "#leaderboard tbody tr.gsap-fade-slide-up",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: "#leaderboard",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  }
);

 const achievement = {
      id: 7,
      points: 1200
    };

    // Generate Achievement Image
    function generateAchievement() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = 800;
      canvas.height = 400;

      // Background Gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#6EE7B7');
      gradient.addColorStop(1, '#3B82F6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Title
      ctx.fillStyle = 'white';
      ctx.font = 'bold 34px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('🎉 Aku Baru Dapat Achievement Point!', canvas.width / 2, 80);

      // Medal Circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 180, 80, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700'; // Gold
      ctx.fill();
      ctx.strokeStyle = '#F59E0B'; // Orange border
      ctx.lineWidth = 8;
      ctx.stroke();
      ctx.closePath();

      // Points Text
      ctx.fillStyle = '#000';
      ctx.font = 'bold 40px Arial';
      ctx.fillText(achievement.points + " pts", canvas.width / 2, 190);

      // Subtitle
      ctx.fillStyle = 'white';
      ctx.font = '24px Arial';
      ctx.fillText('Yuk ikut main & kumpulin poin di RISA 🚀', canvas.width / 2, 300);

      // Footer link
      ctx.font = '18px Arial';
      ctx.fillText('👉 Main sekarang di risa.app/game', canvas.width / 2, 340);

      // Download PNG
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `risa-achievement-${achievement.id}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert("✅ Achievement berhasil diunduh!");
        }
      });
    }

    // Generate Share Link
    async function shareAchievement() {
      const shareData = {
        title: "RISA Achievement",
        text: `🎉 Aku baru dapet ${achievement.points} Achievement Point di RISA! Yuk ikut main & kumpulin poin 🚀`,
        url: "https://risa.app/play"
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.log("Share canceled", err);
        }
      } else {
        navigator.clipboard.writeText(shareData.url).then(() => {
          alert("📋 Link achievement sudah disalin!");
        });
      }
    }

    document.getElementById("btnDownload").addEventListener("click", generateAchievement);
    document.getElementById("btnShare").addEventListener("click", shareAchievement);

    