export const createMovieHTML = (movieData) => {
  const movieDetailInfoList = document.querySelector(
    ".movie-detail__info-list"
  );

  const movieInfoItems = [
    { term: "Rating", definition: movieData.imdbRating },
    { term: "Release Date", definition: movieData.Released },
    {
      term: "Genres",
      definition:
        movieData.Genre === "N/A"
          ? "no information"
          : `<ul class="movie-detail__genre-list">${movieData.Genre.split(",")
              .map(
                (genre) =>
                  `<li class="movie-detail__genre-item">${genre.trim()}</li>`
              )
              .join("")}</ul>`,
    },
    { term: "Duration", definition: movieData.Runtime },
    { term: "Cast", definition: movieData.Actors },
    { term: "Director", definition: movieData.Director },
  ];

  movieDetailInfoList.innerHTML = movieInfoItems
    .map(
      (item) => `
        <div class="movie-detail__info-item">
          <h4 class="movie-detail__term">${item.term}</h4>
          <div class="movie-detail__definition">${
            item.term === "Genres"
              ? ""
              : item.definition === "N/A"
              ? "no information"
              : item.definition
          }</div>
        </div>
      `
    )
    .join("");
};
