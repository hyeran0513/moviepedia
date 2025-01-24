import {
  setupSearchHandler,
  setFocus,
  searchTitleInit,
} from "./searchHandler.js";

// 로딩시 동작하는 부분 (모달 로딩 및 초기화)
export const loadSearchModal = () => {
  const url =
    window.location.hostname === "hyeran0513.github.io"
      ? "/moviepedia/components/searchModal.html"
      : "/components/searchModal.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("searchModal").innerHTML = data;

      // 검색 모달 관련 요소
      const closeButton = document.getElementById("closeButton");
      const searchButton = document.getElementById("searchButton");

      // 검색 모달 열기
      searchButton.addEventListener("click", () => {
        searchModal.classList.add("--active");
      });

      // 검색 모달 닫기
      closeButton.addEventListener("click", () => {
        searchModal.classList.remove("--active");
      });

      // 검색창 설정 및 포커스
      const searchTarget = document.querySelector(".search-input");
      if (searchTarget) {
        setupSearchHandler(searchTarget);
        setFocus();
      }

      // 삭제버튼 초기화
      const deleteButton = document.querySelector(".btn-delete");
      if (deleteButton) {
        searchTitleInit();
      }
    })
    .catch((error) => console.error("모달 fetch 오류:", error));
};
