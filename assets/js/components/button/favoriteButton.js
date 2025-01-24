// 찜 목록 상태를 토글
export const toggleFavorite = (movieId) => {
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  const isFavorite = favorites.includes(movieId);

  if (isFavorite) {
    const updatedFavorites = favorites.filter((id) => id !== movieId);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  } else {
    favorites.push(movieId);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }

  return !isFavorite;
};

// 버튼 상태 업데이트
export const handleFavoriteButton = (button) => {
  button.addEventListener("click", () => {
    const imdbId = button.dataset.imdbId;
    const isFavorite = toggleFavorite(imdbId);

    button.classList.toggle("--active", isFavorite);
    const icon = button.querySelector("i");
    icon.classList.toggle("bxs-heart", isFavorite);
    icon.classList.toggle("bx-heart", !isFavorite);
  });
};
