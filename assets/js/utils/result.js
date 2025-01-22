import { initializeWeb } from "./main.js";
import { createCard } from "../components/card.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeWeb();

  const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  createCard(favorites);
});
