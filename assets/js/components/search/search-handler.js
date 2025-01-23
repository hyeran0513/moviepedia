import { setupMovieContents } from "./movie-display.js";
import { getMovies } from "../../api/movie.js";

import { removeLoader, addLoaderEle } from "../common/loader.js";

import { initCurrentPage, handleScroll, setTotal } from "./search-scroll.js";

// 검색 결과 없을 때 처리
const handleNoData = (modalBody, noData) => {
  noData.style.display = "flex";
  removeList(modalBody);
};

// 리스트를 추가하는 처리
const addMovieList = (modalBody) => {
  if (!modalBody.querySelector(".movie__list")) {
    addList(modalBody);
  }
};

// 초기 검색 애니메이션 할당 로직
let isMovieListExist = false;

// 영화 검색 로직
let debounceTimer;

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
      }, 3000); // 3초 뒤 실행
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

  // 키 입력 이벤트 리스너 추가
  searchTarget.addEventListener("keyup", async (e) => {
    initCurrentPage();

    // 초기 검색시에만 로딩 애니메이션이 적용됨.
    // 검색어를 변경할경우 애니메이션 미적용.
    if (!modalBody.querySelector("movie__list") && !isMovieListExist) {
      isMovieListExist = true;
      let listEle = document.createElement("div");
      listEle.classList.add("movie__list");
      listEle.classList.add("scroll");
      modalBody.appendChild(listEle);
      listEle.addEventListener("scroll", handleScroll);
      addLoaderEle(listEle);
    }

    const searchValue = searchTarget.value.trim(); // 입력값의 공백을 제거한 값

    // 입력값이 비어있으면 데이터 없음 메시지 처리
    if (!searchValue) {
      handleNoData(modalBody, noData);
      return;
    }

    // 영화 검색 API 호출
    const result = await searchMovies(searchValue);

    // 검색 결과가 없으면 데이터 없음 처리
    if (!result || !result.movies || result.movies.length === 0) {
      handleNoData(modalBody, noData);
      return;
    }
    console.log(result);

    setTotal(result.totalResults);

    // 영화 리스트를 추가하고 데이터 없음 메시지를 숨김
    addMovieList(modalBody);
    noData.style.display = "none";

    // 영화 목록에 검색 결과 추가
    const list = modalBody.querySelector(".movie__list");
    const searchResult = await setupMovieContents(result);
    list.innerHTML = searchResult;
    removeLoader(list);
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

  deleteButton.addEventListener("click", () => {
    inputBox.value = "";
  });
};

// 검색 결과 리스트를 모달에 추가하는 함수
const addList = (modalBody) => {
  if (!modalBody.querySelector(".movie__list")) {
    const list = document.createElement("div");
    list.classList.add("movie__list");
    list.classList.add("scroll");

    modalBody.appendChild(list);

    list.addEventListener("scroll", handleScroll);
  }
};

// 검색 결과 리스트를 모달에서 제거하는 함수
const removeList = (modalBody) => {
  if (modalBody.querySelector(".movie__list")) {
    const list = modalBody.querySelector(".movie__list");

    modalBody.removeChild(list);
  }
};
