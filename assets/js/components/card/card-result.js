import { createCardHTML } from "./card-html.js";
import { handleFavoriteButton } from "../button/favorite-button.js";
import { handleMoreButton } from "../button/more-result.js";
import { handleNoData } from "../common/no-data.js";

export const displayCards = (data) => {
  const cardContainer = document.querySelector(".card");

  // 영화 데이터를 기반으로 카드 HTML 생성
  let cardHTML = data.movies.map((item) => createCardHTML(item)).join("");

  cardContainer.innerHTML = cardHTML;

  // 즐겨찾기 버튼
  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button, "result");
  });
};

export const createCard = (data) => {
  const cardContainer = document.querySelector(".card");
  const noDataContainer = document.getElementById("resultNoData");

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  if (!data || data.length === 0 || data === "Movie not found!") {
    // 데이터가 없을 경우 처리
    handleNoData(data, noDataContainer);
  } else {
    // 데이터가 있는 경우 카드 생성 및 표시
    displayCards(data);

    // 더보기 버튼 처리
    handleMoreButton(data);
  }
};
