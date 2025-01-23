export const createCardHTML = (item, favorites) => {
  const {
    Title,
    Year,
    imdbID,
    Poster,
    details: { Runtime = "N/A" } = {},
  } = item;

  const isFavorite = favorites.some((favorite) => favorite.imdbID === imdbID);

  return `
    <div class="card__item">
      <button type="button" class="btn-favorite" data-movie='${JSON.stringify(
        item
      )}' >
        <i class='bx ${isFavorite ? "bxs-heart" : "bx-heart"}'></i>
      </button>

      <a href="detail.html?imdbID=${imdbID}">
        <div class="card__poster">
          ${
            Poster === "N/A" || !Poster
              ? `
              <div class="card__poster--default">
                <i class='bx bx-image-alt'></i>
              </div>
            `
              : `
              <img src="${Poster}" alt="${Title}" />
            `
          }
        </div>

        <p class="card__item-title multi-ellipsis">${Title}</p>

        <div class="card__item-details">
          <div>${Year}</div>
          <i class='bx bx-time'></i>
          <div>${Runtime !== "N/A" ? Runtime : "0 min"}</div>
        </div>
      </a>
    </div>
  `;
};
