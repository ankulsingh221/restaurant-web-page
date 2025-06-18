// cart.js with timeline-style live tracking and universal badge support

// Retrieve the cart from localStorage or initialize empty
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || {};
}

// Save the updated cart back to localStorage and notify listeners
function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
}

// Display the cart items in the cart page table
function renderCartPage() {
  const cartTable = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");
  const timelineContainer = document.getElementById("timeline-container");
  const cart = getCart();

  let html = `
    <table class="table table-bordered align-middle">
      <thead class="bg-dark">
        <tr class="text-light">
          <th class="text-center">Item</th>
          <th class="text-center">Price</th>
          <th class="text-center">Quantity</th>
          <th class="text-center">Subtotal</th>
        </tr>
      </thead>
      <tbody>
  `;

  let total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const item = itemDataMap[id];
    if (qty > 0 && item) {
      const subtotal = item.price * qty;
      total += subtotal;

      html += `
        <tr>
          <td class="text-center">${item.name}</td>
          <td class="text-center">₹${item.price}</td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-dark border border-light rounded-3" onclick="updateCartQty(${id}, -1)">−</button>
              <span class="px-2" id="cart-qty-${id}">${qty}</span>
              <button class="btn btn-dark border border-light rounded-3" onclick="updateCartQty(${id}, 1)">+</button>
            </div>
          </td>
          <td class="text-center">₹${subtotal}</td>
        </tr>
      `;
    }
  });

  html += `</tbody></table>`;
  cartTable.innerHTML = html;
  totalSpan.textContent = total;

  updateCartBadge();
}

// Adjust quantity for a given item ID and reflect changes instantly
function updateCartQty(id, change) {
  const cart = getCart();
  if (!cart[id]) cart[id] = 0;
  cart[id] += change;
  if (cart[id] < 0) cart[id] = 0;

  setCart(cart);
  renderCartPage();
}

// Update the badge near cart icon in navbar (works on all pages)
function updateCartBadge() {
  const cart = getCart();
  const totalItems = Object.values(cart).reduce((sum, val) => sum + val, 0);
  let badge = document.getElementById("cart-badge");

  if (!badge) {
    const navCartLink = document.querySelector("a[href='cart.html']");
    if (navCartLink) {
      badge = document.createElement("span");
      badge.id = "cart-badge";
      badge.className = "position-absolute  badge rounded-pill bg-danger";
      badge.style.fontSize = "0.6rem";
      badge.style.minWidth = "16px";
      badge.style.padding = "4px 8px";
      badge.style.top = "20%";
      badge.style.left = "90%";
      navCartLink.style.position = "relative";
      navCartLink.appendChild(badge);
    }
  }

  if (badge) {
    badge.textContent = totalItems > 0 ? totalItems : "";
    badge.style.display = totalItems > 0 ? "inline-block" : "none";
  }
}

// Display a single timeline tracking below cart after placing order
function renderTimelineTracking() {
  const timelineSteps = [
    { icon: "✅", label: "Accepted" },
    { icon: "🍳", label: "Preparing" },
    { icon: "🛵", label: "Out for Delivery" },
    { icon: "🏁", label: "Delivered" }
  ];

  const container = document.getElementById("timeline-container");
  if (!container) return;

  container.innerHTML = `<div class="timeline d-flex justify-content-between align-items-center flex-wrap mt-4"></div>`;
  const timeline = container.querySelector(".timeline");

  timelineSteps.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "timeline-step text-center flex-fill px-2";
    stepDiv.innerHTML = `
      <div class="step-icon display-6">${step.icon}</div>
      <div class="step-label small">${step.label}</div>
    `;
    timeline.appendChild(stepDiv);
  });

  let activeIndex = 0;
  const steps = timeline.querySelectorAll(".timeline-step");
  const interval = setInterval(() => {
    steps.forEach((step, i) => {
      step.classList.remove("active", "completed");
      if (i < activeIndex) step.classList.add("completed");
      else if (i === activeIndex) step.classList.add("active");
    });
    activeIndex++;
    if (activeIndex >= timelineSteps.length) clearInterval(interval);
  }, 3000);
}

// Submit order and reset cart with a success message
function placeOrder() {
  const cart = getCart();
  const orderData = [];

  Object.entries(cart).forEach(([id, qty]) => {
    const item = itemDataMap[id];
    if (qty > 0 && item) {
      orderData.push({
        itemId: id,
        itemName: item.name,
        quantity: qty,
        price: item.price
      });
    }
  });

  if (orderData.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  console.log("✅ Order submitted:", orderData);
  alert("🎉 Your order has been placed successfully!");

  renderCartPage();
  renderTimelineTracking();

  setTimeout(() => {
    setCart({});
    updateCartBadge();
    const container = document.getElementById("timeline-container");
    if (container) container.innerHTML = "";
  }, 16000);
}

// Initialize cart rendering on load
window.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  updateCartBadge();
});

// Update on cart change from other pages
window.addEventListener("cartUpdated", () => {
  renderCartPage();
  updateCartBadge();
});
