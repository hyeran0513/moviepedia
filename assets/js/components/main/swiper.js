import { getMovies } from "../../api/movie.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { showLoading, hideLoading } from "../common/loader.js";

export const initializeSwiper = (containerSelector) => {
  return new Swiper(containerSelector, {
    effect: "coverflow",
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 3000,
    },
    grabCursor: true,
  });
};

export const renderSwiperMovies = async () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const data = await getMovies("mini", "", 1, 9);

  if (data.movies) {
    showLoading();

    swiperWrapper.innerHTML = data.movies
      .map((movie) => {
        const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
        const isFavorite = favorites.some((id) => id === movie.imdbID);

        return `
          <div class="swiper-slide">
            <button type="button" class="favorite-button" data-imdb-id='${
              movie.imdbID
            }'>

              <i class='bx ${isFavorite ? "bxs-heart" : "bx-heart"}'></i>
            </button>

           <div class="movie-poster">
              ${
                movie.details.Poster === "N/A"
                  ? `
                  <div class="movie-poster--default">
                    <i class='bx bx-image-alt'></i>
                  </div>
                `
                  : `
                  <img src="${movie.details.Poster}" alt="${movie.Title}" />
                `
              }
            </div>

            <div class="movie-container">
              <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <div class="movie-details">
                  <p class="movie-runtime">
                    <i class='bx bx-time' ></i>
                    <span>${
                      movie.details.Runtime !== "N/A"
                        ? movie.details.Runtime
                        : "0 min"
                    }</span>
                  </p>
                  <p class="movie-rating">
                    <i class='bx bx-star'></i>
                    <span>${
                      movie.details.imdbRating !== "N/A"
                        ? movie.details.imdbRating
                        : 0
                    } / 10</span>
                  </p>
                </div>

                <div class="movie-content multi-ellipsis">${
                  movie.details.Plot !== "N/A"
                    ? movie.details.Plot
                    : "Description not available"
                }</div>
              
                <div class="btn-wrap">
                  <a href="detail.html?imdbID=${
                    movie.imdbID
                  }" class="btn-primary movie-btn-detail">
                    <i class='bx bx-detail' ></i>
                    <span>VIEW DETAILS</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    initializeSwiper(".swiper");

    // 좋아요 버튼
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach((button) => {
      handleFavoriteButton(button);
    });

    hideLoading();
  } else {
    console.error("movies fetch 에러", data);
  }
};
