export const createCardHTML = (movie) => {
  const { Title, Year, imdbID, Poster, Type } = movie;
  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  const isFavorite = favorites.includes(imdbID);

  return `
    <div class="card__item">
      <button type="button" class="favorite-button" data-imdb-id="${imdbID}">
        <i class='bx ${isFavorite ? "bxs-heart" : "bx-heart"}'></i>
      </button>
      <a href="detail.html?imdbID=${imdbID}">
        <div class="card__poster">
          ${
            Poster === "N/A"
              ? `<div class="card__poster--default"><i class='bx bx-image-alt'></i></div>`
              : `
                  <img src="${Poster}" 
                  alt="${Title}" 
                  onerror="this.outerHTML='<div class=\\'card__poster--default\\'><i class=\\'bx bx-image-alt\\'></i></div>'">`
          }
        </div>
        <p class="card__item-title multi-ellipsis">${Title}</p>
        <div class="card__item-details">
          <span>${Year}</span>
          <i class='bx bx-movie'></i>
          <span>${Type}</span>
        </div>
      </a>
    </div>
  `;
};
