import * as movieSearch from "../api/fetch-movie.js";

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
      const searchTarget = document.querySelector(".modal-search__title");
      let existSearch = false,
        existDelete = false;
      if (searchTarget) {
        existSearch = true;
        setupSearchHandler(searchTarget);
      }

      // 검색 모듈 로직 실행전 서치 모달창 삭제버튼 등록
      const deleteButton = document.querySelector(".modal-search__delete");
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

async function setupSearchHandler(searchTarget) {
  const modalBody = document.querySelector(".modal-body");

  // const list = document.querySelector('.modal-search__list');
  // list.innerHTML = '';

  searchTarget.addEventListener("keyup", async (e) => {
    try {
      addLoader(modalBody);
      // addLoader(modalBody);
      if (!searchTarget.value) {
        return;
      }

      // 사용자가 추가로 키를 입력하면 중단
      // let controller = new AbortController();
      // let signal = controller.signal;
      // controller.abort();

      const result 
        = await movieSearch.getMovieByTitle( searchTarget.value, {signal} );
      let searchResult 
        = await setupMovieContents(result, { signal }).then(
        () => {
          removeLoader(modalBody);
        }
      );

      addList(modalBody);

      list.innerHTML = searchResult;
      
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("요청 취소 확인");
        console.error("예외 상황 발생: ", error, " m : ", error.message);
      }
    }
  });
}

async function setupMovieContents(jsonData, options = {}) {
  let element = "";
  if (!jsonData.movies) {
    element = `<p class="modal-search__alert">
                  Movie not founded.
               </p>`;
    return element;
  }

  try {
    for (const movie of jsonData.movies) {
      // console.log( movie);
      let runTime = await movieSearch.getMovieByImdbID(movie.imdbID, options);

      element += `
          <div class="modal-search__ele">
            <div class="modal-search__ele__img">
              <img
                src="${movie.Poster}"
                alt="">
            </div>

            <div class="modal-search__ele__info">
              <p class="modal-search__ele__title">
                ${movie.Title}
              </p>

              <div class="modal-search__ele__desc">
                <p class="modal-search__ele__year">
                  ${movie.Year}
                </p>

                <p class="modal-search__ele__runtime">
                  <i class='bx bx-time'></i>
                  ${runTime.Runtime}
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
}

function searchTitleInit() {
  const deleteButton = document.querySelector(".modal-search__delete");
  const inputBox = document.querySelector(".modal-search__title");

  deleteButton.addEventListener("click", () => {
    inputBox.value = "";
  });
}

const handleScroll = async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // 현재 스크롤 위치와 화면 높이, 전체 문서 높이를 계산하여
  // 사용자가 페이지 하단에 도달했는가를 물어보는 조건
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    currentPage++;
    await loadPosts(currentPage);
    return;
  }
};

async function loadPosts(currentPage) {
  let movies = await movieSearch.getMovieByTitle(
    searchTarget.value,
    "",
    currentPage,
    { signal }
  );

  const list = document.querySelector(".modal-search__list");
}

// 로딩 애니메이션이 적용될 요소에 사용
// 로딩 애니메이션은 입력된 html 요소의 자식으로 등록됨
function addLoader(HTMLElement) {
  if (!HTMLElement.querySelector(".loading")) {
    let context = `
    <div class='loading'>
      <div></div>
      <div></div>
      <div></div>
    </div>
    `;

    HTMLElement.innerHTML += context;
  }
}

// 로딩 애니메이션이 삭제될 요소에 사용
// 로딩 애니메이션은 요소의 자식에서 삭제됨
function removeLoader(HTMLElement) {
  const loader = HTMLElement.querySelector(".loading");
  HTMLElement.removeChild(loader);
}

function addList(modalBody) {
  if (!modalBody.querySelector("modal-search__list")) {
    const list = document.createElement("div");
    list.classList.add("modal-search__list");

    modalBody.appendChild(list);

    console.log("모달 바디에 리스트 추가");
  }
}

function removeList(modalBody) {
  if (modalBody.querySelector(".modal-search__list")) {
    const list = modalBody.querySelector(".modal-search__list");

    modalBody.removeChild(list);

    console.log("모달 바디에 리스트 삭제");
  }
}
