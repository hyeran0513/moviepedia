export const createSwiperHtml = (movie) => {
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
            <div class="movie-type">${movie.Type}</div>

          <h3 class="movie-title">${movie.Title}</h3>
          <div class="movie-details">
            <p class="movie-runtime">
              <i class='bx bx-time'></i>
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
              <i class='bx bx-detail'></i>
              <span>VIEW DETAILS</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
};
