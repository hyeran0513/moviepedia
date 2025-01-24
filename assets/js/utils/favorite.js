import { initializeWeb } from "./main.js";
import { createCard } from "../components/card/cardFavorite.js";
import {
  submitForm,
  deleteTitle,
  toggleDeleteButton,
} from "../components/filter/filter.js";

initializeWeb();

const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

// searchForm의 제출 버튼 클릭 시 이벤트
document.getElementById("searchForm").addEventListener("click", submitForm);

createCard(favorites);

// 타이틀 검색 삭제 버튼
document.querySelector(".btn-del").addEventListener("click", deleteTitle);

// 검색 삭제 버튼 노출 토글
toggleDeleteButton();
