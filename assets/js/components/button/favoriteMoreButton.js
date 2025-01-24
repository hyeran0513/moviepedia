import {
  displayCards,
  getPageState,
  setCurrentIndex,
} from "../card/cardFavorite.js";

export const handleMoreButton = (data) => {
  const btnMore = document.querySelector(".btn-more");

  if (!btnMore) return;

  // 페이지 상태 가져오기
  let { currentIndex, itemsPerPage, isFiltered, filteredData } = getPageState();

  // 더보기 버튼 초기 상태 처리
  const targetData = isFiltered ? filteredData : data;

  btnMore.style.display =
    currentIndex + itemsPerPage >= targetData.length ? "none" : "block";

  btnMore.addEventListener("click", () => {
    currentIndex += itemsPerPage;
    setCurrentIndex(currentIndex);

    displayCards(targetData, isFiltered ? "filter" : "favorite");

    // 더보기 버튼 숨기기
    if (currentIndex + itemsPerPage >= targetData.length) {
      btnMore.style.display = "none";
    }
  });
};
