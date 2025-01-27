import { createFavoriteCards } from "../card/cardFavorite.js";
import {
  getFavoriteMovies,
  filterMoviesByTitle,
} from "../../services/favorites.js";

export const setupFilterHandlers = () => {
  const searchForm = document.getElementById("searchForm");
  const titleInput = document.getElementById("movieTitle");
  const deleteButton = document.querySelector(".btn-del");

  // 검색 폼 제출
  searchForm.addEventListener("click", async (e) => {
    e.preventDefault();

    // 입력값 가져오기
    const title = titleInput.value.trim();

    try {
      // 찜한 영화 목록 조회
      const movies = await getFavoriteMovies();
      // 제목으로 영화 필터링
      const filteredMovies = filterMoviesByTitle(movies, title);
      // 필터링된 카드 생성
      createFavoriteCards(filteredMovies, { isFiltered: true });
    } catch (error) {
      console.error(error);
    }
  });

  // 제목 입력값에 따라 버튼 투명도 조정
  titleInput.addEventListener("input", () => {
    deleteButton.style.opacity = titleInput.value.trim() ? "1" : "0";
  });

  // 삭제 버튼 클릭
  deleteButton.addEventListener("click", async () => {
    titleInput.value = "";
    deleteButton.style.opacity = "0";
  });
};
