import {
  displayCards,
  currentIndex,
  itemsPerPage,
  setCurrentIndex,
} from "../card/card-favorite.js";

export const handleMoreButton = (data) => {
  const btnMore = document.querySelector(".btn-more");

  btnMore.style.display =
    currentIndex >= data.length || data.length <= itemsPerPage
      ? "none"
      : "block";

  btnMore.addEventListener("click", () => {
    setCurrentIndex(currentIndex + itemsPerPage);
    displayCards(data);

    if (currentIndex >= data.length) {
      btnMore.style.display = "none";
    }
  });
};
