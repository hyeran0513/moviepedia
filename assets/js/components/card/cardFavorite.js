import { createCardHTML } from "./cardHtml.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { handleNoData } from "../common/noData.js";

let pageState = {
  itemsPerPage: 10,
  currentIndex: 0,
  isFiltered: false,
  filteredData: [],
};

// 페이지 상태 가져오기
export const getPageState = () => pageState;

// 현재 인덱스 설정
export const setCurrentIndex = (newIndex) => {
  pageState.currentIndex = newIndex;
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

  // 카드 초기화
  cardContainer.innerHTML = "";

  // 데이터가 없을 경우 처리
  const noDataElement = isFiltered
    ? document.getElementById("favoriteNoData") // 검색 후 데이터 없음
    : document.getElementById("favoriteInitNoData"); // 초기 상태

  if (movies.length === 0) {
    document.querySelector(".btn-more").style.display = "none";
    document.getElementById("favoriteNoData").style.display = "none";
    document.getElementById("favoriteInitNoData").style.display = "none";
    noDataElement.style.display = "block";
    handleNoData(movies, noDataElement);
    return;
  } else {
    noDataElement.style.display = "none";
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
  const favoriteButtons = cardContainer.querySelectorAll(".favorite-button");
  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button);
  });

  // 더보기 버튼 처리
  const moreButton = document.querySelector(".btn-more");
  moreButton.style.display =
    currentIndex + itemsPerPage >= dataToDisplay.length ? "none" : "block";
};

// 더보기 버튼 클릭 시 추가 카드 로드
export const loadMoreCards = (movies) => {
  const { itemsPerPage, currentIndex } = pageState;

  // 현재 인덱스를 업데이트
  pageState.currentIndex = currentIndex + itemsPerPage;

  // 추가 데이터 로드
  displayCards(movies);
};
