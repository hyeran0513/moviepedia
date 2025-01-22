export const createYearOptions = (selectId, startYear = 1900) => {
  const currentYear = new Date().getFullYear();
  const yearSelect = document.getElementById(selectId);

  if (!yearSelect) return;

  for (let year = currentYear; year >= startYear; year--) {
    const option = document.createElement("option");

    option.value = year;
    option.textContent = year;

    yearSelect.appendChild(option);
  }
};
