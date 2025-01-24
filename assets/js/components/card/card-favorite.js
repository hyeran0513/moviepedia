import { createCardHTML } from "./card-html.js";
import { handleFavoriteButton } from "../button/favorite-button.js";
import { getMoviesByImdbIDs } from "../../api/movie.js";
import { handleMoreButton } from "../button/more-favorite.js";
import { handleNoData } from "../common/no-data.js";

export let itemsPerPage = 10;
export let currentIndex = 0;

export const setCurrentIndex = (newIndex) => {
  currentIndex = newIndex;
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
    currentIndex,
    currentIndex + itemsPerPage
  );

  // 영화 데이터를 기반으로 카드 HTML 생성
  let cardHTML = visibleData
    .map((item) => createCardHTML(item.details))
    .join("");

  cardContainer.innerHTML += cardHTML; // 기존 카드 유지하며 추가

  // 즐겨찾기 버튼
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button, "favorite");
  });
};

export const createCard = (data, type) => {
  const cardContainer = document.querySelector(".card");
  const noDataContainer = document.getElementById("favoriteNoData");

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  // 현재 인덱스 초기화
  currentIndex = 0;

  // 데이터가 없을 경우 처리
  handleNoData(data, noDataContainer);

  // 데이터가 있는 경우 카드 생성 및 표시
  displayCards(data, type);

  // 더보기 버튼 처리
  handleMoreButton(data);
};
