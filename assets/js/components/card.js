import { fetchExample } from "../api/fetch-example.js";

export const displayMovies = async () => {
  const card = document.querySelector(".card");
  const data = await fetchExample();

  if (data.movies) {
    card.innerHTML = data.movies
      .map((movie) => {
        return `
          <div class="card-item">
            <div class="card-poster">
              <img src="${
                movie.Poster !== "N/A" ? movie.Poster : "대체 이미지 넣어 주세요."
              }" alt="${movie.Title}" />
            </div>
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
          </div>
        `;
      })
      .join("");
  } else {
    console.error("movies fetch 에러", data);
  }
};