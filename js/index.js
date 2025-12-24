/* index page logic */

(function () {
  "use strict";

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
          <a class="btn btn-primary" data-action="book" href="booking.html">احجز الآن</a>
          <a class="btn" data-action="details" href="car-details.html">عرض التفاصيل</a>
        </div>
      </div>
    `;

    return article;
  }

  function setupScrollReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
  }

  function renderLatestCars() {
    const grid = document.getElementById("latestCarsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    const cars = window.CarRent.getCars().slice(0, 3);
    cars.forEach((car) => grid.appendChild(buildCard(car)));
  }

  function wireCards() {
    const cards = document.querySelectorAll("[data-car-id]");
    cards.forEach((card) => {
      const carId = card.getAttribute("data-car-id");
      if (!carId) return;

      const detailsLink = card.querySelector('a[data-action="details"]');
      const bookLink = card.querySelector('a[data-action="book"]');

      if (detailsLink) {
        detailsLink.href = `car-details.html?id=${encodeURIComponent(carId)}`;
        detailsLink.addEventListener("click", () => window.CarRent.setSelectedCarId(carId));
      }

      if (bookLink) {
        bookLink.href = `booking.html?id=${encodeURIComponent(carId)}`;
        bookLink.addEventListener("click", () => window.CarRent.setSelectedCarId(carId));
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderLatestCars();
    wireCards();
    setupScrollReveal();
  });
})();
