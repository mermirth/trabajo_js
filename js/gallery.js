(() => {
  const images = [
    { src: "../assets/images/1.png", alt: "Pollo asado al horno" },
    { src: "../assets/images/2.png", alt: "Tostadas de aguacate y huevo" },
    { src: "../assets/images/3.png", alt: "Tortilla de patata jugosa" },
    { src: "../assets/images/4.png", alt: "Spaghetti carbonara" },
    { src: "../assets/images/5.png", alt: "Merluza en salsa verde" },
    { src: "../assets/images/6.png", alt: "Tiramisú casero" },
    { src: "../assets/images/7.png", alt: "Muslos de pollo al horno" },
    { src: "../assets/images/8.png", alt: "Postre de frutos rojos" },
    { src: "../assets/images/9.png", alt: "Arroz (paella casera)" },
    { src: "../assets/images/10.png", alt: "Carrilleras al vino tinto" }
  ];

  const grid = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const closeBtn = document.getElementById("closeLb");

  if (!grid || !lightbox || !lbImg || !lbCaption || !closeBtn) return;

  // Miniaturas
  grid.innerHTML = images.map((img, i) => `
    <button class="thumb" type="button" data-index="${i}">
      <img src="${img.src}" alt="${img.alt}">
    </button>
  `).join("");

  // Abrir lightbox
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".thumb");
    if (!btn) return;

    const img = images[Number(btn.dataset.index)];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lightbox.hidden = false;
  });

  // Cerrar
  closeBtn.addEventListener("click", () => (lightbox.hidden = true));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.hidden = true;
  });
})();
