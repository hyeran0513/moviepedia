import config from "../config/config.js";
import { showLoading, hideLoading } from "../components/common/loader.js";

// 고해상도 이미지 URL로 변경
const getHighResImageUrl = (posterUrl) => {
  // SX300 -> SX5000으로 변경하여 고해상도 이미지 URL로 변경
  return posterUrl.replace("SX300", "SX5000");
};

// 영화 상세 정보 조회
export const getMovieDetails = async (imdbID, skipLoading = false) => {
  try {
    if (!skipLoading) {
      showLoading();
    }

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
  } finally {
    if (!skipLoading) {
      hideLoading();
    }
  }
};

// 영화 검색 결과 조회
export const getMovies = async (
  title,
  year = "",
  page = 1,
  limit = 0,
  skipLoading = false
) => {
  const s = `&s=${encodeURIComponent(title)}`;
  const y = `&y=${year}`;
  const p = `&page=${page}`;

  try {
    if (!skipLoading) {
      showLoading();
    }

    const res = await fetch(
      `https://omdbapi.com/?apikey=${config.API_KEY}${s}${y}${p}`
    );

    const json = await res.json();

    if (json.Response === "True") {
      const { Search: movies, totalResults } = json;

      const limitedMovies = limit > 0 ? movies.slice(0, limit) : movies;

      const moviesWithDetails = await Promise.all(
        limitedMovies.map(async (movie) => {
          const movieDetails = await getMovieDetails(movie.imdbID, skipLoading);
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
  } finally {
    if (!skipLoading) {
      hideLoading();
    }
  }
};

// ID 리스트로 영화 정보 조회
export const fetchMoviesByIds = async (ids, skipLoading = false) => {
  try {
    if (!skipLoading) {
      showLoading();
    }

    const movies = [];

    for (const id of ids) {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${config.API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        movies.push(data);
      }
    }

    return movies;
  } catch (error) {
    console.log(error);
  } finally {
    if (!skipLoading) {
      hideLoading();
    }
  }
};
