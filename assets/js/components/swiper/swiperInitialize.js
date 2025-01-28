import { toggleFavoriteIcon } from "../button/favoriteButton.js";

export const initializeSwiper = (containerSelector) => {
  const swiper = new Swiper(containerSelector, {
    effect: "coverflow",
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 300,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: {
      delay: 3000,
    },
    grabCursor: true,
  });

  // 슬라이드 변경 시 찜 버튼 상태 업데이트
  swiper.on("slideChange", () => {
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach((button) => {
      const imdbId = button.dataset.imdbId;
      const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
      const isFavorite = favorites.includes(imdbId);

      toggleFavoriteIcon(button, isFavorite);
    });
  });

  return swiper;
};
