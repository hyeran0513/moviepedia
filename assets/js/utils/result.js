import { initializeWeb } from "./main.js";
import { createCard } from "../components/card.js";
import { getMovies } from "../api/fetch-movie.js";

document.addEventListener("DOMContentLoaded", async () => {
  initializeWeb();

  const url = new URL(window.location.href);
  const movieTitle = url.searchParams.get("title");
  const movieYear = url.searchParams.get("year");

  try {
    const resultMovies = await getMovies(movieTitle, movieYear);
    createCard(resultMovies, "result");
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});
