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
  return data;
};