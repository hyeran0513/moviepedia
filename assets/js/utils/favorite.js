import { initializeWeb } from "./main.js";
import { createFavoriteCards } from "../components/card/cardFavorite.js";
import { setupFilterHandlers } from "../components/form/favoriteForm.js";
import { handleMoreButton } from "../components/button/favoriteMoreButton.js";
import { getFavoriteMovies } from "../services/favorites.js";
import { showLoading } from "../components/common/loader.js";

// 로딩 표시
showLoading();

// 웹 초기화
initializeWeb();

// 찜한 영화 데이터를 가져오고 카드 생성
(async () => {
  try {
    const movies = await getFavoriteMovies();
    createFavoriteCards(movies);
  } catch (error) {
    console.error(error);
  }
})();

// 필터 핸들러를 설정
setupFilterHandlers();

// 더 보기 버튼 동작 설정
handleMoreButton();
