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
      
      const searchTarget = document.querySelector(".modal-search__title");
      let existSearch = false, existDelete = false;
      if (searchTarget) {
        console.log(" 검색 모듈 로직 실행전 서치 모달창 입력창 등록 완료");
        existSearch = true;
        setupSearchHandler(searchTarget);
      }
      
      const deleteButton = document.querySelector(".modal-search__delete");
      if (deleteButton) {
        console.log("검색 모듈 로직 실행전 서치 모달창 삭제버튼 등록 완료");
        existDelete = true;
        searchTitleInit();
      }

      // 검색 모듈 로직 실행
      // initializeSearchModule();
    })
    .catch((error) => console.error("모달 fetch 오류:", error));
};

// DOM 변화를 감지하기 위한 MutationObserver
// function initializeSearchModule() {
//   const searchModal = document.getElementById("searchModal");

//   if (!searchModal) {
//     console.error("searchModal 요소를 찾을 수 없습니다.");
//     return;
//   }

//   const observer = new MutationObserver(() => {
//     const searchTarget = document.querySelector(".modal-search__title");
//     let existSearch = false, existDelete = false;
//     if (searchTarget) {
//       console.log("서치 모달창 입력창 등록 완료");
//       existSearch = true;
//       setupSearchHandler(searchTarget);
//     }
//     const deleteButton = document.querySelector(".modal-search__delete");
//     if (deleteButton) {
//       console.log("서치 모달창 삭제버튼 등록 완료");
//       existDelete = true;
//       searchTitleInit();
//     }

//     if(existSearch && existDelete ){
//       observer.disconnect();
//     }
//   });

//   observer.observe(searchModal, { childList: true, subtree: true });
// }

function setupSearchHandler(searchTarget) {
  
  const list = document.querySelector('.modal-search__list');
  list.innerHTML = '';

  searchTarget.addEventListener("keyup", async (e) => {
    try {
      if (!searchTarget.value) {
        // console.log("입력한 제목이 없음");
        return;
      }

      // console.log("입력한 제목: ", searchTarget.value);
      const result = await movieSearch.getMovieByTitle(searchTarget.value);

      console.log("결과: ", result);
      list.innerHTML = setupMovieContents(result);
    } catch (error) {
      console.error("예외 상황 발생: ", error);
    }
  });
}

// DOMContentLoaded 이벤트에서 검색 모달 로드
// document.addEventListener("DOMContentLoaded", () => {
//   loadSearchModal();
// });

function setupMovieContents( jsonData ){
  let element = ``;
  if( !jsonData.movies ){
    element = `<p class="modal-search__alert">
                  Movie not founded.
               </p>`;
    return element;
  }

  jsonData.movies.forEach( movie => {
    // console.log( await movieSearch.getMovieByImdbID( movie.imdbID));
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
                99m
              </p>
            </div>
          </div>
        </div>
    `;
  });
  return element;
}

function searchTitleInit(){
  const deleteButton = document.querySelector(".modal-search__delete");
  const inputBox = document.querySelector(".modal-search__title");

  deleteButton.addEventListener('click' , () =>{
    inputBox.value = '';
  });
}