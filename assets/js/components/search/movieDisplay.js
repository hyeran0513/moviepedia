export const setupMovieContents = async (jsonData) => {
  if (!jsonData.movies || jsonData.movies.length === 0) {
    return "";
  }

  let element = "";

  try {
    for (const movie of jsonData.movies) {
      element += `
        <a href="detail.html?imdbID=${movie.imdbID}">
          <div class="movie__item">
            <div class="movie__poster">
              ${
                movie.Poster.indexOf("N/A") > -1
                  ? "<i class='bx bx-image-alt'></i>"
                  : `<img src="${movie.Poster}" onerror="this.outerHTML='<i class=\\'bx bxs-image-alt\\'></i>'">`
              }
            </div>

            <div class="movie__info">
              <p class="movie__info-title single-ellipsis">
                ${movie.Title}
              </p>

              <div class="movie__info-details">
                <p class="movie__info-year">
                  ${movie.Year}
                </p>

                <p class="movie__info-type">
                  <i class='bx bx-movie' ></i>
                  ${movie.Type}
                </p>
              </div>
            </div>
          </div>
        </a>
      `;
    }

    return element;
  } catch (error) {
    console.error("상세정보 출력 중 오류 발생 : " + error);
  }
};
