/* index page logic
   - Simplified: embed link `href` with `id` directly when creating cards.
   - Removed extra click handlers that only mirrored the query param (redundant).
   - Kept scroll-reveal using IntersectionObserver (CSS handles animation styles).
*/

(function () {
  "use strict";

  // Build a single car card element. Link URLs already include the car `id` so
  // pages can read `id` from the query string (no extra JS side-effects needed).
  function buildCard(car) {
    const article = document.createElement("article");
    article.className = "card reveal";
    article.setAttribute("data-car-id", car.id);

    article.innerHTML = `
      <div class="card-img"><img src="${car.img}" alt="${car.name}" loading="lazy" decoding="async"></div>
      <div class="card-body">
        <div class="card-title">
          <span>${car.name} ${car.year}</span>
          <span class="badge">${car.category}</span>
        </div>
        <div class="meta"><span>${car.transmission}</span><span>${car.fuel}</span><span>${car.seats} مقاعد</span></div>
        <div class="price">${car.pricePerDay} <small>د.ل / يوم</small></div>
        <div class="card-actions">
          <!-- Embed the car id in the href so other pages read it from the URL -->
          <a class="btn btn-primary" data-action="book" href="booking.html?id=${encodeURIComponent(car.id)}">احجز الآن</a>
          <a class="btn" data-action="details" href="car-details.html?id=${encodeURIComponent(car.id)}">عرض التفاصيل</a>
        </div>
      </div>
    `;

    // Return a standalone DOM node that can be appended to any grid.
    return article;
  }

  // Lightweight scroll reveal: elements with `.reveal` get `.in-view` added when
  // they enter the viewport. The visual animation is handled in CSS `.reveal`.
  function setupScrollReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      // Older browsers: reveal immediately without animation
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }

    // IntersectionObserver marks reveal elements as `in-view` when they
    // reach the viewport. The CSS `.reveal.in-view` class triggers the
    // transition defined in `css/hero.css`.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          // When element enters viewport, add class to kick off CSS animation
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
  }

  // Render the latest cars into the grid.
  function renderLatestCars() {
    const grid = document.getElementById("latestCarsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const cars = window.CarRent.getCars().slice(0, 3);
    // Create and append cards. Minimal DOM operations: build node then append.
    // Each card's links include the `id` so other pages can access it via URL.
    cars.forEach((car) => grid.appendChild(buildCard(car)));
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderLatestCars();
    setupScrollReveal();
  });
})();
