(function () {
  const searchInput = document.getElementById("search-input");
  const yearFilter = document.getElementById("year-filter");
  const topicFilter = document.getElementById("topic-filter");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const resultCount = document.getElementById("result-count");
  const noResults = document.getElementById("no-results");

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const year = yearFilter.value;
    const topic = topicFilter ? topicFilter.value.toLowerCase() : "";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesYear = !year || card.dataset.year === year;
      const cardTopics = card.dataset.topics ? card.dataset.topics.split(",") : [];
      const matchesTopic = !topic || cardTopics.includes(topic);
      const visible = matchesQuery && matchesYear && matchesTopic;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    resultCount.textContent = `${visibleCount} projet${visibleCount === 1 ? "" : "s"}`;
    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
  if (topicFilter) topicFilter.addEventListener("change", applyFilters);

  applyFilters();

  // Mode d'affichage : grille / liste / liste + image
  const cardGrid = document.getElementById("card-grid");
  const viewSwitcher = document.getElementById("view-switcher");
  const VIEW_CLASSES = ["view-grid", "view-list", "view-list-image"];
  const STORAGE_KEY = "projects-view-mode";

  function setView(view) {
    cardGrid.classList.remove(...VIEW_CLASSES);
    cardGrid.classList.add(`view-${view}`);
    viewSwitcher.querySelectorAll("button").forEach((button) => {
      const isActive = button.dataset.view === view;
      button.classList.toggle("is-primary", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    localStorage.setItem(STORAGE_KEY, view);
  }

  if (viewSwitcher) {
    viewSwitcher.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-view]");
      if (button) setView(button.dataset.view);
    });
    setView(localStorage.getItem(STORAGE_KEY) || "grid");
  }
})();
