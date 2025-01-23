export const handleNoData = (data) => {
  const noData = document.querySelector(".no-data");

  if (noData) {
    noData.style.display = !data || data.length === 0 ? "flex" : "none";
  }

  const noSearchData = document.getElementById("searchNoData");

  if (noSearchData) {
    noSearchData.style.display = !data || data.length === 0 ? "flex" : "none";
  }
};
