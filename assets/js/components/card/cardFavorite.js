import { createCardHTML } from "./cardHtml.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { handleNoData } from "../common/noData.js";
import {
  getFavoriteMovies,
  filterMoviesByTitle,
} from "../../services/favorites.js";

// 페이지 상태 관리 객체
let pageState = {
  itemsPerPage: 10,
  currentIndex: 0,
  isFiltered: false,
  filteredData: [],
  storeIndex: 0,
};

// 페이지 상태 조회
export const getPageState = () => pageState;

// 페이지 상태 업데이트
export const updatePageState = (updates) => {
  pageState = { ...pageState, ...updates };
};

// 찜 목록 카드 생성
export const createFavoriteCards = (movies, options = {}) => {
  const { isFiltered = false } = options;
  const cardContainer = document.querySelector(".card");
  const favoriteNoData = document.getElementById("favoriteNoData");
  const favoriteInitNoData = document.getElementById("favoriteInitNoData");
  const btnMore = document.querySelector(".btn-more");

  // 페이지 상태 업데이트
  updatePageState({
    isFiltered,
    filteredData: isFiltered ? movies : [],
    currentIndex: 0,
  });

  // 기존 코드 초기화
  cardContainer.innerHTML = "";

  // 데이터가 없을 경우
  if (movies.length === 0) {
    btnMore.style.display = "none";

    if (isFiltered) {
      handleNoData([], favoriteNoData);
      favoriteInitNoData.style.display = "none";
    } else {
      handleNoData([], favoriteInitNoData);
      favoriteNoData.style.display = "none";
    }
    return;
  }

  // 데이터가 있는 경우
  favoriteNoData.style.display = "none";
  favoriteInitNoData.style.display = "none";
  displayCards(movies);
};

// 카드 데이터를 화면에 표시
const displayCards = (movies) => {
  const cardContainer = document.querySelector(".card");
  const { itemsPerPage, currentIndex, isFiltered, filteredData, storeIndex } =
    pageState;

  // 필터링 여부에 따라 표시할 데이터 결정
  const dataToDisplay = isFiltered ? filteredData : movies;

  // 찜 해제 후 storeIndex 값 반영
  const startIndex = storeIndex || currentIndex;

  const visibleData = dataToDisplay.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 카드 HTML 생성 및 추가
  const cardHTML = visibleData.map(createCardHTML).join("");
  cardContainer.innerHTML += cardHTML;

  // 찜 버튼 이벤트 처리
  const favoriteButtons = cardContainer.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => handleFavoriteButton(button, "favorite"));

  // 더보기 버튼 표시 여부 결정
  const moreButton = document.querySelector(".btn-more");
  moreButton.style.display =
    startIndex + itemsPerPage >= dataToDisplay.length ? "none" : "block";
};

// 더보기 버튼 표시 여부 결정
export const loadMoreCards = (movies) => {
  const { itemsPerPage, currentIndex } = pageState;

  // 현재 인덱스 업데이트
  updatePageState({ currentIndex: currentIndex + itemsPerPage });
  // 추가 카드 표시
  displayCards(movies);
};

// 찜 목록 업데이트
export const updateFavoriteCards = async () => {
  const { isFiltered, storeIndex } = getPageState();

  try {
    const allMovies = await getFavoriteMovies();
    let moviesToDisplay = allMovies;

    // 검색 상태에 따라 필터링된 데이터 유지
    if (isFiltered) {
      const title = document.getElementById("movieTitle").value.trim();
      moviesToDisplay = filterMoviesByTitle(allMovies, title);
    }

    // 페이지 상태 업데이트
    updatePageState({
      currentIndex: storeIndex || 0,
    });

    // 카드 다시 생성
    createFavoriteCards(moviesToDisplay, { isFiltered });
  } catch (error) {
    console.error(error);
  }
};
