(function () {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  function updateVisibility() {
    button.hidden = window.scrollY < 400;
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
