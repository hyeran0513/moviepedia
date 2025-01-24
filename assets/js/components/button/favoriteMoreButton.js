import {
  displayCards,
  getPageState,
  setCurrentIndex,
} from "../card/cardFavorite.js";

export const handleMoreButton = () => {
  const btnMore = document.querySelector(".btn-more");

  if (!btnMore) return;

  btnMore.addEventListener("click", () => {
    const { currentIndex, itemsPerPage, isFiltered, filteredData } =
      getPageState();

    // 현재 인덱스 업데이트
    const newIndex = currentIndex + itemsPerPage;
    setCurrentIndex(newIndex);

    // 필터링된 데이터 여부에 따라 대상 데이터 결정
    const targetData = isFiltered
      ? filteredData
      : JSON.parse(sessionStorage.getItem("favorites")) || [];

    // 카드 추가 표시
    displayCards(targetData);

    // 더보기 버튼 상태 업데이트
    if (newIndex + itemsPerPage >= targetData.length) {
      btnMore.style.display = "none";
    }
  });
};
