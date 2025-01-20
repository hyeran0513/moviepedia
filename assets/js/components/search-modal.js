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
      let existSearch = false, existDelete = false;
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


// 사용자가 추가로 키를 입력하면 중단
let controller = new AbortController();

async function setupSearchHandler(searchTarget) {
  
  const list = document.querySelector('.modal-search__list');
  list.innerHTML = '';

  searchTarget.addEventListener("keyup", async (e) => {
    try {
      if (!searchTarget.value) {
        return;
      }

      controller.abort();
      const result = await movieSearch.getMovieByTitle(searchTarget.value)
      
      console.log("결과: ", result);

      let searchResult = await setupMovieContents(result).then();
      console.log("결과 포맷팅 : " , searchResult );
      
      list.innerHTML = searchResult;
    } catch (error) {
      console.error("예외 상황 발생: ", error , " m : " , error.message);
    }
  });
}

async function setupMovieContents( jsonData ){
  let element = '';
  if( !jsonData.movies ){
    element = `<p class="modal-search__alert">
                  Movie not founded.
               </p>`;
    return element;
  }

  try{
    for( const movie of jsonData.movies){
        console.log( movie);
      let runTime = await ( movieSearch.getMovieByImdbID(movie.imdbID) );
      
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
                  ${ runTime.Runtime }
                </p>
              </div>

            </div>

          </div>
      `;
    }

    return element;
  }catch(error) { 
    console.error( "상세정보 출력 중 오류 발생 : " + error);
  }
}

function searchTitleInit(){
  const deleteButton = document.querySelector(".modal-search__delete");
  const inputBox = document.querySelector(".modal-search__title");

  deleteButton.addEventListener('click' , () =>{
    inputBox.value = '';
  });
}


const handleScroll = () => {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  
  // 현재 스크롤 위치와 화면 높이, 전체 문서 높이를 계산하여
  // 사용자가 페이지 하단에 도달했는가를 물어보는 조건
  if(scrollTop + clientHeight >= scrollHeight -5){
    currentPage++;
    total +=limit;
    loadPosts(currentPage, limit);
    return;
  }
}