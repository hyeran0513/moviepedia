import {
  displayCards,
  getPageState,
  setCurrentIndex,
} from "../card/card-favorite.js";

export const handleMoreButton = (data) => {
  const btnMore = document.querySelector(".btn-more");

  // 페이지 상태 가져오기
  const { currentIndex, itemsPerPage } = getPageState();

  // 더보기 버튼 초기 상태 처리
  btnMore.style.display =
    currentIndex + itemsPerPage >= data.length ? "none" : "block";

  btnMore.addEventListener("click", () => {
    // 현재 인덱스를 업데이트
    const newIndex = currentIndex + itemsPerPage;
    setCurrentIndex(newIndex);

    // 데이터 표시 업데이트
    displayCards(data);

    // 더보기 버튼 숨기기 조건
    if (newIndex + itemsPerPage >= data.length) {
      btnMore.style.display = "none";
    }
  });
};
