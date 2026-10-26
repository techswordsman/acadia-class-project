document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  const feedback = document.querySelector("#formFeedback");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      feedback.textContent = "Please correct the highlighted fields.";
      feedback.className = "mt-3 text-danger";
      form.querySelector(":invalid")?.focus();
      return;
    }

    feedback.textContent =
      "Thank you for your submission! You'll hear from us soon.";

    feedback.className = "mt-3 text-success";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  });

  form.addEventListener("input", () => {
    if (feedback.textContent) {
      feedback.textContent = "";
      feedback.className = "mt-3";
    }
  });
});
