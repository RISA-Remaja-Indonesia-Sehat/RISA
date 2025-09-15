const statements = [
  { 
    text: "Menstruasi adalah proses normal dan sehat pada wanita", 
    correct: "fact",
    explanation: "Menstruasi adalah proses alami sebagai bagian dari siklus reproduksi. Tidak berbahaya dan tanda tubuh sehat."
  },
  { 
    text: "Wanita yang sedang menstruasi tidak boleh berenang", 
    correct: "myth",
    explanation: "Wanita tetap boleh berenang saat menstruasi, asal menggunakan perlindungan yang tepat seperti tampon atau menstrual cup."
  },
  { 
    text: "Vaksin HPV dapat mencegah kanker serviks", 
    correct: "fact",
    explanation: "Vaksin HPV terbukti efektif mencegah infeksi virus HPV penyebab utama kanker serviks."
  },
  { 
    text: "PMS hanya ada di 'pikiran' saja", 
    correct: "myth",
    explanation: "PMS nyata, disebabkan oleh perubahan hormon yang bisa memengaruhi fisik dan emosi."
  },
  { 
    text: "Olahraga dapat membantu mengurangi nyeri menstruasi", 
    correct: "fact",
    explanation: "Aktivitas fisik membantu melancarkan peredaran darah dan merangsang endorfin yang mengurangi rasa sakit."
  }
];


localStorage.removeItem('quizResult');
let currentIndex = 0;
let score = 0;
let startTime = Date.now();
const primaryColor = '#F89BB1';
let answersLog = [];

/* ==========================
   Elements
   ========================== */
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('scoreText');
const mythZone = document.getElementById('mythZone');
const factZone = document.getElementById('factZone');
const resultOverlay = document.getElementById('resultOverlay');
const finalScoreEl = document.getElementById('finalScore');
const finalPointsEl = document.getElementById('finalPoints');
const trophyImg = document.getElementById('trophyImg');
const statementText = document.getElementById('statementText');
const statementCard = document.getElementById('statementCard');
const backBtn = document.getElementById('backBtn');

backBtn.addEventListener("click", () => {
  window.location.href ='./game.html'
})



/* ==========================
   Render / Helpers
   ========================== */
function renderStatement() {
  const s = statements[currentIndex];
  statementText.textContent = s.text;
  progressText.textContent = `Pertanyaan ${currentIndex + 1} dari ${statements.length}`;
  scoreText.textContent = `Skor: ${score}/${statements.length}`;
  gsap.fromTo(statementCard, { y: 12, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" });
  progressBar.style.width = `${((currentIndex + 1) / statements.length) * 100}%`;
}

const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.5;
bgMusic.play().catch(() => console.log("Autoplay blocked"));

/* ==========================
   GSAP dropzone pulse
   ========================== */
function pulseZone(zone) {
  gsap.fromTo(zone, { boxShadow: "0 0 0px rgba(0,0,0,0)" }, {
    boxShadow: `0 20px 40px rgba(0,0,0,0.08), 0 0 30px ${primaryColor}33`,
    duration: 0.28,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut"
  });
}

/* ==========================
   Answer logic
   ========================== */
function answer(choice) {
  const currentQ = statements[currentIndex]
  const correct = currentQ.correct;
  const isCorrect = choice === correct;

 answersLog.push({
  number: currentIndex + 1,
  question: currentQ.text,
  userAnswer: choice,
  correctAnswer: correct,
  isCorrect
 }) 
  // feedback color
  if (isCorrect) {
    score++;
    confettiBurst();
    gsap.to(statementCard, { backgroundColor: "#ecfdf5", duration: 0.35, repeat: 1, yoyo: true });
    document.getElementById('correctSound').play();
  } else {
    gsap.to(statementCard, { backgroundColor: "#fff1f2", duration: 0.35, repeat: 1, yoyo: true });
    document.getElementById('wrongSound').play();
  }

  // small badge pop
  const badge = document.createElement('div');
  badge.textContent = isCorrect ? '✓ Benar' : '✗ Salah';
  badge.className = 'absolute px-4 py-2 rounded-full text-sm';
  badge.style.background = isCorrect ? '#DCFCE7' : '#FEE2E2';
  badge.style.left = '50%';
  badge.style.transform = 'translateX(-50%)';
  badge.style.top = '8px';
  statementCard.appendChild(badge);
  gsap.fromTo(badge, { y: -10, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" });
  setTimeout(() => { gsap.to(badge, { opacity: 0, duration: 0.25, onComplete: () => badge.remove() }); }, 900);

  // next or end
  setTimeout(() => {
    if (currentIndex + 1 >= statements.length) {
      endGame();
    } else {
      currentIndex++;
      renderStatement();
    }
  }, 900);
}

/* ==========================
   Confetti
   ========================== */
function confettiBurst() {
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 },
    colors: [primaryColor, '#FFFFFF', '#FFD700']
  });
}

/* ==========================
   End game + achievement
   ========================== */
export function calculatePoints() {
  const basePoints = score * 10;
  const timeBonus = Math.max(0, 60 - Math.floor((Date.now() - startTime) / 1000));
  return basePoints + timeBonus;
}


function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function endGame() {
  const endTime = Date.now();
  let duration = Math.floor((endTime - startTime) / 1000);

  // hitung benar & salah
  let correct = 0;
  let wrong = 0;

  const formattedAnswers = answersLog.map((ans, idx) => {
    const statement = statements[idx];
    const isCorrect = ans.userAnswer === statement.correct;

    if (isCorrect) correct++;
    else wrong++;

    return {
  statement: {
    text: statement.text,
    correct: statement.correct,
    explanation: statement.explanation
  },
  userAnswer: ans.userAnswer,
  isCorrect: isCorrect
};

  });

  const finalData = {
    score: score,
    correct: correct,
    wrong: wrong,
    duration: formatDuration(duration),
    answers: formattedAnswers
  };

  localStorage.setItem('quizResult', JSON.stringify(finalData));
  window.location.href = './result.html';
}




/* ==========================
   Pointer-based drag (works on touch + mouse)
   ========================== */
let dragging = false;
let dragClone = null;
let dragOffset = { x: 0, y: 0 };
let currentDrop = null;

function initPointerDrag(el) {
  el.addEventListener('pointerdown', (ev) => {
    // only left click or touch
    if (ev.button && ev.button !== 0) return;
    ev.preventDefault();

    dragging = true;
    startPointerDrag(ev.clientX, ev.clientY, el);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp, { once: true });
  });
}

