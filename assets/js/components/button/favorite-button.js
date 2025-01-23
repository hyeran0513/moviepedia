import { createCard } from "../card/card-favorite.js";

// 영화 데이터를 찜 목록에 추가하거나 제거
export const toggleFavorite = (movieId) => {
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  const isFavorite = favorites.some((id) => id === movieId);

  if (isFavorite) {
    // 찜 목록에 이미 있는 영화는 제거
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  } else {
    // 찜 목록에 없는 영화는 추가
    favorites.push(movieId);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return isFavorite;
};

// 버튼의 상태를 찜 여부에 맞게 업데이트
export const updateButtonState = (button, isFavorite) => {
  button.classList.toggle("--active", !isFavorite);
};

// 하트 아이콘을 찜 여부에 맞게 업데이트
export const updateHeartIcon = (button, isFavorite) => {
  const heartIcon = button.querySelector("i");
  heartIcon.classList.toggle("bxs-heart", !isFavorite);
  heartIcon.classList.toggle("bx-heart", isFavorite);
};

// 찜 버튼 클릭 시 실행되는 메인 함수
export const handleFavoriteButton = (button, type) => {
  button.addEventListener("click", () => {
    const imdbId = button.dataset.imdbId;

    // 찜 상태를 토글하고, 해당 상태를 반환
    const isFavorite = toggleFavorite(imdbId);

    // 버튼의 상태를 찜 여부에 맞게 업데이트
    updateButtonState(button, isFavorite);

    // 하트 아이콘을 찜 여부에 맞게 업데이트
    updateHeartIcon(button, isFavorite);

    // 찜 목록 페이지에서만 카드 재생성
    if (type === "favorite") {
      const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

      createCard(favorites);
    }
  });
};
