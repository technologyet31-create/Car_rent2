/* car details page logic */

(function () {
  "use strict";

  function extractIframeSrc(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    if (!text.toLowerCase().includes("<iframe")) return "";
    const match = text.match(/src\s*=\s*["']([^"']+)["']/i);
    return match && match[1] ? match[1].trim() : "";
  }

  function toYouTubeEmbedUrl(link) {
    if (!link) return "";
    const url = String(link).trim();
    if (!url) return "";
    // Embed-only requirement
    if (!url.includes("youtube.com/embed")) return "";
    return url;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value;
  }

  function setValue(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = value;
  }

  function setImage(id, src, alt) {
    const el = document.getElementById(id);
    if (!el) return;
    el.src = src;
    el.alt = alt;
  }

  function renderCar(car) {
    setImage("carImage", car.img, `${car.name} ${car.year}`);
    setText("carTitle", `${car.name} ${car.year}`);
    setText("carCategory", car.category);
    setText("carMetaTransmission", car.transmission);
    setText("carMetaFuel", car.fuel);
    setText("carMetaSeats", `${car.seats} مقاعد`);
    setText("carPrice", `${car.pricePerDay} `);

    setValue("specModel", String(car.year));
    setValue("specPrice", `${car.pricePerDay} د.ل`);
    setValue("specTransmission", car.transmission);
    setValue("specSeats", String(car.seats));
    setValue("specDescription", car.description);

    const bookLink = document.getElementById("bookNowLink");
    if (bookLink) {
      bookLink.href = `booking.html?id=${encodeURIComponent(car.id)}`;
      bookLink.addEventListener("click", () => window.CarRent.setSelectedCarId(car.id));
    }

    // Car location (optional)
    const locationCard = document.getElementById("carLocationCard");
    const locationMap = document.getElementById("carLocationMap");
    const locationLink = document.getElementById("carLocationLink");
    const locationUrlRaw = (car.locationUrl || "").trim();
    const locationSrc = extractIframeSrc(locationUrlRaw);
    const locationEmbed = toGoogleMapsEmbedUrl(locationSrc);

    if (locationCard && locationMap && locationLink && locationEmbed) {
      locationCard.classList.remove("is-hidden");
      locationMap.src = locationEmbed;
      locationLink.href = locationSrc;
    } else if (locationCard) {
      locationCard.classList.add("is-hidden");
    }

    // Car video (optional)
    const videoCard = document.getElementById("carVideoCard");
    const videoEmbed = document.getElementById("carVideoEmbed");
    const videoUrlRaw = (car.videoUrl || "").trim();
    const videoSrc = extractIframeSrc(videoUrlRaw);
    const videoEmbedUrl = toYouTubeEmbedUrl(videoSrc);

    if (videoCard && videoEmbed && videoEmbedUrl) {
      videoCard.classList.remove("is-hidden");
      videoEmbed.src = videoEmbedUrl;
    } else if (videoCard) {
      videoCard.classList.add("is-hidden");
    }

    // Description
    setText("carDescriptionText", car.description || "لا يوجد وصف متاح.");

    // Features
    setText("featureTransmission", car.transmission);
    setText("featureFuel", car.fuel);
    setText("featureSeats", `${car.seats} مقاعد`);
    setText("featureCategory", car.category);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const id = window.CarRent.getSelectedCarId();
    const allCars = window.CarRent.getCars();
    const car = window.CarRent.getCarById(id) || allCars[0];
    window.CarRent.setSelectedCarId(car.id);
    renderCar(car);
  });
})();
