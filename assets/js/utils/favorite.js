import { initializeWeb } from "./main.js";
import { createFavoriteCards } from "../components/card/cardFavorite.js";
import { setupFilterHandlers } from "../components/filter/filter.js";
import { fetchMoviesByIds } from "../api/movie.js";
import { handleMoreButton } from "../components/button/favoriteMoreButton.js";

initializeWeb();

// 찜 목록 데이터를 가져와 카드 생성
const imdbIDs = JSON.parse(sessionStorage.getItem("favorites")) || [];
const movies = await fetchMoviesByIds(imdbIDs);

createFavoriteCards(movies);

// 필터 이벤트 핸들러 및 더보기 버튼 설정
setupFilterHandlers();
handleMoreButton();
