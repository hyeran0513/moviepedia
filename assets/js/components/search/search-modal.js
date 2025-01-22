import * as movieSearch from "../../api/movie.js";

// 로딩시 동작내용
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

      // 검색 모듈 로직 실행전 서치 모달창 입력창 등록
      const searchTarget = document.querySelector(".search-input");
      let existSearch = false;
      let existDelete = false;

      if (searchTarget) {
        existSearch = true;
        setupSearchHandler(searchTarget);
        setFocus();
      }

      // 검색 모듈 로직 실행전 서치 모달창 삭제버튼 등록
      const deleteButton = document.querySelector(".btn-del");

      if (deleteButton) {
        existDelete = true;
        searchTitleInit();
      }
    })
    .catch((error) => console.error("모달 fetch 오류:", error));
};

// 서치모달 스크롤시 추가 검색용도의 프로퍼티
let now = 10;
let total = 10;
let limit = 10;
let currentPage = 1;

const setFocus = () => {
  const searchBar = document.querySelector(".search-container");
  const searchText = document.querySelector(".search-input");

  searchBar.addEventListener("click", () => {
    searchText.focus();
  });
};

// searchModal.html 로딩시 동작내용
const setupSearchHandler = async (searchTarget) => {
  const modalBody = document.querySelector(".modal-container");
  const noData = document.querySelector(".no-data");

  searchTarget.addEventListener("keyup", async (e) => {
    try {
      // addLoader(modalBody);
      if (!searchTarget.value.trim()) {
        noData.style.display = "flex";
        removeList(modalBody);
        return;
      }

      // 사용자가 추가로 키를 입력하면 중단
      // let controller = new AbortController();
      // let signal = controller.signal;
      // controller.abort();

      // 추가로 키를 입력시 시작 검색페이지 초기화
      currentPage = 1;

      const result = await movieSearch.getMoviesByOptions(
        searchTarget.value,
        currentPage,
        limit
      );

      total = result.totalResults;

      // 데이터가 없을 경우 no-data 표시, 리스트 제거
      if (!result.movies || result.movies.length === 0) {
        noData.style.display = "flex";
        removeList(modalBody);
        return;
      }

      if (!modalBody.querySelector(".movie__list")) {
        addList(modalBody);
      }

      noData.style.display = "none";
      const list = modalBody.querySelector(".movie__list");
      const searchResult = await setupMovieContents(result);

      list.innerHTML = searchResult;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("요청 취소 확인");
      }
      console.error("예외 상황 발생: ", error, " m : ", error.message);
    }
  });
};

// 검색된 영화를 html요소로 반환
const setupMovieContents = async (jsonData) => {
  if (!jsonData.movies || jsonData.movies.length === 0) {
    return "";
  }

  let element = "";

  try {
    for (const movie of jsonData.movies) {
      element += `
          <div class="movie__item">
            <div class="movie__poster">
              <img src="${movie.Poster}" alt="" />
            </div>

            <div class="movie__info">
              <p class="movie__info-title">
                ${movie.Title}
              </p>

              <div class="movie__info-details">
                <p class="movie__info-year">
                  ${movie.Year}
                </p>

                <p class="movie__info-runtime">
                  <i class='bx bx-time'></i>
                  ${movie.details.Runtime}
                </p>
              </div>
            </div>
          </div>
      `;
    }

    return element;
  } catch (error) {
    console.error("상세정보 출력 중 오류 발생 : " + error);
  }
};

// 삭제버튼 클릭시 영화 제목 초기화
const searchTitleInit = () => {
  const deleteButton = document.querySelector(".btn-del");
  const inputBox = document.querySelector(".search-input");

  deleteButton.addEventListener("click", () => {
    inputBox.value = "";
  });
};

// 검색된 영화 리스트의 스크롤 이벤트
const handleScroll = async () => {
  const list = document.querySelector(".movie__list");

  if (list.scrollHeight - list.scrollTop < 500 && total > currentPage * limit) {
    await loadPosts();
  }
};

const loadPosts = async () => {
  currentPage++;

  const searchTarget = document.querySelector(".search-input");

  const list = document.querySelector(".movie__list");

  let result = await movieSearch.getMoviesByOptions(
    searchTarget.value,
    currentPage,
    limit
  );

  let searchResult = await setupMovieContents(result);

  list.innerHTML += searchResult;
};

// 로딩 애니메이션이 적용될 요소에 사용
// 로딩 애니메이션은 입력된 html 요소의 자식으로 등록됨
const addLoader = (HTMLElement) => {
  if (!HTMLElement.querySelector(".loading")) {
    let context = `
      <div class='loading'>
        <div class='dot'></div>
        <div class='dot'></div>
        <div class='dot'></div>
      </div>
    `;

    HTMLElement.innerHTML += context;
  }
};

// 로딩 애니메이션이 삭제될 요소에 사용
// 로딩 애니메이션은 요소의 자식에서 삭제됨
const removeLoader = (HTMLElement) => {
  const loader = HTMLElement.querySelector(".loading");
  HTMLElement.removeChild(loader);
};

// 모달창에 검색결과 추가
const addList = (modalBody) => {
  if (!modalBody.querySelector(".movie__list")) {
    const list = document.createElement("div");
    list.classList.add("movie__list");
    list.classList.add("scroll");

    modalBody.appendChild(list);
  }
};

// 모달창에 검색결과 삭제
const removeList = (modalBody) => {
  if (modalBody.querySelector(".movie__list")) {
    const list = modalBody.querySelector(".movie__list");

    modalBody.removeChild(list);
  }
};
