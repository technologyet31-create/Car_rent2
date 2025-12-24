/* Admin dashboard logic
   - Protects access by checking a demo `adminLoggedIn` flag in localStorage.
   - Provides UI to add/update/delete cars using `window.CarRent` helpers.
   - Persists changes via localStorage through `js/common.js`.
*/

(function () {
  "use strict";

  // Simple DOM helper
  function $(id) {
    return document.getElementById(id);
  }

  // Small helper to show messages to the admin user.
  function showMessage(text, isError) {
    const el = document.querySelector(".admin-message");
    if (!el) return;
    el.textContent = text || "";
    el.style.color = isError ? "#b00020" : "#066f00";
  }

  // Ensure the demo admin is logged in (this is intentionally simple).
  const isAdmin = localStorage.getItem("adminLoggedIn");
  if (!isAdmin) {
    // Redirect to a login page (keeps the demo simple).
    window.location.href = "admin-login.html";
    return;
  }

  let editingCarId = null;

  function setEditingState(id) {
    // Toggle editing state and update UI labels accordingly.
    editingCarId = id || null;
    const title = document.querySelector(".admin-form-title");
    if (title) title.textContent = editingCarId ? "تعديل السيارة" : "إضافة سيارة جديدة";
    const saveBtn = $("adminSaveCar");
    if (saveBtn) saveBtn.textContent = editingCarId ? "حفظ التعديل" : "إضافة";
  }

  function fillFormFromCar(car) {
    // Populate form fields from the given car object.
    if (!car) return;
    if ($("adminCarName")) $("adminCarName").value = car.name || "";
    if ($("adminCarYear")) $("adminCarYear").value = car.year || "";
    if ($("adminCarPrice")) $("adminCarPrice").value = car.pricePerDay || "";
    if ($("adminCarCategory")) $("adminCarCategory").value = car.category || "Economy";
    if ($("adminCarImage")) $("adminCarImage").value = car.img || "";
    if ($("adminCarSeats")) $("adminCarSeats").value = car.seats || "";
    if ($("adminCarLocation")) $("adminCarLocation").value = car.locationUrl || "";
  }

  // Render the cars table in the admin UI.
  function renderCarsTable() {
    const cars = window.CarRent.getCars();
    const tbody = document.querySelector(".table-card tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    cars.forEach((car) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="معرف">${car.id}</td>
        <td data-label="اسم">${car.name}</td>
        <td data-label="الفئة">${car.category}</td>
        <td data-label="السنة">${car.year}</td>
        <td data-label="السعر/اليوم">${car.pricePerDay}</td>
        <td data-label="المقاعد">${car.seats || ""}</td>
        <td data-label="الموقع">${car.locationUrl ? "معرف" : "-"}</td>
        <td data-label="إجراءات">
          <button type="button" class="status" data-action="edit" data-id="${car.id}">تعديل</button>
          <button type="button" class="status" data-action="delete" data-id="${car.id}">حذف</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  function onSaveCar() {
    // Clear any previous message and prepare to collect values.
    showMessage("", false);

    const wasEditing = Boolean(editingCarId);

    const name = $("adminCarName")?.value || "";
    const year = $("adminCarYear")?.value || "";
    const price = $("adminCarPrice")?.value || "";
    const category = $("adminCarCategory")?.value || "Economy";
    const img = $("adminCarImage")?.value || "";
    const seats = $("adminCarSeats")?.value || "";
    const locationUrl = $("adminCarLocation")?.value || "";

    // Normalize and validate the provided Google Maps embed/location.
    const locationText = String(locationUrl || "").trim();
    let finalLocation = "";
    if (locationText) {
      const lower = locationText.toLowerCase();
      const hasIframe = lower.includes("<iframe");
      const hasEmbed = locationText.includes("/maps/embed") || locationText.includes("google.com/maps/embed");
      if (!hasIframe && !hasEmbed) {
        showMessage("الرجاء إدخال كود Google Maps Embed (iframe) أو رابط embed صالح.", true);
        return;
      }

      if (hasIframe) {
        // If admin pasted an iframe, try to extract the src attribute.
        const m = locationText.match(/src\s*=\s*['\"]([^'\"]+)['\"]/i);
        if (m && m[1]) {
          finalLocation = m[1];
        } else {
          // Fallback: pick the first URL-looking substring.
          const urlMatch = locationText.match(/https?:\/\/[^"]+/i);
          finalLocation = urlMatch ? urlMatch[0] : "";
        }
      } else {
        // It's already an embed/url string.
        finalLocation = locationText;
      }
    }

    // Build payload, normalizing numeric fields so `common.js` validators
    // receive consistent types. This ensures validation rules behave
    // consistently regardless of form input types.
    const payload = {
      name,
      year: Number(year),
      pricePerDay: Number(price),
      category,
      img,
      seats: Number(seats),
      locationUrl: finalLocation,
    };

    // Either update an existing car or add a new custom one.
    const result = editingCarId
      ? window.CarRent.updateCar(editingCarId, payload)
      : window.CarRent.addCar(payload);

    // If persistence failed, map known error codes to friendly messages.
    if (!result.ok) {
      const map = {
        ID_REQUIRED: "معرف السيارة غير صحيح.",
        NOT_FOUND: "السيارة غير موجودة.",
        NAME_REQUIRED: "اسم السيارة مطلوب.",
        INVALID_YEAR: "السنة غير صحيحة.",
        INVALID_PRICE: "السعر/اليوم غير صحيح.",
      };
      showMessage(map[result.error] || "تعذر حفظ السيارة.", true);
      return;
    }

    // Clear inputs after successful save.
    if ($("adminCarName")) $("adminCarName").value = "";
    if ($("adminCarYear")) $("adminCarYear").value = "";
    if ($("adminCarPrice")) $("adminCarPrice").value = "";
    if ($("adminCarImage")) $("adminCarImage").value = "";
    if ($("adminCarCategory")) $("adminCarCategory").value = "Economy";
    if ($("adminCarSeats")) $("adminCarSeats").value = "";
    if ($("adminCarLocation")) $("adminCarLocation").value = "";

    setEditingState(null);
    showMessage(wasEditing ? "تم تحديث السيارة بنجاح." : "تمت إضافة السيارة بنجاح.", false);
    renderCarsTable();
  }

  // Wire up save button
  const addBtn = $("adminSaveCar");
  if (addBtn) addBtn.addEventListener("click", onSaveCar);

  // Delegate table actions (edit/delete)
  const table = document.querySelector(".table-card");
  if (table) {
    table.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const action = target.getAttribute("data-action");
      const id = target.getAttribute("data-id");
      if (!action || !id) return;

      if (action === "edit") {
        const car = window.CarRent.getCarById(id);
        if (!car) {
          showMessage("السيارة غير موجودة.", true);
          return;
        }
        fillFormFromCar(car);
        setEditingState(id);
        showMessage("أنت الآن في وضع التعديل.", false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (action === "delete") {
        const ok = confirm("هل تريد حذف هذه السيارة؟");
        if (!ok) return;
        window.CarRent.deleteCar(id);
        if (editingCarId === id) setEditingState(null);
        renderCarsTable();
        showMessage("تم حذف السيارة.", false);
      }
    });
  }

  // Initial render
  renderCarsTable();
})();
