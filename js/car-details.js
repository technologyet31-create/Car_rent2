/* Car details page logic
   - Reads the selected `id` (query or storage) and renders the car details.
   - Extracts map embed URLs safely from stored HTML snippets.
*/

(function () {
  "use strict";

  function extractIframeSrc(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    // Only treat the input as HTML if it looks like an iframe. Extract the
    // `src` attribute value if present so we can use it as an embed URL.
    if (!text.toLowerCase().includes("<iframe")) return "";
    // RegExp captures the first src="..." or src='...' occurrence.
    const match = text.match(/src\s*=\s*["']([^"']+)["']/i);
    return match && match[1] ? match[1].trim() : "";
  }

  function toGoogleMapsEmbedUrl(link) {
    if (!link) return "";
    const url = String(link).trim();
    if (!url) return "";
    // Embed-only requirement
    // Only accept `maps/embed` style URLs to avoid loading arbitrary sites.
    if (!url.includes("/maps/embed")) return "";
    return url;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    // Set plain text content (safe for user-visible fields).
    el.textContent = value;
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    // Set an input/textarea value. Caller should ensure `value` is a string
    // or primitive that properly renders in form controls.
    el.value = value;
  }

  function setImage(id, src, alt) {
    const el = document.getElementById(id);
    if (!el) return;
    // Update image `src` and `alt`. Do not insert user-supplied HTML here.
    el.src = src;
    el.alt = alt;
  }

  function renderCar(car) {
    // Visual header area
    setImage("carImage", car.img, `${car.name} ${car.year}`);
    setText("carTitle", `${car.name} ${car.year}`);
    setText("carCategory", car.category);

    // Meta chips
    setText("carMetaTransmission", car.transmission);
    setText("carMetaFuel", car.fuel);
    setText("carMetaSeats", `${car.seats} مقاعد`);
    setText("carPrice", `${car.pricePerDay} `);

    // Specs form (read-only inputs)
    setValue("specModel", String(car.year));
    setValue("specPrice", `${car.pricePerDay} د.ل`);
    setValue("specTransmission", car.transmission);
    setValue("specSeats", String(car.seats));
    setValue("specDescription", car.description);

    const bookLink = document.getElementById("bookNowLink");
    // Booking action: ensure the link points to the booking page for this
    // car and persist selection if the user clicks the link.
    if (bookLink) {
      bookLink.href = `booking.html?id=${encodeURIComponent(car.id)}`;
      bookLink.addEventListener("click", () => window.CarRent.setSelectedCarId(car.id));
    }

    // Car location (optional)
    // Map handling: extract a usable embed URL from stored HTML or a
    // direct embed link.
    // Prepare map/embed if available. We accept either an iframe snippet or
    // a direct embed link stored in `locationUrl` and extract a safe embed.
    const locationCard = document.getElementById("carLocationCard");
    const locationMap = document.getElementById("carLocationMap");
    const locationLink = document.getElementById("carLocationLink");
    const locationUrlRaw = (car.locationUrl || "").trim();
    const locationSrc = extractIframeSrc(locationUrlRaw);
    const locationEmbed = toGoogleMapsEmbedUrl(locationSrc);

    // Show the map card only when a valid embed URL is available.
    if (locationCard && locationMap && locationLink && locationEmbed) {
      locationCard.classList.remove("is-hidden");
      locationMap.src = locationEmbed;
      locationLink.href = locationSrc;
    } else if (locationCard) {
      locationCard.classList.add("is-hidden");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = window.CarRent.getSelectedCarId();
    const allCars = window.CarRent.getCars();
    const car = window.CarRent.getCarById(id) || allCars[0];
    window.CarRent.setSelectedCarId(car.id);
    renderCar(car);
  });
})();
