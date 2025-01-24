import { setupMovieContents } from "./movie-display.js";
import { getMovies } from "../../api/movie.js";

import { removeLoader, addLoaderEle } from "../common/loader.js";

import { initCurrentPage, handleScroll, setTotal } from "./search-scroll.js";

// 검색할 영화 제목 입력시 
// 밀리세컨드 동안 입력 없는 경우 검색
let searchDelay = 1000;

// 초기 검색 애니메이션 할당 로직
let addingAnimation = false;

// 영화 검색 로직
let debounceTimer;

// 검색 결과 없을 때 처리
const handleNoData = (modalBody, noData) => {
  displayFlex(noData);
  removeList(modalBody);
};

const displayFlex = (HtmlElement) =>{
  HtmlElement.style.display = "flex";
}

// html 요소의 Display를 none으로 줌
const displayNone = (HtmlElement) => {
  HtmlElement.style.display = "none";
}

// 리스트를 추가하는 처리
const addMovieList = (modalBody) => {
  if (!modalBody.querySelector(".movie__list")) {
    const list = document.createElement("div");
    list.classList.add("movie__list");
    list.classList.add("scroll");

    list.addEventListener("scroll", handleScroll);
    
    modalBody.appendChild(list);
  }
};

const searchMovies = async (query) => {
  try {
    // 기존 타이머를 취소
    clearTimeout(debounceTimer);
    return new Promise((resolve, reject) => {
      debounceTimer = setTimeout(async () => {
        try {
          const result = await getMovies(query);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, searchDelay); // 1초 뒤 실행
    });
  } catch (error) {
    console.error("예외 상황 발생: ", error);
    return null;
  }
};

// 검색 입력 처리
export const setupSearchHandler = async (searchTarget) => {
  const modalBody = document.querySelector(".modal-container"); // 모달 컨테이너 선택
  const noData = document.getElementById("searchNoData"); // 데이터 없음 메시지 선택
  const noSearch = document.getElementById("searchForSomething"); // 검색값이 없을때

  displayFlex(noSearch);

  // 키 입력 이벤트 리스너 추가
  searchTarget.addEventListener("keyup", async (e) => {
    initCurrentPage();
   
    const searchValue = searchTarget.value.trim(); // 입력값의 공백을 제거한 값

    // 입력값이 비어있으면 데이터 없음 메시지 처리
    if (!searchValue || searchValue.length === 0) {
      removeList(modalBody);
      displayNone(noData);
      displayFlex(noSearch);
      return;
    }
    
    // 입력값이 비어있지 않다면 
    // list를 추가하고 로딩 애니메이션을 표출하기
    displayNone(noData);
    displayNone(noSearch);

    // 리스트 추가
    addMovieList( modalBody );

    // 애니메이션 표출 플래그 확인
    if ( !addingAnimation ) { 
      addingAnimation = true; // 애니메이션 표출 플래그 변경
      
      let ankers = modalBody.querySelector(".movie__list").querySelectorAll("a");
      ankers.forEach( anker => {
        anker.remove();
      })

      addLoaderEle( modalBody.querySelector(".movie__list") );
    }

    // 영화 검색 API 호출
    const result = await searchMovies(searchValue);

    // 검색 결과가 없으면 데이터 없음 처리 와 리스트 제거
    if (!result || !result.movies || result.movies.length === 0) {
      addingAnimation = false; // 애니메이션 표출 플래그 내림
      removeList( modalBody ); // 애니메이션을 표시하는 리스트를 제거

      displayNone(noSearch);
      handleNoData(modalBody, noData);
      return;
    }

     // 검색 결과가 있는상태
    if(result.movies ){
      addingAnimation = false; // 애니메이션 표출 플래그 변경
      removeLoader( modalBody.querySelector(".movie__list") ); // 리스트에서 애니메이션 제거
    }
    setTotal(result.totalResults);


    // 영화 목록에 검색 결과 추가
    const list = modalBody.querySelector(".movie__list");
    const searchResult = await setupMovieContents(result);
    list.innerHTML = searchResult;

  });
};

// 검색창 클릭 시 포커스를 설정
export const setFocus = () => {
  const searchBar = document.querySelector(".search-container");
  const searchText = document.querySelector(".search-input");

  searchBar.addEventListener("click", () => {
    searchText.focus();
  });
};

// 삭제버튼 클릭 시 영화 제목 초기화
export const searchTitleInit = () => {
  const deleteButton = document.querySelector(".btn-delete");
  const inputBox = document.querySelector(".search-input");

  const noSearch = document.getElementById("searchForSomething"); // 검색값이 없을때
  const modalBody = document.querySelector(".modal-container"); // 모달 컨테이너 선택
 
  deleteButton.addEventListener("click", () => {
    inputBox.value = "";
    displayFlex(noSearch);
    removeList(modalBody);
  });
};


// 검색 결과 리스트를 모달에서 제거하는 함수
const removeList = (modalBody) => {
  if (modalBody.querySelector(".movie__list")) {
    const list = modalBody.querySelector(".movie__list");

    modalBody.removeChild(list);
  }
};
