const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const searchParamKey = "search";

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

const getSearchQuery = () => {
  const params = new URLSearchParams(window.location.search);
  return (params.get(searchParamKey) || "").trim();
};

const buildSearchUrl = (query) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return "catalogue.html";
  return `catalogue.html?${searchParamKey}=${encodeURIComponent(trimmedQuery)}`;
};

const ensureToolbarSearch = () => {
  const navbarInner = document.querySelector(".navbar-inner");
  if (!navbarInner || navbarInner.querySelector(".toolbar-search")) return;

  const navElement = navbarInner.querySelector(".nav-links");
  if (!navElement) return;

  const form = document.createElement("form");
  form.className = "toolbar-search";
  form.setAttribute("role", "search");
  form.setAttribute("aria-label", "Site search");

  const input = document.createElement("input");
  input.className = "toolbar-search-input";
  input.type = "search";
  input.name = searchParamKey;
  input.placeholder = "Search products";
  input.setAttribute("aria-label", "Search products");
  input.value = getSearchQuery();

  const button = document.createElement("button");
  button.className = "toolbar-search-button";
  button.type = "submit";
  button.textContent = "Search";

  form.append(input, button);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    window.location.href = buildSearchUrl(input.value);
  });

  navbarInner.insertBefore(form, navElement);
};

const products = [
  {
    id: "walkman",
    name: "Compact Cassette Walkman",
    price: 189,
    image: "assets/images/walkman.svg",
    description:
      "A palm-sized cassette player tuned for warm mids, crisp highs, and the joy of analog discovery.",
    specs: [
      "Playback: Auto-reverse cassette",
      "Battery: 2x AA (included)",
      "Finish: Brushed walnut + matte black",
    ],
  },
  {
    id: "tube-radio",
    name: "Tube Radio Receiver",
    price: 325,
    image: "assets/images/tube-radio.svg",
    description:
      "A classic AM/FM receiver with glowing dials and room-filling vintage warmth.",
    specs: [
      "Bands: AM / FM",
      "Speakers: Dual cone drivers",
      "Finish: Caramel oak",
    ],
  },
  {
    id: "crt-monitor",
    name: "Studio CRT Monitor",
    price: 459,
    image: "assets/images/crt-monitor.svg",
    description:
      "A true studio relic with deep blacks and soft scanlines, perfect for retro computing setups.",
    specs: [
      "Screen: 15-inch CRT",
      "Inputs: VGA + BNC adapter",
      "Finish: Graphite",
    ],
  },
  {
    id: "film-camera",
    name: "35mm Film Camera",
    price: 399,
    image: "assets/images/film-camera.svg",
    description:
      "Capture timeless moments with a manual-focus camera and a signature mechanical shutter.",
    specs: [
      "Lens: 50mm f/1.8",
      "Shutter: 1s - 1/1000",
      "Finish: Brushed steel",
    ],
  },
  {
    id: "mechanical-keyboard",
    name: "Type 88 Mechanical Keyboard",
    price: 249,
    image: "assets/images/mechanical-keyboard.svg",
    description:
      "Crafted for writers, coders, and collectors, the Type 88 delivers a signature tactile response with warm, vintage tones.",
    specs: [
      "Layout: 87-key compact",
      "Connection: USB-C to USB-A adapter",
      "Finish: Matte warm ivory",
    ],
  },
  {
    id: "typewriter",
    name: "Deskline Typewriter",
    price: 280,
    image: "assets/images/typewriter.svg",
    description:
      "A desk-ready typewriter that clicks with confidence and anchors any writing ritual.",
    specs: [
      "Mechanism: Mechanical typebars",
      "Ribbon: Standard spool",
      "Finish: Almond cream",
    ],
  },
  {
    id: "tape-recorder",
    name: "Portable Tape Recorder",
    price: 210,
    image: "assets/images/walkman.svg",
    description:
      "Record interviews or mixtapes with a compact deck designed for clean vocal capture.",
    specs: [
      "Inputs: 3.5mm mic jack",
      "Output: Stereo headphones",
      "Finish: Smoky beige",
    ],
  },
  {
    id: "terminal-display",
    name: "Terminal Display 14”",
    price: 520,
    image: "assets/images/crt-monitor.svg",
    description:
      "A compact terminal display that brings vintage computing aesthetics to modern desks.",
    specs: [
      "Resolution: 1024x768",
      "Inputs: VGA",
      "Finish: Deep olive",
    ],
  },
  {
    id: "instant-camera",
    name: "Instant Photo Camera",
    price: 340,
    image: "assets/images/film-camera.svg",
    description:
      "Instant prints with a soft retro glow, perfect for studio moodboards and keepsakes.",
    specs: [
      "Film: Instant 600",
      "Flash: Built-in",
      "Finish: Warm sandstone",
    ],
  },
  {
    id: "studio-mixer",
    name: "Analog Studio Mixer",
    price: 610,
    image: "assets/images/tube-radio.svg",
    description:
      "An analog mixer with smooth faders and vintage coloration for modern studios.",
    specs: [
      "Channels: 8 mono inputs",
      "Outputs: Stereo + tape out",
      "Finish: Walnut casing",
    ],
  },
];

const cartKey = "vts-cart";

const formatPrice = (value) => `$${value}`;

const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(cartKey)) || [];
  } catch (error) {
    return [];
  }
};

const setCart = (items) => {
  localStorage.setItem(cartKey, JSON.stringify(items));
};

