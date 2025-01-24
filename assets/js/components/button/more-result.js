import {
  fetchMoviesData,
  getPageState,
  setPageState,
} from "../card/card-result.js";
import { createCardHTML } from "../card/card-html.js";
import { handleFavoriteButton } from "../button/favorite-button.js";

export const handleMoreButton = async (movieTitle, movieYear) => {
  const btnMore = document.querySelector(".btn-more");
  const moviesContainer = document.querySelector(".card");

  // 페이지 상태 가져오기
  const { currentPage, limit } = getPageState();

  // 첫 페이지 데이터를 가져와서 버튼의 초기 상태 설정
  const initialData = await fetchMoviesData(movieTitle, movieYear, currentPage);
  const totalResults = initialData.totalResults;

  // 버튼의 초기 상태를 판단
  if (currentPage * limit >= totalResults) {
    // 데이터 끝에 도달하면 버튼 숨김
    btnMore.style.display = "none";
  } else {
    // 더 데이터가 있으면 버튼 보이기
    btnMore.style.display = "block";
  }

  // 더보기 버튼 클릭 시 처리
  btnMore.addEventListener("click", async () => {
    // 페이지 상태 가져오기
    const { currentPage, limit } = getPageState();

    // 더 많은 데이터를 가져오기
    const data = await fetchMoviesData(movieTitle, movieYear, currentPage + 1);

    // 영화 데이터를 기존 목록에 추가
    const newMovies = data.movies;

    newMovies.forEach((movie) => {
      const cardHTML = createCardHTML(movie);
      moviesContainer.innerHTML += cardHTML;
    });

    // 찜 버튼
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach((button) => {
      handleFavoriteButton(button);
    });

    // 페이지 상태 업데이트
    setPageState({ currentPage: currentPage + 1 });

    // 더보기 버튼의 상태 업데이트
    if ((currentPage + 1) * limit >= data.totalResults) {
      // 데이터 끝에 도달하면 버튼 숨김
      btnMore.style.display = "none";
    } else {
      // 더 데이터가 있으면 버튼 보이기
      btnMore.style.display = "block";
    }
  });
};
