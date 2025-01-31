import {
  updateFavoriteCards,
  setPageState,
  getPageState,
} from "../card/cardFavorite.js";

// 찜 해제 팝업을 표시하는 함수
const showFavoritePopup = (movieId, favorites) => {
  const popup = document.getElementById("favoriteAskModal");
  const cancelButton = document.getElementById("favoriteAskCancel");
  const confirmButton = document.getElementById("favoriteAskOk");

  // 팝업 보이기
  popup.classList.add("--active");

  // 취소 버튼 클릭 시 팝업 숨기기
  cancelButton.addEventListener(
    "click",
    () => {
      popup.classList.remove("--active");
    },
    { once: true }
  );

  // 확인 버튼 클릭 시 찜 해제
  confirmButton.addEventListener(
    "click",
    () => {
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      const { currentIndex } = getPageState();

      setPageState({
        storeIndex: currentIndex,
      });

      // 찜 목록 업데이트
      updateFavoriteCards();

      // 팝업 숨기기
      popup.classList.remove("--active");
    },
    { once: true }
  );
};

// 찜 목록 상태를 토글
export const toggleFavorite = (movieId, page) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.includes(movieId);

  if (isFavorite) {
    if (page === "favorite") {
      // 찜 해제 시 팝업 표시
      showFavoritePopup(movieId, favorites);
    } else {
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  } else {
    favorites.unshift(movieId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return !isFavorite;
};

// 버튼 상태 업데이트
export const handleFavoriteButton = (button, page) => {
  button.addEventListener("click", () => {
    const imdbId = button.dataset.imdbId;
    const isFavorite = toggleFavorite(imdbId, page);

    toggleFavoriteActive(button, isFavorite, page);
  });
};

// 버튼 활성화 상태 업데이트
export const toggleFavoriteActive = (button, isFavorite, page) => {
  button.classList.toggle("--active", isFavorite);

  if (page === "favorite") {
    button.classList.add("--active");
  }
};
