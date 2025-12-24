/* Cars listing page logic
   - Renders flip-style cards for each car. Escapes HTML to avoid injection
   - when injecting car data into the DOM. Links include `id` as a query
   - parameter so other pages can read the selected car.
*/

(function () {
  "use strict";

  function escapeHtml(value) {
    // Normalize to string and replace characters that have special meaning
    // in HTML to their entity equivalents. This prevents stored values
    // from breaking out of intended text nodes when injected.
    return String(value ?? "")
      // Ampersand must be replaced first to avoid double-encoding.
      .replace(/&/g, "&amp;")
      // Less-than and greater-than prevent tag injection.
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Quote characters prevent attribute injection when used inside
      // double-quoted attributes.
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildCard(car) {
    const article = document.createElement("article");
    article.className = "card card-flip";
    article.setAttribute("data-car-id", car.id);

    // Prepare sanitized values for safe insertion into HTML below.
    // Each field is escaped to prevent accidental markup injection.
    const name = escapeHtml(car.name);
    const category = escapeHtml(car.category);
    const transmission = escapeHtml(car.transmission);
    const fuel = escapeHtml(car.fuel);
    const description = escapeHtml(car.description);
    const year = escapeHtml(car.year);
    const seats = escapeHtml(car.seats);
    const pricePerDay = escapeHtml(car.pricePerDay);
    const img = escapeHtml(car.img);

    // Build the card HTML. All interpolated values are escaped above to
    // avoid injecting unexpected markup from stored car data.
    article.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <div class="card-img"><img src="${img}" alt="${name}"></div>
          <div class="card-body">
            <div class="card-title"><span>${name} ${year}</span><span class="badge">${category}</span></div>
            <div class="meta"><span>${transmission}</span><span>${fuel}</span><span>${seats} مقاعد</span></div>
            <div class="price">${pricePerDay} <small>د.ل / يوم</small></div>
            <div class="card-actions">
              <a class="btn btn-primary" data-action="book" href="booking.html">احجز الآن</a>
              <a class="btn" data-action="details" href="car-details.html">عرض التفاصيل</a>
            </div>
          </div>
        </div>

        <div class="card-face card-back" aria-hidden="true">
          <div class="card-back-head">
            <div class="card-title"><span>${name} ${year}</span><span class="badge">${category}</span></div>
            <div class="meta"><span>${transmission}</span><span>${fuel}</span><span>${seats} مقاعد</span></div>
          </div>
          <p class="card-brief">${description}</p>
          <div class="price">${pricePerDay} <small>د.ل / يوم</small></div>
          <div class="card-actions">
            <a class="btn btn-primary" data-action="book" href="booking.html">احجز الآن</a>
            <a class="btn" data-action="details" href="car-details.html">عرض التفاصيل</a>
          </div>
        </div>
      </div>
    `;

    // Return the fully built article element for insertion.
    return article;
  }

  // Render cars with optional filtering
  function renderCars(filter = {}) {
    const grid = document.getElementById("carsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    let cars = window.CarRent.getCars();
    // Apply filters if provided
    if (filter.query) {
      const q = filter.query.trim().toLowerCase();
      if (q) {
        cars = cars.filter(car =>
          (car.name && car.name.toLowerCase().includes(q)) ||
          (car.category && car.category.toLowerCase().includes(q)) ||
          (car.year && String(car.year).includes(q))
        );
      }
    }
    if (filter.category) {
      if (filter.category !== "") {
        cars = cars.filter(car => car.category === filter.category);
      }
    }
    if (filter.price) {
      if (filter.price === "أقل من 150") {
        cars = cars.filter(car => Number(car.pricePerDay) < 150);
      } else if (filter.price === "150 - 250") {
        cars = cars.filter(car => Number(car.pricePerDay) >= 150 && Number(car.pricePerDay) <= 250);
      } else if (filter.price === "أكثر من 250") {
        cars = cars.filter(car => Number(car.pricePerDay) > 250);
      }
    }
    cars.forEach((car) => grid.appendChild(buildCard(car)));
  }

  function wireCards() {
    const cards = document.querySelectorAll("[data-car-id]");
    cards.forEach((card) => {
      const carId = card.getAttribute("data-car-id");
      if (!carId) return;

      const detailsLinks = card.querySelectorAll('a[data-action="details"]');
      const bookLinks = card.querySelectorAll('a[data-action="book"]');

      // Set link targets and store selected id on click. Storing the id in
      // localStorage is a convenience so other pages can read the selection
      // even if the query string is lost. We encode the id for safe URLs.
      detailsLinks.forEach((detailsLink) => {
        detailsLink.href = `car-details.html?id=${encodeURIComponent(carId)}`;
        // On click also persist the selected id to localStorage for
        // convenience (other pages will prefer the query param first).
        detailsLink.addEventListener("click", () => window.CarRent.setSelectedCarId(carId));
      });

      bookLinks.forEach((bookLink) => {
        bookLink.href = `booking.html?id=${encodeURIComponent(carId)}`;
        // Same persistence for booking links.
        bookLink.addEventListener("click", () => window.CarRent.setSelectedCarId(carId));
      });
    });
  }

  // Setup search and filter listeners
  function setupSearchFilters() {
    const searchBar = document.querySelector(".search-bar");
    if (!searchBar) return;
    const input = searchBar.querySelector("input[type='text']");
    const selects = searchBar.querySelectorAll("select");
    const button = searchBar.querySelector("button[type='button']");

    function getFilter() {
      return {
        query: input ? input.value : "",
        category: selects[0] ? selects[0].value : "",
        price: selects[1] ? selects[1].value : ""
      };
    }

    function doFilter() {
      renderCars(getFilter());
      wireCards();
    }

    if (input) {
      input.addEventListener("input", doFilter);
    }
    selects.forEach(sel => sel.addEventListener("change", doFilter));
    if (button) {
      button.addEventListener("click", doFilter);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCars();
    wireCards();
    setupSearchFilters();
  });
})();
