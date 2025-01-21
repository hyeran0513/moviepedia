import config from "../config/config.js";

// 고해상도 이미지 URL로 변경
const getHighResImageUrl = (posterUrl) => {
  // SX300 -> SX5000으로 변경하여 고해상도 이미지 URL로 변경
  return posterUrl.replace("SX300", "SX5000");
};

// 영화 상세 정보 조회
const getMovieDetails = async (imdbID) => {
  try {
    const res = await fetch(
      `https://omdbapi.com/?apikey=${config.API_KEY}&i=${imdbID}`
    );
    const movieDetails = await res.json();

    // 영화 상세 정보를 불러올 수 없으면 에러 처리
    if (movieDetails.Response === "False") {
      throw new Error(movieDetails.Error);
    }

    // 고해상도 이미지 URL을 추가
    if (movieDetails.Poster) {
      movieDetails.Poster = getHighResImageUrl(movieDetails.Poster);
    }

    return movieDetails;
  } catch (error) {
    console.error("영화 상세정보 fetch 오류", error);
    throw error;
  }
};

// 영화 검색 결과 조회
const getMovies = async (title, year = "", page = 1, limit = 0) => {
  const s = `&s=${encodeURIComponent(title)}`;
  const y = `&y=${year}`;
  const p = `&page=${page}`;

  try {
    const res = await fetch(
      `https://omdbapi.com/?apikey=${config.API_KEY}${s}${y}${p}`
    );

    const json = await res.json();

    if (json.Response === "True") {
      const { Search: movies, totalResults } = json;

      const limitedMovies = limit > 0 ? movies.slice(0, limit) : movies;

      const moviesWithDetails = await Promise.all(
        limitedMovies.map(async (movie) => {
          const movieDetails = await getMovieDetails(movie.imdbID);
          return {
            ...movie,
            details: movieDetails,
          };
        })
      );

      return {
        movies: moviesWithDetails,
        totalResults,
      };
    }

    return json.Error;
  } catch (error) {
    console.log(error);
  }
};

// 영화 제목으로 영화 목록 조회
export const fetchMovie = async (title) => {
  if (!title) {
    throw new Error("영화를 검색하려면 제목이 필요합니다.");
  }

  const data = await getMovies(title, "", 1, 6);
  return data;
};
