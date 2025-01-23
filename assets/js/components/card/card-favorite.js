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
    console.log("test: " + JSON.stringify(favorites));
  } else {
    const imdbIDs = JSON.parse(sessionStorage.getItem("favorites")) || [];
    favorites = await getMoviesByImdbIDs(imdbIDs);
  }

  let cardHTML = favorites.map((item) => createCardHTML(item.details)).join("");

  cardContainer.innerHTML = cardHTML;

  const favoriteButtons = document.querySelectorAll(".btn-favorite");

  favoriteButtons.forEach((button) => {
    handleFavoriteButton(button, "favorite");
  });
};

export const createCard = (data, type) => {
  const cardContainer = document.querySelector(".card");

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  currentIndex = 0;

  // 데이터 처리
  handleNoData(data);
  displayCards(data, type);
  handleMoreButton(data);
};
