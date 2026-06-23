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
  "NLP & LLMs",
  "Embeddings & Retrieval",
  "Production ML Pipelines",
  "Multimodal AI",
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

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
