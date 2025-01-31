import { fetchMoviesByIds } from "../api/movie.js";

export const getFavoriteMovies = async () => {
  // localStorage IMDb ID 목록 조회
  const imdbIDs = JSON.parse(localStorage.getItem("favorites")) || [];
  // imdbID 리스트를 기반으로 영화를 조회
  return await fetchMoviesByIds(imdbIDs);
};

export const filterMoviesByTitle = (movies, title) => {
  return movies.filter((movie) =>
    // 영화 제목이 입력된 제목을 포함하는지 확인
    movie.Title.toLowerCase().includes(title.toLowerCase().trim())
  );
};
