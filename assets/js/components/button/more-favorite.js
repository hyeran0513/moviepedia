import {
  displayCards,
  getPageState,
  setCurrentIndex,
} from "../card/card-favorite.js";

export const handleMoreButton = (data) => {
  const btnMore = document.querySelector(".btn-more");

  if (!btnMore) return;

  // 페이지 상태 가져오기
  let { currentIndex, itemsPerPage } = getPageState();

  // 더보기 버튼 초기 상태 처리
  btnMore.style.display =
    currentIndex + itemsPerPage >= data.length ? "none" : "block";

  btnMore.addEventListener("click", () => {
    currentIndex += itemsPerPage;
    setCurrentIndex(currentIndex);

    displayCards(data, "favorite");

    // 더보기 버튼 숨기기
    if (currentIndex + itemsPerPage >= data.length) {
      btnMore.style.display = "none";
    }
  });
};
