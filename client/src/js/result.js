// result.js - Game Result Page with GSAP Animations

// Sample quiz data (this would come from the game session)
const statements = [
  { text: "Menstruasi adalah proses normal dan sehat pada wanita", correct: "fact" },
  { text: "Wanita yang sedang menstruasi tidak boleh berenang", correct: "myth" },
  { text: "Vaksin HPV dapat mencegah kanker serviks", correct: "fact" },
  { text: "PMS hanya ada di 'pikiran' saja", correct: "myth" },
  { text: "Olahraga dapat membantu mengurangi nyeri menstruasi", correct: "fact" }
];

// Sample result data (normally from sessionStorage or URL params)
const mockResults = {
  score: 80,
  correct: 4,
  wrong: 1,
  duration: "01:22",
  answers: [
    { statement: statements[0], userAnswer: "fact", isCorrect: true },
    { statement: statements[1], userAnswer: "myth", isCorrect: true },
    { statement: statements[2], userAnswer: "fact", isCorrect: true },
    { statement: statements[3], userAnswer: "myth", isCorrect: true },
    { statement: statements[4], userAnswer: "myth", isCorrect: false }
  ]
};

class ResultPage {
  constructor() {
    this.results = this.getResults();
    this.confettiCanvas = null;
    this.confettiContext = null;
    this.particles = [];
    this.init();
  }

  getResults() {
    // In real implementation, get from sessionStorage or URL params
    // For now, use mock data
    return mockResults;
  }

  init() {
    this.setupConfetti();
    this.populateResults();
    this.initAnimations();
    this.bindEvents();
  }

  setupConfetti() {
    this.confettiCanvas = document.getElementById('confetti-canvas');
    this.confettiContext = this.confettiCanvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
  }

  populateResults() {
    // Update score display
    document.getElementById('correct-count').textContent = this.results.correct;
    document.getElementById('wrong-count').textContent = this.results.wrong;
    document.getElementById('duration').textContent = this.results.duration;

    // Populate detailed results
    const resultsList = document.getElementById('results-list');
    this.results.answers.forEach((answer, index) => {
      const resultItem = this.createResultItem(answer, index);
      resultsList.appendChild(resultItem);
    });
  }

  createResultItem(answer, index) {
    const div = document.createElement('div');
    div.className = `p-4 rounded-xl border-2 ${answer.isCorrect 
      ? 'bg-green-50 border-green-200' 
      : 'bg-red-50 border-red-200'} result-item opacity-0`; 
    
    const correctText = answer.statement.correct === 'fact' ? 'FAKTA' : 'MITOS';
    const statusText = answer.isCorrect ? 'benar' : 'salah';
    
    div.innerHTML = `
      <div class="text-left">
        <p class="text-sm font-medium text-gray-800 mb-2">${answer.statement.text}</p>
        <div class="flex items-center gap-2">
          <span class="px-2 py-1 text-xs font-semibold rounded ${
            answer.statement.correct === 'fact' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }">${correctText}</span>
          <span class="text-xs text-gray-600">Jawaban kamu ${statusText}</span>
        </div>
      </div>
    `;
    
    return div;
  }

  initAnimations() {
    // Create timeline for sequential animations
    const tl = gsap.timeline();

    // Animate back button
    tl.to('#back-btn', {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })

    // Animate score circle with scale and rotation
    .to('#score-circle', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    })

    // Animate score number with counter
    .to('#score-number', {
      textContent: this.results.score,
      duration: 1.5,
      ease: "power2.out",
      snap: { textContent: 1 },
      onComplete: () => {
        // Trigger confetti when score animation completes
        this.startConfetti();
      }
    }, "-=0.5")

