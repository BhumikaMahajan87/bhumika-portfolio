// ===== Sticky nav shadow on scroll =====
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu toggle =====
const toggle = document.getElementById("navToggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  links.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.classList.remove("active");
    links.classList.remove("open");
  })
);

// ===== Rotating role text =====
const roles = [
  "Recommender Systems",
  "NLP & LLM Workflows",
  "Embeddings & Retrieval",
  "Backend & Data Systems",
  "Production ML Pipelines",
  "Scalable APIs & Services",
];
const rotator = document.getElementById("rotator");
let ri = 0, ci = 0, deleting = false;

function typeLoop() {
  const word = roles[ri];
  rotator.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) {
    ci++;
  } else if (deleting && ci > 0) {
    ci--;
  } else if (!deleting && ci === word.length) {
    deleting = true;
    setTimeout(typeLoop, 1400);
    return;
  } else if (deleting && ci === 0) {
    deleting = false;
    ri = (ri + 1) % roles.length;
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ===== Reveal on scroll =====
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // small stagger for grouped items
        setTimeout(() => e.target.classList.add("in"), Math.min(i * 60, 240));
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Scroll progress bar =====
const progress = document.createElement("div");
progress.className = "scroll-progress";
document.body.appendChild(progress);
const updateProgress = () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ===== Count-up stat numbers =====
const animateCount = (el) => {
  const m = el.textContent.trim().match(/^(\d+)(.*)$/);
  if (!m) return;
  const target = parseInt(m[1], 10);
  const suffix = m[2];
  const dur = 1100;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
const statsEl = document.querySelector(".stats");
if (statsEl) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".num").forEach(animateCount);
          statObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  statObserver.observe(statsEl);
}

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
