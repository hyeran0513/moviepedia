import { handleNoData } from "../common/no-data.js";
import { displayCards } from "../card/card-display.js";
import { handleMoreButton } from "../button/more-button.js";

export const itemsPerPage = 10;
export let currentIndex = 0;

export const createCard = (data, type) => {
  const cardContainer = document.querySelector(".card");

  // 카드 컨테이너 초기화
  cardContainer.innerHTML = "";

  currentIndex = 0;

  // 데이터 처리
  handleNoData(data);
  displayCards(data, type);
  handleMoreButton(data, type);
};
