export const createMovieHTML = (movieData) => {
  document.querySelector(".movie-detail__info-list").innerHTML = [
    { term: "Rating", value: movieData.imdbRating },
    { term: "Release Date", value: movieData.Released },
    {
      term: "Genres",
      value:
        movieData.Genre === "N/A"
          ? "no information"
          : movieData.Genre.split(",")
              .map(
                (genre) =>
                  `<li class="movie-detail__genre-item">${genre.trim()}</li>`
              )
              .join(""),
    },
    { term: "Duration", value: movieData.Runtime },
    { term: "Cast", value: movieData.Actors },
    { term: "Director", value: movieData.Director },
  ]
    .map(
      ({ term, value }) => `
    <div class="movie-detail__info-item">
      <h4 class="movie-detail__term">${term}</h4>
      <div class="movie-detail__definition">${
        term === "Genres"
          ? `<ul class="movie-detail__genre-list">${value}</ul>`
          : value === "N/A"
          ? "no information"
          : value
      }</div>
    </div>
  `
    )
    .join("");
};
