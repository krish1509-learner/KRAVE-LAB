const menuItems = [
  {
    id: 1,
    name: "The OG Truffle Smash",
    category: "burgers",
    price: 279,
    tag: "BESTSELLER",
    tagColor: "bg-matcha text-charcoal",
    desc: "Double crispy lace-edge smashed patty, aged cheddar, black truffle aioli & caramelized onions on toasted brioche.",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    name: "Nashville Hot Cluck Smash",
    category: "burgers",
    price: 259,
    tag: "SPICY 🔥",
    tagColor: "bg-coral text-white",
    desc: "Crispy cayenne-glazed buttermilk chicken smash, dill pickles, spicy comeback sauce & cool slaw.",
    img: "https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    name: "Shroom & Swiss Melt (V)",
    category: "burgers",
    price: 249,
    tag: "VEG GREEN",
    tagColor: "bg-lilac text-charcoal",
    desc: "Char-grilled portobello & crispy hashbrown patty, melted Swiss cheese, garlic herb butter & arugula.",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 4,
    name: "Kimchi Cheese Loaded Fries",
    category: "sides",
    price: 189,
    tag: "VIRAL HIT",
    tagColor: "bg-butter text-charcoal",
    desc: "Triple-cooked skin-on fries drowned in warm queso, house kimchi, gochujang mayo & toasted sesame.",
    img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 5,
    name: "Peri-Peri Popcorn Chicken",
    category: "sides",
    price: 199,
    tag: "CRUNCHY",
    tagColor: "bg-coral text-white",
    desc: "Bite-sized crispy chicken nuggets tossed in smoky African peri-peri dust with whipped ranch dip.",
    img: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 6,
    name: "Strawberry Cloud Matcha",
    category: "sips",
    price: 219,
    tag: "AESTHETIC ✨",
    tagColor: "bg-matcha text-charcoal",
    desc: "Ceremonial Uji matcha whisked over crushed Mahabaleshwar strawberry compote & vanilla oat foam.",
    img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 7,
    name: "Yuzu Peach Dirty Soda",
    category: "sips",
    price: 169,
    tag: "REFRESHING",
    tagColor: "bg-lilac text-charcoal",
    desc: "Sparkling Japanese yuzu citrus fizz swirled with white peach syrup, lime & sweet coconut cream.",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 8,
    name: "Biscoff Lava Brookie",
    category: "sweets",
    price: 179,
    tag: "SWEET DROP",
    tagColor: "bg-butter text-charcoal",
    desc: "Warm fudge brownie-cookie hybrid stuffed with molten Lotus Biscoff spread & sea salt flakes.",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 9,
    name: "Matcha White Choc Cookie",
    category: "sweets",
    price: 149,
    tag: "FRESH BAKED",
    tagColor: "bg-matcha text-charcoal",
    desc: "Soft-centered New York style green tea cookie loaded with caramelized white chocolate chunks.",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
  },
];
let cart = [];
let currentCategory = "all";
const menuGrid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartBadge = document.getElementById("cartBadge");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartTotal = document.getElementById("cartTotal");
const toastBox = document.getElementById("toastBox");
const toastMessage = document.getElementById("toastMessage");

document.addEventListener(
  "error",
  (event) => {
    if (!(event.target instanceof HTMLImageElement)) return;
    const image = event.target;
    const fallback = image.dataset.fallback;
    if (!fallback || image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = "true";
    image.src = fallback;
  },
  true,
);

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const target = event.target;
  const comboButton = target.closest("[data-add-special-combo]");
  const addButton = target.closest("[data-add-to-cart]");
  const quantityButton = target.closest("[data-change-qty]");

  if (comboButton) {
    addSpecialComboToCart();
  } else if (addButton) {
    addToCart(Number(addButton.dataset.addToCart));
  } else if (quantityButton) {
    changeQty(
      Number(quantityButton.dataset.changeQty),
      Number(quantityButton.dataset.qtyDelta),
    );
  }
});

