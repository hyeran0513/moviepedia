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
  itemCount: 0,
};

// 페이지 상태 조회
export const getPageState = () => {
  return pageState;
};

// 상태 업데이트
export const setPageState = (newState) => {
  pageState = { ...pageState, ...newState };
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

    const result = await getMovies(
      movieTitle,
      movieYear,
      currentPage,
      pageState.limit
    );

    setPageState({
      totalResults: result.totalResults,
    });

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    hideLoading();
  }
};

export const createCard = async () => {
  const url = new URL(window.location.href);
  const movieTitle = url.searchParams.get("title");
  const movieYear = url.searchParams.get("year");
  const cardContainer = document.querySelector(".card");
  const noDataContainer = document.getElementById("resultNoData");
  const totalPage = document.querySelector(".total-page");

  // 페이지 상태 가져오기
  const { currentPage } = getPageState();

  // 새로운 함수로 영화 데이터 가져오기
  const data = await fetchMoviesData(movieTitle, movieYear, currentPage);

  // 페이지 상태 가져오기
  const { totalResults } = getPageState();

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  // 데이터가 없을 경우
  if (
    !data ||
    data === "Movie not found!" ||
    !data.movies ||
    data.movies.length === 0
  ) {
    handleNoData(data, noDataContainer);
    return;
  }

  // 데이터가 있는 경우
  displayCards(data.movies);
  totalPage.textContent = totalResults;

  // 더보기 버튼
  handleMoreButton(movieTitle, movieYear);

  // 업데이트된 카드 개수 반영
  updateCardItemCount();
};

export const displayCards = (movies) => {
  const cardContainer = document.querySelector(".card");
  const { currentPage, limit, totalResults } = getPageState();

  // 영화 데이터를 기반으로 카드 HTML 생성
  const cardHTML = movies.map((item) => createCardHTML(item)).join("");
  cardContainer.innerHTML += cardHTML;

  // 찜 버튼 처리
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button);
  });

  // 더보기 버튼 표시 여부 결정
  const btnMore = document.querySelector(".btn-more");
  if (btnMore) {
    if (currentPage * limit >= totalResults) {
      btnMore.style.display = "none";
    } else {
      btnMore.style.display = "flex";
    }
  }
};

// 카드 개수 업데이트
const updateCardItemCount = () => {
  const cardItems = document.querySelectorAll(".card__item");
  const itemsCountElement = document.querySelector(".count-item");

  // DOM 요소 개수를 텍스트로 업데이트
  if (itemsCountElement) {
    itemsCountElement.textContent = cardItems.length;
  }
};

// 더보기 버튼 표시 여부 결정
export const loadMoreCards = async (movieTitle, movieYear) => {
  const { currentPage } = getPageState();

  // 새로운 함수로 영화 데이터 가져오기
  const data = await fetchMoviesData(movieTitle, movieYear, currentPage + 1);

  // 추가 카드 표시
  displayCards(data.movies);

  // 카드 개수 업데이트
  updateCardItemCount();
};
