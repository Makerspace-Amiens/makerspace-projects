(function () {
  const searchInput = document.getElementById("search-input");
  const yearFilter = document.getElementById("year-filter");
  const projectFilter = document.getElementById("project-filter");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const resultCount = document.getElementById("result-count");
  const noResults = document.getElementById("no-results");

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const year = yearFilter.value;
    const project = projectFilter.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesYear = !year || card.dataset.year === year;
      const matchesProject = !project || card.dataset.project === project;
      const visible = matchesQuery && matchesYear && matchesProject;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    resultCount.textContent = `${visibleCount} projet${visibleCount === 1 ? "" : "s"}`;
    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
  projectFilter.addEventListener("change", applyFilters);

  applyFilters();
})();
