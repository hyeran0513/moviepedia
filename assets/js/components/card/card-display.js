import { createCardHTML } from "./card-html.js";
import { handleFavoriteButton } from "../button/favorite-button.js";
import { currentIndex, itemsPerPage } from "./card.js";

export const displayCards = (data, type) => {
  const cardContainer = document.querySelector(".card");
  let cardHTML;

  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  if (type === "favorite") {
    // 찜 목록 페이지
    const cardsToDisplay = data.slice(
      currentIndex,
      currentIndex + itemsPerPage
    );

    cardHTML = cardsToDisplay
      .map((item) => createCardHTML(item, favorites))
      .join("");

    // 카드 렌더링 후 좋아요 버튼에 이벤트 바인딩
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);
  }

  // 결과 페이지
  if (type === "result") {
    cardHTML = data.movies
      .map((item) => createCardHTML(item, favorites))
      .join("");
    cardContainer.insertAdjacentHTML("afterbegin", cardHTML);
  }

  const favoriteButtons = document.querySelectorAll(".btn-favorite");

  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button, type);
  });
};
