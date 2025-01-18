import { fetchMovie } from "../api/fetch-movie.js";

export const initializeSwiper = (containerSelector) => {
  return new Swiper(containerSelector, {
    effect: 'fade',
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
};

export const renderSwiperMovies = async () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const data = await fetchMovie("ironman");

  if (data.movies) {
    swiperWrapper.innerHTML = data.movies
      .map((movie) => {
        return `
          <div class="swiper-slide">
            <div class="movie-poster">
              ${movie.details.Poster === 'N/A' ? `
                <div class="movie-poster--default">
                  <i class='bx bx-image-alt'></i>
                </div>
              ` : `
                <img src="${movie.details.Poster}" alt="${movie.Title}" />
              `}
            </div>

            <div class="movie-container">
              <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <div class="movie-details">
                  <p class="movie-runtime">
                    <i class='bx bx-time' ></i>
                    <span>${movie.details.Runtime !== "N/A" ? movie.details.Runtime : "0 min"}</span>
                  </p>
                  <p class="movie-rating">
                    <i class='bx bx-star'></i>
                    <span>${movie.details.imdbRating !== "N/A" ? movie.details.imdbRating : 0} / 10</span>
                  </p>
                </div>

                <div class="movie-content">${movie.details.Plot !== "N/A" ? movie.details.Plot : "Description not available"}</div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    initializeSwiper(".swiper-container");
  } else {
    console.error("movies fetch 에러", data);
  }
};
