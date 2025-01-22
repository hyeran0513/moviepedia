import { displayCards } from "../card/card-display.js";
import { currentIndex, itemsPerPage } from "../card/card.js";

export const handleMoreButton = (data, type) => {
  const btnMore = document.querySelector(".btn-more");

  if (type === "favorite") {
    btnMore.style.display =
      currentIndex >= data.length || data.length <= itemsPerPage
        ? "none"
        : "block";

    btnMore.addEventListener("click", () => {
      currentIndex += itemsPerPage;
      displayCards(data, type);

      if (currentIndex >= data.length) {
        btnMore.style.display = "none";
      }
    });
  } else {
    btnMore.style.display = "none";
  }
};
