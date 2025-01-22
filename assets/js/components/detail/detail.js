import { getMovieDetails } from "../../api/movie.js";
import { handleFavoriteButton } from "../button/favorite-button.js";

// 영화 정보 렌더링
const renderMovieInfo = (movieData) => {
  const movieDetailInfoList = document.querySelector(
    ".movie-detail__info-list"
  );

  // 영화 정보 항목
  const movieInfoItems = [
    { term: "Rating", definition: movieData.imdbRating },
    { term: "Release Date", definition: movieData.Released },
    {
      term: "Genres",
      definition: movieData.Genre.split(",")
        .map(
          (genre) => `<li class="movie-detail__genre-item">${genre.trim()}</li>`
        )
        .join(""),
    },
    { term: "Duration", definition: movieData.Runtime },
    { term: "Cast", definition: movieData.Actors },
    { term: "Director", definition: movieData.Director },
  ];

  // 영화 정보 항목들을 HTML로 생성
  movieDetailInfoList.innerHTML = movieInfoItems
    .map(
      (item) => `
        <dl class="movie-detail__info-item">
          <dt class="movie-detail__term">${item.term}</dt>
          <dd class="movie-detail__definition">${
            item.term === "Genres"
              ? `<ul class="movie-detail__genre-list">${item.definition}</ul>`
              : item.definition
          }</dd>
        </dl>
      `
    )
    .join("");
};

// 영화 상세 정보 생성
export const createDetail = async () => {
  const url = new URL(window.location.href);
  const imdbID = url.searchParams.get("imdbID");

  try {
    const movieData = await getMovieDetails(imdbID);

    // 포스터 이미지
    const poster = document.querySelector(".movie-detail__poster img");
    poster.src = movieData.Poster;

    // 영화 제목과 줄거리
    const movieTitle = document.querySelector(".movie-detail__title");
    const storyline = document.querySelector(
      ".movie-detail__storyline .movie-detail__description"
    );

    movieTitle.textContent = movieData.Title;
    storyline.textContent = movieData.Plot;

    // 찜 버튼
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    const favoriteBtnWrap = document.querySelector(".favorite-btn-wrap");
    const isFavorite = favorites.some((favorite) => favorite.imdbID === imdbID);

    favoriteBtnWrap.innerHTML = `
      <button type="button" class="btn-favorite--lg ${
        isFavorite ? "--active" : ""
      }"
      }'" data-movie='${JSON.stringify(movieData)
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")}' >
        <i class='bx ${isFavorite ? "bxs-heart" : "bx-heart"}'></i>
        <span>favorite</span>
      </button>
    `;

    const favoriteButton = document.querySelector(".btn-favorite--lg");

    // 찜 버튼 클릭 이벤트 처리
    handleFavoriteButton(favoriteButton);

    // 영화 상세 정보 출력
    renderMovieInfo(movieData);
  } catch (error) {
    console.error("영화 상세 정보 가져오기 오류", error);
  }
};
