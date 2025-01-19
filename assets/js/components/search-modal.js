import { fetchExample } from "../api/fetch-example.js";

export const loadSearchModal = () => {
  const url =
    window.location.hostname === "hyeran0513.github.io"
      ? "/moviepedia/components/searchModal.html"
      : "/components/searchModal.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("searchModal").innerHTML = data;

      // 검색 모달
      const closeButton = document.getElementById("closeButton");
      const searchButton = document.getElementById("searchButton");

      // 검색 모달 열기
      searchButton.addEventListener("click", () => {
        searchModal.style.display = "flex";
      });

      // 검색 모달 닫기
      closeButton.addEventListener("click", () => {
        searchModal.style.display = "none";
      });

      // 검색 모듈 로직 실행
      initializeSearchModule();
    })
    .catch((error) => console.error("모달 fetch 오류:", error));
};

// DOM 변화를 감지하기 위한 MutationObserver
function initializeSearchModule() {
  const searchModal = document.getElementById("searchModal");

  if (!searchModal) {
    console.error("searchModal 요소를 찾을 수 없습니다.");
    return;
  }

  const observer = new MutationObserver(() => {
    const searchTarget = document.querySelector(".modal-search__title");
    if (searchTarget) {
      observer.disconnect(); // 감지 중단
      setupSearchHandler(searchTarget);
    }
  });

  observer.observe(searchModal, { childList: true, subtree: true });
}

function setupSearchHandler(searchTarget) {
  searchTarget.addEventListener("keyup", async (e) => {
    console.log("event: ", e);
    console.log("입력한 제목: ", searchTarget.innerHTML);

    try {
      if (!searchTarget.value) {
        console.log("입력한 제목이 없음");
        return;
      }

      console.log("입력한 제목: ", searchTarget.value);
      const result = await fetchExample(searchTarget.value);

      console.log("결과: ", result);
    } catch (error) {
      console.error("예외 상황 발생: ", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadSearchModal(); // DOMContentLoaded 이벤트에서 검색 모달 로드
});