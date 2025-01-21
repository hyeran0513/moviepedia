import * as movieSearch from "../api/fetch-movie.js";

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
      const searchTarget = document.querySelector(".modal-search__title");
      let existSearch = false,
        existDelete = false;
      if (searchTarget) {
        existSearch = true;
        setupSearchHandler(searchTarget);
        setFocus();
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
let currentPage = 1;

function setFocus() {
  const searchBar = document.querySelector('.modal-search');
  const searchText = document.querySelector('.modal-search__title')

  searchBar.addEventListener('click', () => {
    searchText.focus();
  });
}

// searchModal.html 로딩시 동작내용
async function setupSearchHandler(searchTarget) {
  const modalBody = document.querySelector(".modal-body");

  searchTarget.addEventListener("keyup", async (e) => {
    try {
      // addLoader(modalBody);
      if (!searchTarget.value) {
        return;
      }

      // 사용자가 추가로 키를 입력하면 중단
      // let controller = new AbortController();
      // let signal = controller.signal;
      // controller.abort();
      currentPage = 1;

      const result 
        = await movieSearch.getMovieByTitle( searchTarget.value, "" , currentPage, {
          // signal
        } );
      let searchResult 
        = await setupMovieContents(result, { 
          // signal
         });

      if( ! modalBody.querySelector('.modal-search__list')){
        addList(modalBody);
      }
      
      const list = modalBody.querySelector('.modal-search__list');
      console.log(list);
      console.log(searchResult);
      list.innerHTML = searchResult;
      
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("요청 취소 확인");
        console.error("예외 상황 발생: ", error, " m : ", error.message);
      }
    }
  });
}

// 검색된 영화를 html요소로 반환
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

// 삭제버튼 클릭시 영화 제목 초기화
function searchTitleInit() {
  const deleteButton = document.querySelector(".modal-search__delete");
  const inputBox = document.querySelector(".modal-search__title");

  deleteButton.addEventListener("click", () => {
    inputBox.value = "";
  });
}

// 검색된 영화 리스트의 스크롤 이벤트
const handleScroll = async () => {
  // const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // console.log( " scrollTop " , scrollTop);

  // // 현재 스크롤 위치와 화면 높이, 전체 문서 높이를 계산하여
  // // 사용자가 페이지 하단에 도달했는가를 물어보는 조건
  // // 검색모달의 스크롤 바가 아니라 창의 스클롤바를 검색함
  // if (scrollTop + clientHeight >= scrollHeight - 5) {
  //   console.log("검색창의 스크롤의 최하단에 도착함");
  //   currentPage++;
  //   await loadPosts(currentPage);
  //   return;
  // }

  const list = document.querySelector('.modal-search__list');

  // let y = list.scrollTop; // 현재 스크롤 위치
  
  console.log( "list.scrollTop : " , list.scrollTop );
  //스크롤 높이인데 이게 요소의 스크롤 높이는 아닌 것 같음.
  // 요소의 스크롤이 맨 아래에 닿아도 더이상 닿을수 없는 값임.
  //  스크롤 최하위치 : 806
  //  스크롤 높이 : 1140
  // 아마도 모달차의 높이로 예상됨.
  console.log( "list.scrollHeight : " , list.scrollHeight ); 
  // console.log( "list.clientTop : " , list.clientTop ); // 모달창 modal-search__list 요소의 부모요소의 위치에서 시작위치로 예상됨
  // console.log( "list.clientHeight : " , list.clientHeight );  // 모달창 modal-search__list 요소의 높이로 예상됨

  if( list.scrollHeight - list.scrollTop <  500  ){
    console.log( 
      "list.scrollHeight - list.scrollTop <  list.clientHeight : ",list.scrollHeight - list.scrollTop
    );
    loadPosts(currentPage++ );
    console.log("loadPosts 동작");
  }
  /*
  scrollHeight
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
scrollHeight은 padding 영역까지 포함한 element의 높이입니다.

  clientHeight
https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
박스 모델에서 padding + content 를 포함한 높이이나, 최댓값은 현재 사용자에게 보여지는 부분의 높이로 한정됩니다.
  */
};

async function loadPosts(currentPage) {
  const searchTarget = document.querySelector(".modal-search__title");

  const list = document.querySelector(".modal-search__list");

  let movies = await movieSearch.getMovieByTitle(
    searchTarget.value,
    "",
    currentPage,
    {}
  );

  let result = movies;
  let searchResult = await setupMovieContents(result, {} );

  list.innerHTML += searchResult;
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
    list.addEventListener('scroll' , handleScroll );

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