function startPointerDrag(clientX, clientY, sourceEl) {
  const rect = sourceEl.getBoundingClientRect();
  dragOffset.x = clientX - rect.left;
  dragOffset.y = clientY - rect.top;

  // clone visual
  dragClone = sourceEl.cloneNode(true);
  dragClone.classList.add('drag-clone');
  dragClone.style.width = rect.width + 'px';
  dragClone.style.height = rect.height + 'px';
gsap.set(dragClone, { 
  x: rect.left, 
  y: rect.top, 
  scale: 1.03, 
  opacity: 0.98 
});

  dragClone.style.borderRadius = '12px';
  document.body.appendChild(dragClone);

  // track position in clone._x / _y
  dragClone._x = clientX - dragOffset.x;
  dragClone._y = clientY - dragOffset.y;
  gsap.set(dragClone, { x: dragClone._x, y: dragClone._y, scale: 1.03, opacity: 0.98 });

  // subtle lift animation
  gsap.to(dragClone, { scale: 1.05, duration: 0.18, ease: 'power1.out' });
}

function onPointerMove(e) {
  if (!dragging || !dragClone) return;
  dragClone._x = e.clientX - dragOffset.x;
  dragClone._y = e.clientY - dragOffset.y;
  gsap.set(dragClone, { x: dragClone._x, y: dragClone._y });

  // dropzone under pointer?
  const elUnder = document.elementFromPoint(e.clientX, e.clientY);
  const zone = elUnder ? elUnder.closest('.dropzone') : null;
  if (zone && (!currentDrop || currentDrop !== zone)) {
    if (currentDrop) currentDrop.classList.remove('active');
    currentDrop = zone;
    currentDrop.classList.add('active');
    pulseZone(currentDrop);
  } else if (!zone && currentDrop) {
    currentDrop.classList.remove('active');
    currentDrop = null;
  }
}

function onPointerUp(e) {
  if (!dragging || !dragClone) return;
  dragging = false;

  // check drop target
  const elUnder = document.elementFromPoint(e.clientX, e.clientY);
  const zone = elUnder ? elUnder.closest('.dropzone') : null;
  if (zone) {
    // animate fly to center of zone
    const targetRect = zone.getBoundingClientRect();
    const cloneRect = dragClone.getBoundingClientRect();
    const dx = (targetRect.left + targetRect.width/2) - (cloneRect.left + cloneRect.width/2);
    const dy = (targetRect.top + targetRect.height/2) - (cloneRect.top + cloneRect.height/2);

    gsap.to(dragClone, {
      x: `+=${dx}`,
      y: `+=${dy}`,
      scale: 0.88,
      rotation: (zone.dataset.type === 'myth') ? -8 : 8,
      duration: 0.42,
      ease: "power2.out",
      onComplete: () => {
        // animate pop and remove clone
        gsap.to(dragClone, { opacity: 0, scale: 0.7, duration: 0.2, onComplete: () => dragClone.remove() });
        // run answer logic
        answer(zone.dataset.type);
        if (currentDrop) { currentDrop.classList.remove('active'); currentDrop = null; }
      }
    });
  } else {
    // animate clone back and remove
    gsap.to(dragClone, { x: 0, y: 0, opacity: 0, scale: 0.9, duration: 0.32, onComplete: () => dragClone.remove() });
    if (currentDrop) { currentDrop.classList.remove('active'); currentDrop = null; }
  }

  // cleanup listeners
  window.removeEventListener('pointermove', onPointerMove);
}

/* ==========================
   Buttons and initialization
   ========================== */
document.getElementById('btnMitos').addEventListener('click', () => answer('myth'));
document.getElementById('btnFakta').addEventListener('click', () => answer('fact'));




/* init */
initPointerDrag(statementCard);
renderStatement();
