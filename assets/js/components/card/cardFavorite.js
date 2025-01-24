import { createCardHTML } from "./cardHtml.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { handleNoData } from "../common/noData.js";

let pageState = {
  itemsPerPage: 10,
  currentIndex: 0,
  isFiltered: false,
  filteredData: [],
};

// 카드 생성 함수
export const createFavoriteCards = (movies, options = {}) => {
  const { isFiltered = false } = options;
  const cardContainer = document.querySelector(".card");

  // 페이지 상태 업데이트
  pageState = {
    ...pageState,
    isFiltered,
    filteredData: isFiltered ? movies : [],
    currentIndex: 0,
  };

  // 카드 초기화 및 데이터 생성
  cardContainer.innerHTML = "";
  if (movies.length === 0) {
    handleNoData(movies, document.getElementById("favoriteNoData"));
    return;
  }
  displayCards(movies);
};

// 카드 데이터를 화면에 출력
const displayCards = (movies) => {
  const cardContainer = document.querySelector(".card");
  const { itemsPerPage, currentIndex, isFiltered, filteredData } = pageState;

  const dataToDisplay = isFiltered ? filteredData : movies;
  const visibleData = dataToDisplay.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  // 카드 HTML 생성
  const cardHTML = visibleData.map(createCardHTML).join("");
  cardContainer.innerHTML += cardHTML;

  // 찜 버튼 처리
  const favoriteButtons = document.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => handleFavoriteButton(button));

  // 더보기 버튼 처리
  const moreButton = document.querySelector(".btn-more");
  moreButton.style.display =
    currentIndex + itemsPerPage >= dataToDisplay.length ? "none" : "block";

  moreButton.addEventListener("click", () => loadMoreCards(dataToDisplay));
};

// 더보기 버튼 클릭 시 추가 카드 로드
const loadMoreCards = (movies) => {
  pageState.currentIndex += pageState.itemsPerPage;
  displayCards(movies);
};
