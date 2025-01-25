import { getPageState, loadMoreCards } from "../card/cardFavorite.js";
import { fetchMoviesByIds } from "../../api/movie.js";

export const handleMoreButton = () => {
  const btnMore = document.querySelector(".btn-more");

  if (!btnMore) return;

  btnMore.addEventListener("click", async () => {
    const { isFiltered, filteredData } = getPageState();

    // 필터링된 데이터 여부에 따라 대상 데이터 결정
    let targetData = isFiltered
      ? filteredData
      : JSON.parse(sessionStorage.getItem("favorites")) || [];

    if (!isFiltered) {
      const allMovies = await fetchMoviesByIds(targetData);
      targetData = allMovies;
    }

    // 카드 추가 표시
    loadMoreCards(targetData);
  });
};
