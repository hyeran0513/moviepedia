import { getMovies } from "../../api/movie.js";
import { setupMovieContents } from "./movieDisplay.js";
import { removeLoader, addLoaderEle } from "../common/loader.js";

export let currentPage = 1;
export let limit = 10;
export let total = 10;
let isLoding = false;

// 검색된 영화 리스트의 스크롤 이벤트
export const handleScroll = async (event) => {
  const list = event.target;

  if (
    list.scrollHeight - list.scrollTop < 500 &&
    total > currentPage * limit &&
    !isLoding
  ) {
    addLoaderEle(list);
    await loadPosts();
    removeLoader(list);
  }
};

export function setTotal(input) {
  total = input;
}

// 스크롤시 추가 로딩
export async function loadPosts() {
  try {
    currentPage++;
    isLoding = true;
    const searchTarget = document.querySelector(".search-input");
    const list = document.querySelector(".movie__list");
    let result = await getMovies(
      searchTarget.value,
      "",
      currentPage,
      limit,
      true
    );
    let searchResult = await setupMovieContents(result);

    list.innerHTML += searchResult;
  } catch (error) {
    console.error("추가 호출 중 에러 발생 : " + error);
  } finally {
    isLoding = false;
  }
}

export const initCurrentPage = () => {
  currentPage = 1;
};
