import { loadSearchModal } from './search-modal.js';

export const loadHeader = () => {
  const url =
    window.location.hostname === "hyeran0513.github.io"
      ? "/moviepedia/components/header.html"
      : "/components/header.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // 로고
      const logoLink = document.querySelector(".logo");
      const logoImg = document.querySelector(".logo-img");

      logoImg.src = `${window.baseUrl}assets/images/icon/logo.svg`;
      logoLink.href = `${window.baseUrl}`;

      // 검색 모달 실행
      loadSearchModal();
    })
    .catch((error) => console.error("헤더 fetch 오류:", error));
};