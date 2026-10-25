// ---------- Neural network background ----------
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
const NODE_COUNT = 70;
const LINK_DISTANCE = 140;
let nodes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createNodes() {
  nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < LINK_DISTANCE) {
        ctx.strokeStyle = `rgba(124, 92, 255, ${1 - dist / LINK_DISTANCE})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.fillStyle = "#00d4ff";
  for (const n of nodes) {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(drawNetwork);
}

resizeCanvas();
createNodes();
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  drawNetwork();
}
window.addEventListener("resize", () => {
  resizeCanvas();
  createNodes();
});

// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => menu.classList.remove("open"))
);

// ---------- Theme toggle ----------
const themeBtn = document.getElementById("themeBtn");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === "light" ? "☀️" : "🌙";
}
try {
  applyTheme(localStorage.getItem("theme") || "dark");
} catch {
  applyTheme("dark");
}
themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
});

// ---------- Typing effect ----------
const words = ["şekillendiren", "dönüştüren", "hızlandıran", "öğrenen"];
const typed = document.getElementById("typed");
let wordIndex = 0;
setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  typed.textContent = words[wordIndex];
}, 2500);

// ---------- Scroll reveal + counters ----------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

function animateCounter(el) {
  const target = Number(el.dataset.count);
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(target * progress);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll("[data-count]").forEach(animateCounter);

// ---------- Tabs ----------
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// ---------- Quiz ----------
const questions = [
  {
    q: "\"Yapay Zekâ\" terimi ilk kez hangi yıl kullanıldı?",
    options: ["1945", "1956", "1984", "2001"],
    answer: 1,
  },
  {
    q: "Günümüzde kullanılan sistemlerin çoğu hangi YZ türüdür?",
    options: ["Süper YZ", "Genel YZ", "Dar YZ", "Kuantum YZ"],
    answer: 2,
  },
  {
    q: "Büyük dil modellerinin temelindeki mimari hangisidir?",
    options: ["Transformer", "Karar ağacı", "Perceptron", "SQL"],
    answer: 0,
  },
  {
    q: "Deep Blue hangi oyunda dünya şampiyonunu yendi?",
    options: ["Go", "Dama", "Poker", "Satranç"],
    answer: 3,
  },
  {
    q: "MCP (Model Context Protocol) ne işe yarar?",
    options: ["Görsel sıkıştırma", "YZ'yi dış araç ve verilere bağlama", "Model eğitme", "Şifreleme"],
    answer: 1,
  },
  {
    q: "Bir \"Skill\" genellikle neyden oluşur?",
    options: ["Talimat dosyası ve betikler", "Donanım sürücüsü", "Veritabanı tablosu", "Video dosyası"],
    answer: 0,
  },
];

const qCount = document.getElementById("qCount");
const qText = document.getElementById("qText");
const qOptions = document.getElementById("qOptions");
const qFeedback = document.getElementById("qFeedback");
const qNext = document.getElementById("qNext");
let current = 0;
let score = 0;

function renderQuestion() {
  const item = questions[current];
  qCount.textContent = `Soru ${current + 1} / ${questions.length}`;
  qText.textContent = item.q;
  qFeedback.textContent = "";
  qNext.hidden = true;
  qOptions.replaceChildren(
    ...item.options.map((text, i) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = text;
      btn.addEventListener("click", () => selectAnswer(i));
      return btn;
    })
  );
}

function selectAnswer(index) {
  const item = questions[current];
  const buttons = qOptions.querySelectorAll(".option");
  buttons.forEach((b) => (b.disabled = true));
  buttons[item.answer].classList.add("correct");
  if (index === item.answer) {
    score++;
    qFeedback.textContent = "✅ Doğru!";
  } else {
    buttons[index].classList.add("wrong");
    qFeedback.textContent = "❌ Yanlış.";
  }
  qNext.textContent = current === questions.length - 1 ? "Sonucu Gör" : "Sonraki";
  qNext.hidden = false;
}

function showResult() {
  qCount.textContent = "Bitti!";
  qText.textContent = `Skorun: ${score} / ${questions.length}`;
  qOptions.replaceChildren();
  qFeedback.textContent = score === questions.length ? "🏆 Mükemmel!" : "Tekrar dene!";
  qNext.textContent = "Baştan Başla";
  qNext.hidden = false;
}

qNext.addEventListener("click", () => {
  if (current >= questions.length) {
    current = 0;
    score = 0;
    renderQuestion();
    return;
  }
  current++;
  if (current < questions.length) renderQuestion();
  else showResult();
});

renderQuestion();

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
