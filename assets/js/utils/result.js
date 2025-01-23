import { initializeWeb } from "./main.js";
import { createCard } from "../components/card/card-result.js";
import { getMovies } from "../api/movie.js";

initializeWeb();

const url = new URL(window.location.href);
const movieTitle = url.searchParams.get("title");
const movieYear = url.searchParams.get("year");

try {
  const resultMovies = await getMovies(movieTitle, movieYear);
  createCard(resultMovies);
} catch (error) {
  console.error("Error fetching movies:", error);
}
