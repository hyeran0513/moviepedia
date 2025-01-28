export const initializeSwiper = (containerSelector) => {
  return new Swiper(containerSelector, {
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
};
