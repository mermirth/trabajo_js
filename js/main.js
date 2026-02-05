(() => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav a").forEach(a => {
    if (a.dataset.nav === page) a.classList.add("active");
  });
})();

(() => {
  const f = document.getElementById("subscribeForm");
  const email = document.getElementById("subEmail");
  const msg = document.getElementById("subMsg");
  if (!f || !email || !msg) return;

  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = email.value.trim();
    msg.textContent = v ? `¡Gracias! Te enviaremos recetas a ${v}.` : "";
    email.value = "";
  });
})();

