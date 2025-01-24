import { createFavoriteCards } from "../card/cardFavorite.js";
import { fetchMoviesByIds } from "../../api/movie.js";

// 필터 폼 제출 시 실행
export const setupFilterHandlers = () => {
  const searchForm = document.getElementById("searchForm");
  const titleInput = document.getElementById("movieTitle");
  const deleteButton = document.querySelector(".btn-del");

  // 폼 제출 처리
  searchForm.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim().toLowerCase();

    if (!title) {
      displayWarning(true);
      return;
    }

    displayWarning(false);

    const imdbIDs = JSON.parse(sessionStorage.getItem("favorites")) || [];
    const movies = await fetchMoviesByIds(imdbIDs);

    // 제목 필터링
    const filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(title)
    );

    createFavoriteCards(filteredMovies, { isFiltered: true });
  });

  // 제목 입력 필드 변화에 따른 삭제 버튼 상태 업데이트
  titleInput.addEventListener("input", () => {
    deleteButton.style.opacity = titleInput.value.trim() ? "1" : "0";
  });

  // 제목 삭제 버튼 클릭 시 처리
  deleteButton.addEventListener("click", () => {
    titleInput.value = "";
    deleteButton.style.opacity = "0";
  });
};

// 경고 메시지 표시/숨기기
const displayWarning = (show) => {
  const filterField = document
    .getElementById("movieTitle")
    .closest(".filter-field");
  const warningMessage = filterField.querySelector(".filter-info");
  filterField.classList.toggle("warning", show);
  warningMessage.style.display = show ? "flex" : "none";
};
