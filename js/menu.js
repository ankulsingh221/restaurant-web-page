// menu.js

// Sample static data to simulate menu from backend
const mockMenu = [
  {
    id: 1,
    name: "Chicken Burger",
    price: 115,
    imageUrl: "./img/bg-hero.jpg",
    description: "Juicy grilled chicken with crispy veggies & sauce."
  },
  {
    id: 2,
    name: "Veg Pizza",
    price: 220,
    imageUrl: "./img/menu-3.jpg",
    description: "Crispy crust loaded with fresh veggies and cheese."
  },
  {
    id: 3,
    name: "French Fries",
    price: 80,
    imageUrl: "./img/menu-6.jpg",
    description: "Golden, crunchy fries served hot with dip."
  },
  {
    id: 4,
    name: "Grilled Chicken",
    price: 150,
    imageUrl: "./img/menu-8.jpg",
    description: "Tender chicken grilled in herbs and spices."
  }
];

// Cache menu items by ID for quick lookup
const itemDataMap = {};
mockMenu.forEach(item => {
  itemDataMap[item.id] = item;
});

// Render menu cards on the page
function renderMenu(menuItems) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  menuItems.forEach(function (item) {
    const col = document.createElement("div");
    col.className = "col-md-6 mb-4";

    col.innerHTML = `
      <div class="d-flex align-items-start p-2 border shadow-sm h-100" style="border-radius: 10px">
        <img src="${item.imageUrl}" alt="${item.name}" class="rounded" style="width: 80px; height: 80px; object-fit: cover;" />
        <div class="ps-3 w-100">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <div class="text-dark fs-5 fw-bold">${item.name}</div>
            <div class="text-dark fw-bold">₹${item.price}</div>
            <div class="input-group input-group-sm quantity-control ms-3" style="width: 100px;" data-id="${item.id}">
              <button class="btn btn-dark border border-light btn-sm px-2" type="button">−</button>
              <input type="text" class="form-control form-control-sm text-center border-1" id="qty-${item.id}" value="0" readonly />
              <button class="btn btn-dark border border-light btn-sm px-2" type="button">+</button>
            </div>
          </div>
          <div class="small text-muted fst-italic">${item.description}</div>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  initQuantityLogic();
}

// Initialize plus/minus button functionality
function initQuantityLogic() {
  const quantityGroups = document.querySelectorAll(".quantity-control");
  const cart = getCart();

  quantityGroups.forEach(function (group) {
    const itemId = group.getAttribute("data-id");
    const minusBtn = group.children[0];
    const inputBox = group.children[1];
    const plusBtn = group.children[2];

    inputBox.value = cart[itemId] || 0;

    minusBtn.onclick = function () {
      let current = parseInt(inputBox.value);
      if (current > 0) {
        current--;
        inputBox.value = current;
        cart[itemId] = current;
        setCart(cart);
      }
    };

    plusBtn.onclick = function () {
      let current = parseInt(inputBox.value);
      current++;
      inputBox.value = current;
      cart[itemId] = current;
      setCart(cart);
    };
  });
}

// Update cart badge icon in navbar
function updateCartBadge() {
  const cart = getCart();
  let totalItems = Object.values(cart).reduce((acc, val) => acc + val, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// Initial rendering on DOM load
window.addEventListener("DOMContentLoaded", () => {
  renderMenu(mockMenu);
  updateCartBadge();
});

// Listen for cart updates to sync UI
window.addEventListener("cartUpdated", () => {
  updateCartBadge();
  renderMenu(mockMenu);
});