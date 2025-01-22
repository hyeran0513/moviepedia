import { initializeWeb } from "./main.js";
import { createCard } from "../components/card.js";
import {
  submitForm,
  deleteTitle,
  toggleDeleteButton,
} from "../components/filter.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeWeb();

  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  // searchForm의 제출 버튼 클릭 시 이벤트
  document.getElementById("searchForm").addEventListener("click", (e) => {
    submitForm(favorites, e);
  });

  createCard(favorites, "favorite");

  // 타이틀 검색 삭제 버튼
  document.querySelector(".btn-del").addEventListener("click", deleteTitle);

  // 검색 삭제 버튼 노출 토글
  toggleDeleteButton();
});
