import config from "../config/config.js";

const getMovies = async (title, year = "", page = 1) => {
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

      return {
        movies,
        totalResults,
      };
    }

    return json.Error;
  } catch (error) {
    console.log(error);
  }
};

export const fetchExample = async () => {
  const data = await getMovies("ironman");
  console.log(data);
  return data;
};

export const fetchMovieDetails = async (imdbID) => {
  if (!imdbID) {
    throw new Error("상세 정보를 가져오려면 IMDb ID가 필요합니다.");
  }

  try {
    const res = await fetch(
      `https://omdbapi.com/?apikey=${config.API_KEY}&i=${imdbID}`
    );

    const movieDetails = await res.json();
    
    // 받아온 데이터 확인하기
    console.log(JSON.stringify(movieDetails));

    if (movieDetails.Response === "False") {
      throw new Error(movieDetails.Error);
    }

    return movieDetails;
  } catch (error) {
    console.error("영화 상세정보 fetch 오류", error);
    throw error;
  }
};


export {getMovies};