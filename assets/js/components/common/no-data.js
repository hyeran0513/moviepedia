export const handleNoData = (data) => {
  const noData = document.querySelector(".no-data");

  noData.style.display = !data || data.length === 0 ? "flex" : "none";
};
