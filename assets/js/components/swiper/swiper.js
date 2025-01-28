import { getMovies } from "../../api/movie.js";
import { handleFavoriteButton } from "../button/favoriteButton.js";
import { showLoading, hideLoading } from "../common/loader.js";
import { initializeSwiper } from "./swiperInitialize.js";
import { createSwiperHtml } from "./swiperHtml.js";

export const renderSwiperMovies = async () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  try {
    const data = await getMovies("mini", "", 1, 9, true);

    showLoading();

    if (data.movies) {
      swiperWrapper.innerHTML = data.movies.map(createSwiperHtml).join("");

      initializeSwiper(".swiper");

      // 좋아요 버튼
      const favoriteButtons = document.querySelectorAll(".favorite-button");

      favoriteButtons.forEach((button) => {
        handleFavoriteButton(button);
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    requestAnimationFrame(() => {
      hideLoading();
    });
  }
};
