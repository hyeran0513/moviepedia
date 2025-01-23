import { createCard } from "../card/card-favorite.js";
import { getMoviesByImdbIDs } from "../../api/movie.js";

export const submitForm = async (data, e) => {
  e.preventDefault();

  const titleInput = document.getElementById("movieTitle");
  const title = titleInput.value.trim().toLowerCase();

  if (!title) {
    titleInput.closest(".filter-field").classList.add("warning");
    titleInput
      .closest(".filter-field")
      .querySelector(".filter-info").style.display = "flex"; // 메시지 표시
  } else {
    titleInput.closest(".filter-field").classList.remove("warning");
    titleInput
      .closest(".filter-field")
      .querySelector(".filter-info").style.display = "none"; // 메시지 숨기기
  }

  const imdbIDs = JSON.parse(sessionStorage.getItem("favorites")) || [];

  const favorites = await getMoviesByImdbIDs(imdbIDs);

  // 입력된 제목을 포함하는 항목 필터링
  const filteredData = favorites.filter((item) => {
    return item.details.Title.toLowerCase().includes(title);
  });

  // 필터링된 결과를 createCard에 전달
  createCard(filteredData, "filter");
};

export const deleteTitle = () => {
  const titleInput = document.getElementById("movieTitle");
  titleInput.value = "";
  toggleDeleteButton();
};

export const toggleDeleteButton = () => {
  const titleInput = document.getElementById("movieTitle");
  const deleteButton = document.querySelector(".btn-del");

  if (titleInput.value.trim() !== "") {
    deleteButton.style.opacity = "1"; // 삭제 버튼 표시
  } else {
    deleteButton.style.opacity = "0"; // 삭제 버튼 숨기기
  }
};

document
  .getElementById("movieTitle")
  .addEventListener("input", toggleDeleteButton);
