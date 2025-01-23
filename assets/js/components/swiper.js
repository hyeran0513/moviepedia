import { fetchMovie } from "../api/fetch-movie.js";

export const initializeSwiper = (containerSelector) => {
  return new Swiper(containerSelector, {
    effect: "coverflow",
    autoplay: {
      delay: 3000,
    },
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
  });
};

export const renderSwiperMovies = async () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const data = await fetchMovie("mini");

  if (data.movies) {
    swiperWrapper.innerHTML = data.movies
      .map((movie) => {
        const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
        const isFavorite = favorites.some(
          (item) => item.imdbID === movie.imdbID
        );

        return `
          <div class="swiper-slide">
            <button type="button" class="btn-favorite" data-movie='${JSON.stringify(
              movie
            )}'>

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

    initializeSwiper(".swiper-container");

    const favoriteButtons = document.querySelectorAll(".btn-favorite");

    favoriteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const movieData = JSON.parse(button.dataset.movie);
        const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

        const isFavorite = favorites.some(
          (item) => item.imdbID === movieData.imdbID
        );

        if (isFavorite) {
          const updatedFavorites = favorites.filter(
            (item) => item.imdbID !== movieData.imdbID
          );
          sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
          favorites.push(movieData);
          sessionStorage.setItem("favorites", JSON.stringify(favorites));
        }

        // 하트 아이콘 업데이트
        const heartIcon = button.querySelector("i");
        heartIcon.classList.toggle("bxs-heart", !isFavorite);
        heartIcon.classList.toggle("bx-heart", isFavorite);
      });
    });
  } else {
    console.error("movies fetch 에러", data);
  }
};
