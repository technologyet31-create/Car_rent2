/* Admin login page logic
   - Demo-only authentication for the admin dashboard.
   - Stores a simple flag in localStorage (`adminLoggedIn`) to simulate
   - an authenticated session. In production, use a real auth system.
*/

(function () {
  "use strict";

  // NOTE: Hard-coded for the static demo. Do NOT use these credentials in
  // real applications.
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  function showError(message) {
    const el = document.getElementById("loginError");
    if (!el) return;
    el.textContent = message;
    // Toggle visibility of the error container
    el.classList.toggle("is-hidden", !message);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("adminLoginForm");
    const usernameInput = document.getElementById("adminUsername");
    const passwordInput = document.getElementById("adminPassword");

    if (!form || !usernameInput || !passwordInput) return;

    // If already logged in, go straight to dashboard
    try {
      if (localStorage.getItem("adminLoggedIn") === "1") {
        window.location.href = "admin-dashboard.html";
        return;
      }
    } catch {
      // ignore
    }

    // Handle demo login submission; keep logic minimal and synchronous.
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      showError("");

      // Read credentials and compare with the demo constants above.
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // Compare against demo credentials and set a simple flag in storage.
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Mark the demo session as logged in and redirect to dashboard.
        try {
          localStorage.setItem("adminLoggedIn", "1");
        } catch {
          // ignore
        }
        window.location.href = "admin-dashboard.html";
        return;
      }

      // On failure show a friendly Arabic error and focus back to password.
      showError("بيانات الدخول غير صحيحة.");
      passwordInput.focus();
      passwordInput.select?.();
    });
  });
})();
