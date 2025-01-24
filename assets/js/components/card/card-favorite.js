import { createCardHTML } from "./card-html.js";
import { handleFavoriteButton } from "../button/favorite-button.js";
import { getMoviesByImdbIDs } from "../../api/movie.js";
import { handleMoreButton } from "../button/more-favorite.js";
import { handleNoData } from "../common/no-data.js";

const pageState = {
  itemsPerPage: 10,
  currentIndex: 0,
};

// 상태 업데이트
export const setCurrentIndex = (newIndex) => {
  pageState.currentIndex = newIndex;
};

export const getPageState = () => {
  return pageState;
};

export const displayCards = async (data, type) => {
  const cardContainer = document.querySelector(".card");
  let favorites;

  if (type === "filter") {
    favorites = data;
  } else {
    const imdbIDs = JSON.parse(sessionStorage.getItem("favorites")) || [];
    favorites = await getMoviesByImdbIDs(imdbIDs);
  }

  // 현재 인덱스에 따라 표시할 데이터 조정
  const visibleData = favorites.slice(
    pageState.currentIndex,
    pageState.currentIndex + pageState.itemsPerPage
  );

  // 영화 데이터를 기존 목록에 추가
  let cardHTML = visibleData
    .map((item) => createCardHTML(item.details))
    .join("");

  cardContainer.innerHTML += cardHTML;

  // 찜 버튼
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button, "favorite");
  });
};

export const createCard = (data, type, noDataType) => {
  const cardContainer = document.querySelector(".card");
  const noDataContainer = document.getElementById("favoriteNoData");
  const noDataInitContainer = document.getElementById("favoriteInitNoData");

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  // 현재 인덱스 초기화
  pageState.currentIndex = 0;

  // 검색 전 초기 노데이터
  if (!noDataType) {
    handleNoData(data, noDataInitContainer);

    if (noDataContainer) {
      noDataContainer.style.display = "none";
    }
  }

  // 검색 후 데이터가 없을 시 노데이터
  if (noDataType === "search") {
    handleNoData(data, noDataContainer);

    if (noDataInitContainer) {
      noDataInitContainer.style.display = "none";
    }
  }

  // 데이터가 있는 경우 카드 생성 및 표시
  displayCards(data, type);

  // 더보기 버튼 처리
  handleMoreButton(data);
};
