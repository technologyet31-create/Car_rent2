/* Booking page logic
   - Populates the car selector from `window.CarRent` and computes
   - the number of days and total price based on start/end dates.
   - Keeps UI responsive without external libs.
*/

(function () {
  "use strict";

  function $(id) {
    return document.getElementById(id);
  }

  function parseDate(value) {
    // Accepts a date-like string from an <input type="date"> and returns
    // a Date object or null when invalid. We avoid throwing here.
    if (!value) return null;
    const d = new Date(value);
    // `new Date(YYYY-MM-DD)` is parsed as UTC in some browsers; for our
    // simple day-level math this is acceptable. Return null for invalid.
    return Number.isNaN(d.getTime()) ? null : d;
  }

  function daysBetweenInclusive(start, end) {
    // Compute the difference in milliseconds and convert to days.
    // We use `Math.ceil` to count partial days as full days, matching
    // a typical rental-day computation where start==end => 1 day.
    const ms = end.getTime() - start.getTime();
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }

  function fillCarsSelect(selectEl) {
    selectEl.innerHTML = "";
    window.CarRent.getCars().forEach((car) => {
      const opt = document.createElement("option");
      opt.value = car.id;
      // Use the shared formatter so labels stay consistent across pages.
      opt.textContent = window.CarRent.formatCarLabel(car);
      selectEl.appendChild(opt);
    });
  }

  function recalc() {
    const carSelect = $("carSelect");
    const startDate = $("startDate");
    const endDate = $("endDate");
    const daysInput = $("daysInput");
    const totalInput = $("totalInput");

    if (!carSelect || !startDate || !endDate || !daysInput || !totalInput) return;

    const car = window.CarRent.getCarById(carSelect.value);
    const start = parseDate(startDate.value);
    const end = parseDate(endDate.value);

    // If required inputs are missing or invalid show placeholders.
    if (!car || !start || !end) {
      daysInput.value = "—";
      totalInput.value = "—";
      return;
    }

    // Compute inclusive days and update UI fields.
    const days = daysBetweenInclusive(start, end);
    // Display computed values; fall back to placeholder if zero.
    daysInput.value = days ? String(days) : "—";
    totalInput.value = days ? `${days * car.pricePerDay} د.ل` : "—";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const carSelect = $("carSelect");
    if (!carSelect) return;

    fillCarsSelect(carSelect);

    const selectedId = window.CarRent.getSelectedCarId();
    const allCars = window.CarRent.getCars();
    const initialCar = window.CarRent.getCarById(selectedId) || allCars[0];
    carSelect.value = initialCar.id;
    window.CarRent.setSelectedCarId(initialCar.id);

    const startDate = $("startDate");
    const endDate = $("endDate");

    carSelect.addEventListener("change", () => {
      window.CarRent.setSelectedCarId(carSelect.value);
      recalc();
    });

    if (startDate) startDate.addEventListener("change", recalc);
    if (endDate) endDate.addEventListener("change", recalc);

    const form = document.querySelector("form.form-card");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("تم إرسال طلب الحجز. سنتواصل معك قريباً.");
        form.reset();
        fillCarsSelect(carSelect);
        carSelect.value = initialCar.id;
        recalc();
      });
    }

    recalc();
  });
})();
