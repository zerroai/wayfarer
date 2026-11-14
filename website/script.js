// Scroll reveal, nav state, card spotlight and hero phone tilt. No dependencies.
(() => {
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll(".card").forEach((c) => {
    c.addEventListener("pointermove", (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });

  const stage = document.getElementById("stage");
  if (stage && matchMedia("(hover:hover)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    const shop = stage.querySelector(".p-shop"), buyer = stage.querySelector(".p-buyer");
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      shop.style.transform = `rotateY(${14 + x * 14}deg) rotateX(${-y * 10}deg) rotateZ(-4deg)`;
      buyer.style.transform = `rotateY(${-14 + x * 14}deg) rotateX(${-y * 10}deg) rotateZ(4deg)`;
    });
    stage.addEventListener("pointerleave", () => { shop.style.transform = ""; buyer.style.transform = ""; });
  }
})();
