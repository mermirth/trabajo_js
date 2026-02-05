(async () => {
  const container = document.getElementById("news");
  if (!container) return;

  try {
    const res = await fetch("data/news.json");
    const news = await res.json();

    container.innerHTML = news.map(item => `
      <article class="news-item">
        <h3>${item.title}</h3>
        <small>${item.date}</small>
        <p>${item.text}</p>
      </article>
    `).join("");

  } catch (e) {
    container.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
  }
})();
