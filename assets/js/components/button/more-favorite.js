import {
  displayCards,
  currentIndex,
  itemsPerPage,
  setCurrentIndex,
} from "../card/card-favorite.js";

export const handleMoreButton = (data) => {
  const btnMore = document.querySelector(".btn-more");

  // 더보기 버튼 초기 상태 처리
  btnMore.style.display =
    currentIndex + itemsPerPage >= data.length ? "none" : "block";

  btnMore.addEventListener("click", () => {
    // 현재 인덱스를 업데이트
    setCurrentIndex(currentIndex + itemsPerPage);

    // 데이터 표시 업데이트
    displayCards(data);

    // 더보기 버튼 숨기기 조건
    if (currentIndex + itemsPerPage >= data.length) {
      btnMore.style.display = "none";
    }
  });
};
