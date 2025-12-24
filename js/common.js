/* Shared helpers + data (no libraries) */

(function () {
  "use strict";

  const BASE_CARS = [
    {
      id: "corolla-2023",
      name: "Toyota Corolla",
      year: 2023,
      category: "Economy",
      pricePerDay: 120,
      img: "img/corolla.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "سيارة اقتصادية ممتازة للمدينة، مكيف قوي، قيادة سلسة.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52260.52264823448!2d13.15670828853836!3d32.8591304152186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8ecf3d9c07dc9%3A0x3d444e433d95528c!2sTripoli%20International%20Stadium!5e0!3m2!1sen!2sly!4v1766541545992!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "elantra-2022",
      name: "Hyundai Elantra",
      year: 2022,
      category: "Sedan",
      pricePerDay: 140,
      img: "img/elantra.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "سيدان مريحة للطرق اليومية، مساحة جيدة، واستهلاك ممتاز.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8ed23c0f81d43%3A0x8937573474492700!2sGrand%20Park%20Tuesday%20Market!5e0!3m2!1sen!2sly!4v1766541534027!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "sportage-2021",
      name: "Kia Sportage",
      year: 2021,
      category: "SUV",
      pricePerDay: 220,
      img: "img/sportage.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 7,
      description: "SUV عائلية مع مساحة واسعة وأداء قوي للرحلات.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a891c2a543aae3%3A0x757e99b685e33d1e!2sMitiga%20International%20Airport!5e0!3m2!1sen!2sly!4v1766541521200!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "nissan-sentra-2020",
      name: "Nissan Sentra",
      year: 2020,
      category: "Sedan",
      pricePerDay: 130,
      img: "img/campbell-3ZUsNJhi_Ik-unsplash.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "سيدان عملية للاستخدام اليومي، مريحة واقتصادية.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a89353b73f447d%3A0xf90e094e46a8ca98!2zVHJpcG9saSBVbml2ZXJzaXR5INis2KfZhdi52Kkg2LfYsdin2KjZhNiz!5e0!3m2!1sen!2sly!4v1766541511956!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "toyota-yaris-2019",
      name: "Toyota Yaris",
      year: 2019,
      category: "Economy",
      pricePerDay: 110,
      img: "img/josh-berquist-_4sWbzH5fp8-unsplash.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "اقتصادية خفيفة للمدينة، سهلة الركن ومناسبة للميزانية.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a89321a2b3c3c3%3A0x536bebd6c7416518!2sAl-Ittihad%20Club!5e0!3m2!1sen!2sly!4v1766541505545!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "honda-civic-2021",
      name: "Honda Civic",
      year: 2021,
      category: "Sedan",
      pricePerDay: 160,
      img: "img/automobile-details-close-up-new-car.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "سيدان رياضية مريحة بثبات ممتاز على الطريق.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52260.52264823448!2d13.15670828853836!3d32.8591304152186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8ecf3d9c07dc9%3A0x3d444e433d95528c!2sTripoli%20International%20Stadium!5e0!3m2!1sen!2sly!4v1766541545992!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "toyota-rav4-2022",
      name: "Toyota RAV4",
      year: 2022,
      category: "SUV",
      pricePerDay: 260,
      img: "img/view-3d-car.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "SUV عملية للرحلات، مساحة تخزين جيدة وارتفاع مناسب.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8ed23c0f81d43%3A0x8937573474492700!2sGrand%20Park%20Tuesday%20Market!5e0!3m2!1sen!2sly!4v1766541534027!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "kia-seltos-2023",
      name: "Kia Seltos",
      year: 2023,
      category: "SUV",
      pricePerDay: 240,
      img: "img/view-3d-car (1).webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "SUV مدمجة بتجهيزات ممتازة للاستخدام اليومي والرحلات.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a891c2a543aae3%3A0x757e99b685e33d1e!2sMitiga%20International%20Airport!5e0!3m2!1sen!2sly!4v1766541521200!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "hyundai-tucson-2021",
      name: "Hyundai Tucson",
      year: 2021,
      category: "SUV",
      pricePerDay: 230,
      img: "img/2f046a63-c992-49c6-b1a7-1892a55d765a.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "SUV عائلية مريحة، مناسبة للمدينة والسفر.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a89353b73f447d%3A0xf90e094e46a8ca98!2zVHJpcG9saSBVbml2ZXJzaXR5INis2KfZhdi52Kkg2LfYsdin2KjZhNiz!5e0!3m2!1sen!2sly!4v1766541511956!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
    {
      id: "chevrolet-malibu-2020",
      name: "Chevrolet Malibu",
      year: 2020,
      category: "Sedan",
      pricePerDay: 170,
      img: "img/banner.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "سيدان واسعة ومريحة، مناسبة للطرق الطويلة.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d79887.05786051399!2d13.214620967377382!3d32.86067937323609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a89321a2b3c3c3%3A0x536bebd6c7416518!2sAl-Ittihad%20Club!5e0!3m2!1sen!2sly!4v1766541505545!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
       {
      id: "carrola-2020",
      name: "carrola-2022",
      year: 2020,
      category: "Sedan",
      pricePerDay: 170,
      img: "img/sportage.webp",
      transmission: "أوتوماتيك",
      fuel: "بنزين",
      seats: 5,
      description: "سيدان واسعة ومريحة، مناسبة للطرق الطويلة.",
      locationUrl:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52260.52264823448!2d13.15670828853836!3d32.8591304152186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a8ecf3d9c07dc9%3A0x3d444e433d95528c!2sTripoli%20International%20Stadium!5e0!3m2!1sen!2sly!4v1766541545992!5m2!1sen!2sly" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    },
  ];

  const CUSTOM_CARS_KEY = "customCars";
  const CAR_OVERRIDES_KEY = "carOverrides";
  const REMOVED_CAR_IDS_KEY = "removedCarIds";

  function safeJsonParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function loadCustomCars() {
    try {
      const raw = localStorage.getItem(CUSTOM_CARS_KEY);
      const list = safeJsonParse(raw || "[]", []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  function loadOverrides() {
    try {
      const raw = localStorage.getItem(CAR_OVERRIDES_KEY);
      const obj = safeJsonParse(raw || "{}", {});
      return obj && typeof obj === "object" ? obj : {};
    } catch {
      return {};
    }
  }

  function saveOverrides(overrides) {
    try {
      localStorage.setItem(CAR_OVERRIDES_KEY, JSON.stringify(overrides));
    } catch {
      // ignore
    }
  }

  function loadRemovedIds() {
    try {
      const raw = localStorage.getItem(REMOVED_CAR_IDS_KEY);
      const list = safeJsonParse(raw || "[]", []);
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  }

  function saveRemovedIds(ids) {
    try {
      localStorage.setItem(REMOVED_CAR_IDS_KEY, JSON.stringify(ids));
    } catch {
      // ignore
    }
  }

  function saveCustomCars(cars) {
    try {
      localStorage.setItem(CUSTOM_CARS_KEY, JSON.stringify(cars));
    } catch {
      // ignore
    }
  }

  function getCars() {
    const custom = loadCustomCars();
    const overrides = loadOverrides();
    const removedIds = new Set(loadRemovedIds());
    const seen = new Set();
    const merged = [];

    [...BASE_CARS, ...custom].forEach((car) => {
      if (!car || !car.id) return;
      if (seen.has(car.id)) return;
      if (removedIds.has(car.id)) return;
      seen.add(car.id);

      const ov = overrides[car.id];
      if (ov && typeof ov === "object") {
        merged.push({ ...car, ...ov, id: car.id });
      } else {
        merged.push(car);
      }
    });

    return merged;
  }

  function updateCar(carId, updates) {
    if (!carId) return { ok: false, error: "ID_REQUIRED" };
    const existing = getCarById(carId);
    if (!existing) return { ok: false, error: "NOT_FOUND" };

    const next = { ...existing };

    if (typeof updates?.name === "string") next.name = updates.name.trim();
    if (updates?.year !== undefined) next.year = Number(updates.year);
    if (updates?.pricePerDay !== undefined) next.pricePerDay = Number(updates.pricePerDay);
    if (typeof updates?.category === "string") next.category = updates.category.trim() || next.category;
    if (typeof updates?.img === "string") next.img = updates.img.trim() || next.img;
    if (updates?.seats !== undefined) next.seats = Number(updates.seats);
    if (typeof updates?.transmission === "string") next.transmission = updates.transmission.trim();
    if (typeof updates?.fuel === "string") next.fuel = updates.fuel.trim();
    if (typeof updates?.description === "string") next.description = updates.description.trim();
    if (typeof updates?.locationUrl === "string") next.locationUrl = updates.locationUrl.trim();

    if (!next.name) return { ok: false, error: "NAME_REQUIRED" };
    if (!Number.isFinite(next.year) || next.year < 1950 || next.year > 2100) return { ok: false, error: "INVALID_YEAR" };
    if (!Number.isFinite(next.pricePerDay) || next.pricePerDay <= 0) return { ok: false, error: "INVALID_PRICE" };

    const overrides = loadOverrides();
    overrides[carId] = {
      name: next.name,
      year: next.year,
      category: next.category,
      pricePerDay: next.pricePerDay,
      img: next.img,
      seats: next.seats,
      transmission: next.transmission,
      fuel: next.fuel,
      description: next.description,
      locationUrl: next.locationUrl,
    };
    saveOverrides(overrides);
    return { ok: true };
  }

  function deleteCar(carId) {
    if (!carId) return { ok: false, error: "ID_REQUIRED" };

    // Remove from custom cars if it exists there
    const custom = loadCustomCars();
    const remainingCustom = custom.filter((c) => c && c.id !== carId);
    if (remainingCustom.length !== custom.length) {
      saveCustomCars(remainingCustom);
    } else {
      // If it's a base car, mark as removed
      const removed = new Set(loadRemovedIds());
      removed.add(carId);
      saveRemovedIds([...removed]);
    }

    // Clean override if present
    const overrides = loadOverrides();
    if (overrides[carId]) {
      delete overrides[carId];
      saveOverrides(overrides);
    }

    return { ok: true };
  }

  function slugify(text) {
    return String(text || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60);
  }

  function ensureUniqueId(desiredId) {
    const all = getCars();
    const used = new Set(all.map((c) => c.id));
    if (!used.has(desiredId)) return desiredId;
    let i = 2;
    while (used.has(`${desiredId}-${i}`)) i += 1;
    return `${desiredId}-${i}`;
  }

  function addCar(input) {
    const name = String(input?.name || "").trim();
    const year = Number(input?.year);
    const pricePerDay = Number(input?.pricePerDay);
    const category = String(input?.category || "").trim() || "Economy";

    if (!name) return { ok: false, error: "NAME_REQUIRED" };
    if (!Number.isFinite(year) || year < 1950 || year > 2100) return { ok: false, error: "INVALID_YEAR" };
    if (!Number.isFinite(pricePerDay) || pricePerDay <= 0) return { ok: false, error: "INVALID_PRICE" };

    const baseId = slugify(`${name}-${year}`) || `car-${Date.now()}`;
    const id = ensureUniqueId(baseId);

    const car = {
      id,
      name,
      year,
      category,
      pricePerDay,
      img: String(input?.img || "").trim() || "img/corolla.webp",
      transmission: String(input?.transmission || "").trim() || "أوتوماتيك",
      fuel: String(input?.fuel || "").trim() || "بنزين",
      seats: Number.isFinite(Number(input?.seats)) ? Number(input.seats) : 5,
      description: String(input?.description || "").trim() || "",
      locationUrl: String(input?.locationUrl || "").trim() || "",
    };

    const current = loadCustomCars();
    current.push(car);
    saveCustomCars(current);
    return { ok: true, car };
  }

  function getQueryParam(key) {
    try {
      const params = new URLSearchParams(window.location.search);
      const value = params.get(key);
      return value && value.trim() ? value.trim() : null;
    } catch {
      return null;
    }
  }

  function setSelectedCarId(id) {
    if (!id) return;
    try {
      localStorage.setItem("selectedCarId", id);
    } catch {
      // ignore
    }
  }

  function getSelectedCarId() {
    const fromQuery = getQueryParam("id");
    if (fromQuery) return fromQuery;
    try {
      const fromStorage = localStorage.getItem("selectedCarId");
      return fromStorage && fromStorage.trim() ? fromStorage.trim() : null;
    } catch {
      return null;
    }
  }

  function getCarById(id) {
    if (!id) return null;
    return getCars().find((c) => c.id === id) || null;
  }

  function formatCarLabel(car) {
    return `${car.name} ${car.year} — ${car.pricePerDay} د.ل/يوم`;
  }

  window.CarRent = {
    CARS: BASE_CARS,
    getCars,
    addCar,
    updateCar,
    deleteCar,
    getQueryParam,
    setSelectedCarId,
    getSelectedCarId,
    getCarById,
    formatCarLabel,
  };
})();
