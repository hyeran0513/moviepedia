import { loadMoreCards } from "../card/cardResult.js";

export const handleMoreButton = (movieTitle, movieYear) => {
  const btnMore = document.querySelector(".btn-more");

  if (!btnMore) return;

  btnMore.addEventListener("click", async () => {
    loadMoreCards(movieTitle, movieYear);
  });
};
