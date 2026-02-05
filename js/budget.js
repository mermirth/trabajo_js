(() => {
  const form = document.getElementById("budgetForm");
  if (!form) return;

  const els = {
    nombre: document.getElementById("nombre"),
    apellidos: document.getElementById("apellidos"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    pack: document.getElementById("pack"),
    people: document.getElementById("people"),
    discount: document.getElementById("discount"),
    extraMenu: document.getElementById("extraMenu"),
    extraLista: document.getElementById("extraLista"),
    extraVideollamada: document.getElementById("extraVideollamada"),
    total: document.getElementById("total"),
    errors: document.getElementById("errors"),
  };

  // Precios
  const PACK_PRICE = {
    basico: 35,
    pro: 95,
    familia: 120,
  };

  const EXTRAS_PRICE = {
    extraMenu: 8,
    extraLista: 5,
    extraVideollamada: 12,
  };

  // Regex solicitadas (nombre y apellidos separados)
  const RE_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,30}$/;
  // 1 a 3 apellidos, separados por espacio (evita números, etc.)
  const RE_APELLIDOS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,30}( [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{2,30}){0,2}$/;

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
  const isPhone = (v) => /^[0-9]{9}$/.test(v.replace(/\s+/g, ""));

  function readState() {
    const pack = els.pack.value;
    const people = Number(els.people.value || 0);
    const discount = Number(els.discount.value || 0);

    const extras = Object.keys(EXTRAS_PRICE).filter((k) => els[k]?.checked);

    return { pack, people, discount, extras };
  }

  function validate() {
    const errors = [];

    const nombre = (els.nombre?.value || "").trim();
    const apellidos = (els.apellidos?.value || "").trim();
    const phone = (els.phone?.value || "").trim();
    const email = (els.email?.value || "").trim();

    if (!RE_NOMBRE.test(nombre)) errors.push("Nombre: solo letras (2–30).");
    if (!RE_APELLIDOS.test(apellidos)) errors.push("Apellidos: solo letras (1–3 palabras).");

    if (!isPhone(phone)) errors.push("Teléfono: 9 dígitos (sin letras).");
    if (!isEmail(email)) errors.push("Email: formato no válido.");

    const { pack, people, discount } = readState();

    if (!PACK_PRICE[pack]) errors.push("Pack: selecciona uno.");
    if (!Number.isInteger(people) || people < 1 || people > 10) errors.push("Personas: entre 1 y 10.");

    if (Number.isNaN(discount) || discount < 0 || discount > 50) {
      errors.push("Descuento: entre 0 y 50.");
    }

    return errors;
  }

  function calculateTotal() {
    const { pack, people, discount, extras } = readState();

    const base = (PACK_PRICE[pack] || 0) * (people || 0);
    const extrasSum = extras.reduce((acc, k) => acc + EXTRAS_PRICE[k], 0);

    const subtotal = base + extrasSum;
    const total = subtotal * (1 - (discount / 100));

    // Evitar -0 y dejar 2 decimales
    return Math.max(0, Number(total.toFixed(2)));
  }

  function render() {
    const errs = validate();
    const total = calculateTotal();

    els.total.textContent = String(total.toFixed(2));

    if (els.errors) {
      if (errs.length) {
        els.errors.textContent = errs.join(" ");
        els.errors.style.color = "var(--muted)";
      } else {
        els.errors.textContent = "Datos correctos.";
        els.errors.style.color = "var(--accent)";
      }
    }
  }

  // Reactivo
  form.addEventListener("input", render);
  form.addEventListener("change", render);

  // Submit: existe botón y damos feedback
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const errs = validate();
    render();
    if (!errs.length && els.errors) {
      els.errors.textContent = "Formulario enviado correctamente.";
      els.errors.style.color = "var(--accent)";
    }
  });

  render();
})();
