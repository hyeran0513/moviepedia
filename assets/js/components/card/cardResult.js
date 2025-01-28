import { createCardHTML } from "./cardHtml.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { handleNoData } from "../common/noData.js";
import { getMovies } from "../../api/movie.js";
import { handleMoreButton } from "../button/resultMoreButton.js";
import { showLoading, hideLoading } from "../common/loader.js";

let pageState = {
  currentPage: 1,
  limit: 10,
  totalResults: 0,
};

// 상태 업데이트
export const setPageState = (newState) => {
  pageState = { ...pageState, ...newState };
};

export const getPageState = () => {
  return pageState;
};

// 영화 데이터 가져오기
export const fetchMoviesData = async (
  movieTitle = "",
  movieYear = "",
  currentPage
) => {
  try {
    showLoading();

    // 현재 페이지를 업데이트
    setPageState({ currentPage });

    let result = await getMovies(
      movieTitle,
      movieYear,
      currentPage,
      pageState.limit
    );

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
  }
};

export const displayCards = (movies) => {
  const cardContainer = document.querySelector(".card");

  showLoading();

  // 영화 데이터를 기반으로 카드 HTML 생성
  let cardHTML = movies.map((item) => createCardHTML(item)).join("");

  cardContainer.innerHTML = cardHTML;

  // 찜 버튼 처리
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button);
  });

  hideLoading();
};

export const createCard = async () => {
  const url = new URL(window.location.href);
  const movieTitle = url.searchParams.get("title");
  const movieYear = url.searchParams.get("year");

  const cardContainer = document.querySelector(".card");
  const noDataContainer = document.getElementById("resultNoData");

  // 페이지 상태 가져오기
  const { currentPage } = getPageState();

  // 새로운 함수로 영화 데이터 가져오기
  const data = await fetchMoviesData(movieTitle, movieYear, currentPage);

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  if (
    data === "Movie not found!" ||
    !data ||
    !data.movies ||
    data.movies.length === 0
  ) {
    handleNoData(data, noDataContainer);
  } else {
    // 카드 생성
    displayCards(data.movies);
  }

  // 더보기 버튼
  handleMoreButton(movieTitle, movieYear);
};
