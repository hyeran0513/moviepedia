import { handleFavoriteButton } from "./favoriteButton.js";

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
  const {
    Title,
    Year,
    imdbID,
    Poster,
    details: { Runtime = "N/A" } = {},
  } = item;

  return `
    <div class="card__item">
      <button type="button" class="btn-favorite" data-movie='${JSON.stringify(
        item
      )
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")}' >
        <i class='bx bxs-heart'></i>
      </button>

      <a href="/detail.html?imdbID=${imdbID}">
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

export const displayCards = (data, type) => {
  const cardContainer = document.querySelector(".card");

  // 찜 목록 페이지
  if (type === "favorite") {
    const cardsToDisplay = data.slice(
      currentIndex,
      currentIndex + itemsPerPage
    );

    const cardHTML = cardsToDisplay.map(createCardHTML).join("");
    cardContainer.insertAdjacentHTML("beforeend", cardHTML);

    const favoriteButtons = document.querySelectorAll(".btn-favorite");

    favoriteButtons.forEach((button) => {
      handleFavoriteButton(button, createCard);
    });
  }

  // 결과 페이지
  if (type === "result") {
    const cardHTML = data.movies.map(createCardHTML).join("");
    cardContainer.innerHTML = cardHTML;
  }
};

export const handleMoreButton = (data, type) => {
  const btnMore = document.querySelector(".btn-more");

  // 찜 목록 페이지
  if (type === "favorite") {
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
  }
};

// 데이터 갱신 전에 기존 카드들을 삭제
export const createCard = (data, type) => {
  const cardContainer = document.querySelector(".card");
  cardContainer.innerHTML = "";

  // 새로 필터링된 데이터에 대해서는 처음부터 시작
  currentIndex = 0;

  handleNoData(data);
  displayCards(data, type);
  handleMoreButton(data, type);
};