    // Animate stats
    .to('#stats', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.8")

    // Animate result items with stagger
    .to('.result-item', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3")

    // Animate action buttons
    .to('#action-buttons', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")

    // Animate recommendations
    .to('#recommendations', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // Counter animation for stats
    this.animateCounters();
  }

  animateCounters() {
    // Animate correct count
    gsap.to('#correct-count', {
      textContent: this.results.correct,
      duration: 1,
      ease: "power2.out",
      snap: { textContent: 1 },
      delay: 1
    });

    // Animate wrong count
    gsap.to('#wrong-count', {
      textContent: this.results.wrong,
      duration: 1,
      ease: "power2.out",
      snap: { textContent: 1 },
      delay: 1.2
    });
  }

  startConfetti() {
    // Create confetti particles
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 3 + 2,
        color: this.getRandomColor(),
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    this.animateConfetti();

    // Stop confetti after 4 seconds
    setTimeout(() => {
      this.particles = [];
    }, 4000);
  }

  getRandomColor() {
    const colors = ['#ff6b9d', '#feca57', '#48cae4', '#f38ba8', '#a8dadc', '#457b9d'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animateConfetti() {
    this.confettiContext.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    this.particles.forEach((particle, index) => {
      // Update particle position
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.2; // gravity
      particle.rotation += particle.rotationSpeed;

      // Draw particle
      this.confettiContext.save();
      this.confettiContext.translate(particle.x, particle.y);
      this.confettiContext.rotate(particle.rotation * Math.PI / 180);
      this.confettiContext.fillStyle = particle.color;
      this.confettiContext.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
      this.confettiContext.restore();

      // Remove particles that are off screen
      if (particle.y > this.confettiCanvas.height + 50) {
        this.particles.splice(index, 1);
      }
    });

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    }
  }

  bindEvents() {
    // Back button
    document.getElementById('back-btn').addEventListener('click', () => {
      window.history.back();
    });

    // Replay button
    document.getElementById('replay-btn').addEventListener('click', () => {
      window.location.href = 'game.html';
    });

    // Download Achievement button
    document.getElementById('achievement-btn').addEventListener('click', () => this.downloadAchievement());

    // Share button
    document.getElementById('share-btn').addEventListener('click', () => {
      this.shareResults();
    });

    // Home button
    document.getElementById('home-btn').addEventListener('click', () => {
      window.location.href = 'index.html';
    });
 
    // Recommendation cards
    document.querySelectorAll('#recommendations .group').forEach((card, index) => {
      card.addEventListener('click', () => {
        // Navigate to specific article based on index
        const articles = ['article-hiv.html', 'article-discharge.html', 'article-menstruation.html'];
        if (articles[index]) {
          window.location.href = articles[index];
        }
      });
    });
  }
  downloadAchievement() {
    const achievementElement = document.createElement('div');
    achievementElement.style.position = 'fixed';
    achievementElement.style.top = '50%';
    achievementElement.style.left = '50%';
    achievementElement.style.transform = 'translate(-50%, -50%)';
    achievementElement.style.padding = '20px';
    achievementElement.style.backgroundColor = '#fff';
    achievementElement.style.border = '4px solid #ff6b9d';
    achievementElement.style.borderRadius = '10px';
    achievementElement.style.textAlign = 'center';
    achievementElement.style.zIndex = '1000';
    achievementElement.innerHTML = `
      <h2 style="font-size: 24px; margin-bottom: 10px;"> 🎉Certificate of Achievement 🎉</h2>
      <p style="font-size: 18px; margin-bottom: 20px;">Aku mendapatkan skor ${this.results.score} di game Mitos vs Fakta!</p>
      <p style="font-size: 14px; color: #555;">Teruslah belajar, teruslah berkembang 🌸</p>
      <span>
        <img src="/client/public/media/LogoRisa.png" alt="RISA Logo" style="width: 30px; margin-top: 10px;">
      </span>
    `;
    document.body.appendChild(achievementElement);

    html2canvas(achievementElement).then(canvas => {  
      const link = document.createElement('a');
      link.download = 'achievement-mitosvsfakta.png';
      link.href = canvas.toDataURL();
      link.click();
      document.body.removeChild(achievementElement);
    });
  }
  
  shareResults() {
    const shareText = `Aku baru saja menyelesaikan game Mitos vs Fakta di RISA dan mendapat skor ${this.results.score}! 🎉 Yuk cobain juga untuk belajar lebih banyak tentang kesehatan reproduksi.`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Mitos vs Fakta - RISA',
        text: shareText,
        url: window.location.origin + '/index.html'
      }).catch(console.error);
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        this.showShareFeedback();
      }).catch(() => {
        // Fallback for older browsers
        this.openShareModal();
      });
    }
  }

  showShareFeedback() {
    // Create temporary feedback element
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    feedback.textContent = 'Teks berhasil disalin!';
    document.body.appendChild(feedback);

    // Animate feedback
    gsap.fromTo(feedback, 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.3 }
    );

    // Remove after 3 seconds
    setTimeout(() => {
      gsap.to(feedback, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => feedback.remove()
      });
    }, 3000);
  }

  openShareModal() {
    // Simple fallback - open social media links
    const shareUrl = encodeURIComponent(window.location.origin + '/index.html');
    const shareText = encodeURIComponent(`Aku baru saja menyelesaikan game Mitos vs Fakta di RISA dan mendapat skor ${this.results.score}!`);
    
    const socialLinks = {
      whatsapp: `https://wa.me/?text=${shareText} ${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    };

    // For simplicity, just open WhatsApp
    window.open(socialLinks.whatsapp, '_blank');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ResultPage();
});

export default ResultPage;