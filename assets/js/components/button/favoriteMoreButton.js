import { getPageState, loadMoreCards } from "../card/cardFavorite.js";
import { getFavoriteMovies } from "../../services/favorites.js";

export const handleMoreButton = () => {
  const btnMore = document.querySelector(".btn-more");

  if (!btnMore) return;

  btnMore.addEventListener("click", async () => {
    // 현재 페이지 상태 가져오기
    const { isFiltered, filteredData } = getPageState();

    // 필터링 여부에 따라 대상 데이터 결정
    let targetData = isFiltered ? filteredData : await getFavoriteMovies();

    // 카드 추가 로드
    loadMoreCards(targetData);
  });
};
