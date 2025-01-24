import { initializeWeb } from "./main.js";
import { createFavoriteCards } from "../components/card/cardFavorite.js";
import { setupFilterHandlers } from "../components/filter/filter.js";

initializeWeb();

// 찜 목록 데이터를 가져와 카드 생성
const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
createFavoriteCards(favorites);

// 필터 이벤트 핸들러 설정
setupFilterHandlers();