let toastTimer;
function showToast(msg) {
  toastMessage.textContent = msg;
  toastBox.classList.remove("opacity-0", "translate-y-4");
  toastBox.classList.add("opacity-100", "translate-y-0");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastBox.classList.add("opacity-0", "translate-y-4");
    toastBox.classList.remove("opacity-100", "translate-y-0");
  }, 2600);
}
function renderMenu(category = "all") {
  const filtered =
    category === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = filtered
    .map(
      (item) => `
        <article class="brutal-card rounded-3xl overflow-hidden flex flex-col justify-between">
          <div>
            <div class="relative h-56 overflow-hidden border-b-2 border-charcoal dark:border-[#F8F7F2]">
              <img
                src="${item.img}"
                alt="${item.name}"
                data-fallback="https://placehold.co/600x450/C5F82A/121212?text=${encodeURIComponent(item.name)}"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold border-2 border-charcoal ${item.tagColor}">
                ${item.tag}
              </span>
            </div>
            <div class="p-5">
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="font-display font-extrabold text-xl leading-snug">${item.name}</h3>
                <span class="font-display font-extrabold text-lg px-2.5 py-0.5 rounded-lg bg-butter text-charcoal border border-charcoal shrink-0">
                  ₹${item.price}
                </span>
              </div>
              <p class="text-sm opacity-85 leading-relaxed">${item.desc}</p>
            </div>
          </div>

          <div class="px-5 pb-5 pt-2">
            <button
              type="button"
              data-add-to-cart="${item.id}"
              class="w-full py-3 rounded-xl bg-cream dark:bg-[#2A2A2A] hover:bg-matcha hover:text-charcoal font-extrabold text-sm brutal-btn flex items-center justify-center gap-2 transition-colors"
            >
              <span>+ Add to Bag</span>
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove(
        "bg-charcoal",
        "text-cream",
        "dark:bg-matcha",
        "dark:text-charcoal",
      );
      b.classList.add("bg-cream", "dark:bg-[#1E1E1E]");
    });
    btn.classList.remove("bg-cream", "dark:bg-[#1E1E1E]");
    btn.classList.add(
      "bg-charcoal",
      "text-cream",
      "dark:bg-matcha",
      "dark:text-charcoal",
    );

    currentCategory = btn.dataset.category;
    renderMenu(currentCategory);
  });
});
function addToCart(id) {
  const product = menuItems.find((p) => p.id === id);
  if (!product) return;
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`Added "${product.name}" to your bag! 🍔`);
}

function addSpecialComboToCart() {
  const comboId = 999;
  const existing = cart.find((c) => c.id === comboId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: comboId,
      name: "Midnight Study Fuel Box",
      price: 399,
      qty: 1,
    });
  }
  updateCartUI();
  showToast("Added Midnight Study Fuel Box (₹399)! ⚡");
}

function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter((c) => c.id !== id);
  }
  updateCartUI();
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  cartBadge.textContent = totalCount;
  cartTotal.textContent = `₹${totalAmount}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
          <div class="text-center py-12 opacity-70 space-y-2">
            <p class="text-4xl">🛒</p>
            <p class="font-bold">Your Krave Bag is empty.</p>
            <p class="text-xs">Add some smash burgers or iced matcha to get started!</p>
          </div>
        `;
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="p-3.5 rounded-2xl bg-white dark:bg-[#1E1E1E] border-2 border-charcoal dark:border-[#F8F7F2] flex items-center justify-between gap-3">
          <div>
            <p class="font-extrabold text-sm">${item.name}</p>
            <p class="text-xs font-bold text-coral">₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</p>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-change-qty="${item.id}" data-qty-delta="-1" class="w-7 h-7 rounded-lg bg-cream dark:bg-charcoal border border-charcoal dark:border-white font-extrabold">−</button>
            <span class="font-extrabold text-sm w-4 text-center">${item.qty}</span>
            <button type="button" data-change-qty="${item.id}" data-qty-delta="1" class="w-7 h-7 rounded-lg bg-matcha text-charcoal border border-charcoal font-extrabold">+</button>
          </div>
        </div>
      `,
    )
    .join("");
}
document.getElementById("openCartBtn").addEventListener("click", () => {
  cartOverlay.classList.remove("hidden");
});
document.getElementById("closeCartBtn").addEventListener("click", () => {
  cartOverlay.classList.add("hidden");
});
cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) cartOverlay.classList.add("hidden");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Add at least 1 item to your bag first!");
    return;
  }
  cart = [];
  updateCartUI();
  cartOverlay.classList.add("hidden");
  showToast("Order sent to the kitchen! Ready in 15 mins 🔥");
});
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  showToast(
    isDark
      ? "Switched to Late-Night Dark Mode 🌙"
      : "Switched to Daylight Cream Mode ☀️",
  );
});
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
});
document.getElementById("copyPromoBtn").addEventListener("click", () => {
  const code = document.getElementById("promoCodeText").textContent;
  const tempInput = document.createElement("input");
  tempInput.value = code;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  showToast(`Copied promo code "${code}"! 🎉`);
});
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value;
  const time = document.getElementById("visitTime").value;
  showToast(`Booth locked for ${name} (${count} guests) at ${time}! ⚡`);
  e.target.reset();
});
renderMenu("all");
updateCartUI();
