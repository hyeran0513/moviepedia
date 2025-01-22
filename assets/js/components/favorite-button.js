export const handleFavoriteButton = (button, updateCardsCallback) => {
  button.addEventListener("click", () => {
    const movieData = JSON.parse(button.dataset.movie);
    // 세션 스토리지에서의 찜한 영화 목록
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

    // 현재 영화가 찜 목록에 있는지 확인
    const isFavorite = favorites.some(
      (item) => item.imdbID === movieData.imdbID
    );

    if (isFavorite) {
      // 이미 찜 목록에 있는 경우, 해당 영화 제거
      const updatedFavorites = favorites.filter(
        (item) => item.imdbID !== movieData.imdbID
      );

      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // 찜 목록에 없는 경우, 해당 영화 추가
      favorites.push(movieData);
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
    }

    const updatedFavoritesList =
      JSON.parse(sessionStorage.getItem("favorites")) || [];

    // 업데이트된 찜 목록 카드 렌더링
    if (updateCardsCallback) {
      updateCardsCallback(updatedFavoritesList);
    }
  });
};
