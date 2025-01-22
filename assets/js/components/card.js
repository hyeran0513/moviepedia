export const itemsPerPage = 10;
export let currentIndex = 0;

export const handleNoData = (data) => {
  const noData = document.querySelector(".no-data");
  if (!data || data.length === 0) {
    noData.style.display = "flex";
  } else {
    noData.style.display = "none";
  }
};

export const createCardHTML = (item) => {
  return `
    <div class="card__item">
      <button type="button" class="btn-favorite" data-movie='${JSON.stringify(
        item
      )
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")}'>

        <i class='bx bxs-heart'></i>
      </button>

      <a href="/detail.html?imdbID=${item.imdbID}">
        <div class="card__poster">
          ${
            item.Poster === "N/A"
              ? `
              <div class="card__poster--default">
                <i class='bx bx-image-alt'></i>
              </div>
            `
              : `
              <img src="${item.Poster}" alt="${item.Title}" />
            `
          }
        </div>

        <p class="card__item-title multi-ellipsis">${item.Title}</p>

        <div class="card__item-details">
          <div>${item.Year}</div>
          <i class='bx bx-time' ></i>
          <div>${
            item.details.Runtime !== "N/A" ? item.details.Runtime : "0 min"
          }</div>
        </div>
      </a>
    </div>
  `;
};

export const displayCards = (data) => {
  const cardContainer = document.querySelector(".card");
  const cardsToDisplay = data.slice(currentIndex, currentIndex + itemsPerPage);

  const cardHTML = cardsToDisplay.map(createCardHTML).join("");
  cardContainer.insertAdjacentHTML("beforeend", cardHTML);

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

      const Newfavorites =
        JSON.parse(sessionStorage.getItem("favorites")) || [];
      createCard(Newfavorites);
    });
  });
};

export const handleMoreButton = (data) => {
  const btnMore = document.querySelector(".btn-more");

  btnMore.addEventListener("click", () => {
    currentIndex += itemsPerPage;
    displayCards(data);

    if (currentIndex >= data.length) {
      btnMore.style.display = "none";
    } else {
      btnMore.style.display = "block";
    }
  });

  if (currentIndex >= data.length || data.length <= 10) {
    btnMore.style.display = "none";
  } else {
    btnMore.style.display = "block";
  }
};

// 데이터 갱신 전에 기존 카드들을 삭제
export const createCard = (data) => {
  const cardContainer = document.querySelector(".card");
  cardContainer.innerHTML = "";

  // 새로 필터링된 데이터에 대해서는 처음부터 시작
  currentIndex = 0;

  handleNoData(data);
  displayCards(data);
  handleMoreButton(data);
};
