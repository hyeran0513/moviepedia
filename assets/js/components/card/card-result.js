import { createCardHTML } from "./card-html.js";
import { handleFavoriteButton } from "../button/favorite-button.js";
import { handleMoreButton } from "../button/more-result.js";
import { handleNoData } from "../common/no-data.js";

export const displayCards = (data) => {
  const cardContainer = document.querySelector(".card");

  let cardHTML = data.movies.map((item) => createCardHTML(item)).join("");

  cardContainer.innerHTML = cardHTML;

  const favoriteButtons = document.querySelectorAll(".favorite-button");

  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button, "result");
  });
};

export const createCard = (data) => {
  const cardContainer = document.querySelector(".card");

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  // 데이터 처리
  handleNoData(data);
  displayCards(data);
  handleMoreButton(data);
};
