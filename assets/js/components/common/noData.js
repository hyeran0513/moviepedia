export const handleNoData = (data, element) => {
  if (element) {
    element.style.display =
      !data ||
      data.length === 0 ||
      data === "Movie not found!" ||
      !data.movies ||
      data.movies.length === 0
        ? "flex"
        : "none";
  }
};
