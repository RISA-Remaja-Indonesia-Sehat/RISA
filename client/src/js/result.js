// result.js - Game Result Page with GSAP Animations


 document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("complete-audio");
    if (audio) {
      audio.play().catch(err => {
        console.warn("Autoplay diblokir browser:", err);
      });
    }
  });



class ResultPage {
  constructor() {
    this.results = this.getResults();
    this.confettiCanvas = null;
    this.confettiContext = null;
    this.particles = [];
    this.init();
  }

  getResults() {
    // Ambil data dari localStorage
    const storedResults = localStorage.getItem('quizResult'); // <- samain dengan endGame
    if (storedResults) {
      return JSON.parse(storedResults);
    }
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

  // render penjelasan hanya kalau salah
  const explanationHTML = !answer.isCorrect 
    ? `<p class="mt-2 text-sm text-gray-700"><strong>Penjelasan:</strong> ${answer.statement.explanation}</p>` 
    : "";

   
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
      ${explanationHTML}
    </div>
    `;
    
    return div;
  }

  initAnimations() {
    const tl = gsap.timeline();

    tl.to('#back-btn', {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to('#score-circle', {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .to('#score-number', {
      textContent: this.results.score * 20,
      duration: 1.5,
      ease: "power2.out",
      snap: { textContent: 1 },
      onComplete: () => this.startConfetti()
    }, "-=0.5")
    .to('#stats', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.8")
    .to('.result-item', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3")
    .to('#action-buttons', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")
    .to('#recommendations', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    this.animateCounters();
  }

  animateCounters() {
    gsap.to('#correct-count', {
      textContent: this.results.correct,
      duration: 1,
      ease: "power2.out",
      snap: { textContent: 1 },
      delay: 1
    });

    gsap.to('#wrong-count', {
      textContent: this.results.wrong,
      duration: 1,
      ease: "power2.out",
      snap: { textContent: 1 },
      delay: 1.2
    });
  }

  startConfetti() {
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
    setTimeout(() => { this.particles = []; }, 4000);
  }

  getRandomColor() {
    const colors = ['#ff6b9d', '#feca57', '#48cae4', '#f38ba8', '#a8dadc', '#457b9d'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animateConfetti() {
    this.confettiContext.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    this.particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.2;
      particle.rotation += particle.rotationSpeed;

      this.confettiContext.save();
      this.confettiContext.translate(particle.x, particle.y);
      this.confettiContext.rotate(particle.rotation * Math.PI / 180);
      this.confettiContext.fillStyle = particle.color;
      this.confettiContext.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
      this.confettiContext.restore();

      if (particle.y > this.confettiCanvas.height + 50) {
        this.particles.splice(index, 1);
      }
    });

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    }
  }

  bindEvents() {
    document.getElementById('back-btn').addEventListener('click', () => window.history.back());
    document.getElementById('replay-btn').addEventListener('click', () => window.location.href = 'game.html');
    document.getElementById('achievement-btn').addEventListener('click', () => this.downloadAchievement());
    document.getElementById('share-btn').addEventListener('click', () => this.shareResults());
    document.getElementById('home-btn').addEventListener('click', () => window.location.href = 'index.html');

    document.querySelectorAll('#recommendations .group').forEach((card, index) => {
      const articles = ['article-hiv.html', 'article-discharge.html', 'article-menstruation.html'];
      card.addEventListener('click', () => {
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
      navigator.clipboard.writeText(shareText).then(() => {
        this.showShareFeedback();
      }).catch(() => {
        this.openShareModal();
      });
    }
  }

  showShareFeedback() {
    const feedback = document.createElement('div');
    feedback.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    feedback.textContent = 'Teks berhasil disalin!';
    document.body.appendChild(feedback);

    gsap.fromTo(feedback, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });

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
    const shareUrl = encodeURIComponent(window.location.origin + '/index.html');
    const shareText = encodeURIComponent(`Aku baru saja menyelesaikan game Mitos vs Fakta di RISA dan mendapat skor ${this.results.score}!`);
    
    const socialLinks = {
      whatsapp: `https://wa.me/?text=${shareText} ${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    };

    window.open(socialLinks.whatsapp, '_blank');
  }
}

// init page
new ResultPage();
