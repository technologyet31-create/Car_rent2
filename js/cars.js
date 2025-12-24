/* cars listing page logic */

(function () {
  "use strict";

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildCard(car) {
    const article = document.createElement("article");
    article.className = "card card-flip";
    article.setAttribute("data-car-id", car.id);

    const name = escapeHtml(car.name);
    const category = escapeHtml(car.category);
    const transmission = escapeHtml(car.transmission);
    const fuel = escapeHtml(car.fuel);
    const description = escapeHtml(car.description);
    const year = escapeHtml(car.year);
    const seats = escapeHtml(car.seats);
    const pricePerDay = escapeHtml(car.pricePerDay);
    const img = escapeHtml(car.img);

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

    return article;
  }

  function renderCars() {
    const grid = document.getElementById("carsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const cars = window.CarRent.getCars();
    cars.forEach((car) => grid.appendChild(buildCard(car)));
  }

  function wireCards() {
    const cards = document.querySelectorAll("[data-car-id]");
    cards.forEach((card) => {
      const carId = card.getAttribute("data-car-id");
      if (!carId) return;

      const detailsLinks = card.querySelectorAll('a[data-action="details"]');
      const bookLinks = card.querySelectorAll('a[data-action="book"]');

      detailsLinks.forEach((detailsLink) => {
        detailsLink.href = `car-details.html?id=${encodeURIComponent(carId)}`;
        detailsLink.addEventListener("click", () => window.CarRent.setSelectedCarId(carId));
      });

      bookLinks.forEach((bookLink) => {
        bookLink.href = `booking.html?id=${encodeURIComponent(carId)}`;
        bookLink.addEventListener("click", () => window.CarRent.setSelectedCarId(carId));
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCars();
    wireCards();
  });
})();
