(() => {
  const mapEl = document.getElementById("map");
  const msgEl = document.getElementById("mapMsg");
  if (!mapEl) return;

  // Coordenadas del negocio (Bilbao centro - Abando)
  const business = {
    lat: 43.2630,
    lng: -2.9350,
    name: "Maríu · Recetas caseras"
  };

  // Crear mapa
  const map = L.map(mapEl).setView([business.lat, business.lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  // Marcador del negocio
  const businessMarker = L.marker([business.lat, business.lng])
    .addTo(map)
    .bindPopup(`<strong>${business.name}</strong><br>Bilbao centro`)
    .openPopup();

  // Mensaje inicial
  if (msgEl) msgEl.textContent = "Calculando ruta desde tu ubicación…";

  // Pedir ubicación del usuario
  if (!navigator.geolocation) {
    if (msgEl) msgEl.textContent = "Tu navegador no permite geolocalización.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;

      // Marcador del usuario
      const userMarker = L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup("Tu ubicación")
        .openPopup();

      // Dibujar ruta (línea)
      const route = L.polyline(
        [
          [business.lat, business.lng],
          [userLat, userLng]
        ],
        { color: "blue", weight: 4 }
      ).addTo(map);

      // Ajustar zoom para ver todo
      map.fitBounds(route.getBounds(), { padding: [40, 40] });

      if (msgEl) msgEl.textContent = "Ruta mostrada desde tu ubicación hasta nuestro negocio.";
    },
    () => {
      if (msgEl) {
        msgEl.textContent =
          "No se pudo obtener tu ubicación. Permite el acceso para ver la ruta.";
      }
    }
  );
})();