const addToCart = (productId) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  setCart(cart);
  alert("Added to cart! (Demo only)");
};

const bindCardInteractions = () => {
  const cards = document.querySelectorAll(".card[data-product-id]");
  cards.forEach((card) => {
    card.classList.add("clickable");
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) {
        return;
      }
      const productId = card.dataset.productId;
      window.location.href = `product.html?id=${productId}`;
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const productId = card.dataset.productId;
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
};

const renderProductPage = () => {
  const container = document.querySelector("[data-product-page]");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id") || container.dataset.defaultId;
  const product =
    products.find((item) => item.id === productId) || products[0];

  const title = container.querySelector("#product-title");
  const price = container.querySelector("#product-price");
  const description = container.querySelector("#product-description");
  const image = container.querySelector("#product-image");
  const specs = container.querySelector("#product-specs");
  const addButton = container.querySelector(".add-to-cart");

  if (title) title.textContent = product.name;
  document.title = `${product.name} | Vintage Tech Store`;
  if (price) price.textContent = formatPrice(product.price);
  if (description) description.textContent = product.description;
  if (image) {
    image.src = product.image;
    image.alt = product.name;
  }
  if (specs) {
    specs.innerHTML = "";
    product.specs.forEach((spec) => {
      const li = document.createElement("li");
      li.textContent = spec;
      specs.appendChild(li);
    });
  }
  if (addButton) {
    addButton.dataset.productId = product.id;
    addButton.addEventListener("click", () => addToCart(product.id));
  }
};

const renderCartPage = () => {
  const cartList = document.querySelector("#cart-items");
  const cartEmpty = document.querySelector("#cart-empty");
  const cartSummary = document.querySelector("#cart-summary");
  const cartTotal = document.querySelector("#cart-total");
  const clearButton = document.querySelector("#clear-cart");

  if (!cartList) return;

  const cart = getCart();
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  cartEmpty.style.display = "none";
  cartSummary.style.display = "flex";

  let total = 0;

  cart.forEach((item) => {
    const product = products.find((value) => value.id === item.id);
    if (!product) return;
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    const card = document.createElement("article");
    card.className = "cart-item";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>
        <h3>${product.name}</h3>
        <div class="cart-meta">
          <span>Qty: ${item.quantity}</span>
          <span>${formatPrice(product.price)}</span>
        </div>
      </div>
      <div>
        <p class="price">${formatPrice(itemTotal)}</p>
        <button class="button secondary" type="button" data-remove="${product.id}">
          Remove
        </button>
      </div>
    `;
    cartList.appendChild(card);
  });

  if (cartTotal) {
    cartTotal.textContent = formatPrice(total);
  }

  if (!cartList.dataset.bound) {
    cartList.addEventListener("click", (event) => {
      const removeId = event.target.getAttribute("data-remove");
      if (!removeId) return;
      const updated = getCart().filter((item) => item.id !== removeId);
      setCart(updated);
      renderCartPage();
    });
    cartList.dataset.bound = "true";
  }

  if (clearButton && !clearButton.dataset.bound) {
    clearButton.addEventListener("click", () => {
      setCart([]);
      renderCartPage();
    });
    clearButton.dataset.bound = "true";
  }
};

const applyCatalogueSearch = () => {
  const productGrid = document.querySelector(".grid.grid-4");
  if (!productGrid) return;

  const cards = Array.from(
    productGrid.querySelectorAll(".card[data-product-id]")
  );
  if (cards.length === 0) return;

  const query = getSearchQuery();
  const normalizedQuery = query.toLowerCase();

  let visibleCount = 0;
  cards.forEach((card) => {
    if (!normalizedQuery) {
      card.style.display = "";
      visibleCount += 1;
      return;
    }

    const product = products.find((item) => item.id === card.dataset.productId);
    const searchableText = product
      ? `${product.name} ${product.id} ${product.description} ${product.specs.join(
          " "
        )}`.toLowerCase()
      : "";
    const isMatch = searchableText.includes(normalizedQuery);
    card.style.display = isMatch ? "" : "none";
    if (isMatch) visibleCount += 1;
  });

  let resultSummary = document.querySelector("#catalogue-search-summary");
  if (!resultSummary) {
    resultSummary = document.createElement("p");
    resultSummary.id = "catalogue-search-summary";
    resultSummary.className = "search-summary";

    const filters = document.querySelector(".filters");
    if (filters) {
      filters.insertAdjacentElement("afterend", resultSummary);
    } else {
      productGrid.insertAdjacentElement("beforebegin", resultSummary);
    }
  }

  if (!normalizedQuery) {
    resultSummary.textContent = "";
    resultSummary.style.display = "none";
    return;
  }

  resultSummary.style.display = "block";
  resultSummary.textContent =
    visibleCount > 0
      ? `Search results for "${query}" (${visibleCount})`
      : `No products found for "${query}"`;
};

ensureToolbarSearch();
bindCardInteractions();
renderProductPage();
renderCartPage();
applyCatalogueSearch();

const contactForm = document.querySelector("#contact-form");
const formSuccess = document.querySelector("#form-success");
const formResetBtn = document.querySelector("#form-reset-btn");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.style.display = "none";
    formSuccess.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (formResetBtn) {
  formResetBtn.addEventListener("click", () => {
    contactForm.reset();
    contactForm.style.display = "grid";
    formSuccess.style.display = "none";
  });
}
