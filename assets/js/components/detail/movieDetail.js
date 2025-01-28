import { getMovieDetails } from "../../api/movie.js";
import { createMovieHTML } from "./movieHtml.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { showLoading } from "../common/loader.js";

export const createDetail = async () => {
  const url = new URL(window.location.href);
  const imdbID = url.searchParams.get("imdbID");

  try {
    const movieData = await getMovieDetails(imdbID);

    // 포스터 이미지
    const poster = document.querySelector(".movie-detail__poster");
    poster.innerHTML = `
      ${
        movieData.Poster === "N/A" || !movieData.Poster
          ? `<div class="movie-detail__poster--default"><i class="bx bx-image-alt"></i></div>`
          : `<img src="${movieData.Poster}" alt="${movieData.Title}" />`
      }
    `;

    // 영화 제목과 줄거리
    const movieTitle = document.querySelector(".movie-detail__title");
    const storyline = document.querySelector(
      ".movie-detail__storyline .movie-detail__description"
    );

    movieTitle.textContent = movieData.Title;
    storyline.textContent = movieData.Plot;

    // 찜 버튼
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    const favoriteBtnWrap = document.querySelector(".favorite-button-wrap");
    const isFavorite = favorites.some((id) => id === imdbID);

    favoriteBtnWrap.innerHTML = `
      <button type="button" class="favorite-button--lg ${
        isFavorite ? "--active" : ""
      }" 
        data-imdb-id="${imdbID}">
        <i class='bx ${isFavorite ? "bxs-heart" : "bx-heart"}'></i>
        <span>favorite</span>
      </button>
    `;

    const favoriteButton = document.querySelector(".favorite-button--lg");
    handleFavoriteButton(favoriteButton);

    // 영화 상세 정보 출력
    createMovieHTML(movieData);

    // 뒤로가기 버튼
    const backButton = document.querySelector(".btn-back");

    backButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (history.length > 1) {
        history.go(-1);
        showLoading();
      }
    });
  } catch (error) {
    console.error("영화 상세 정보 가져오기 오류", error);
  }
};
