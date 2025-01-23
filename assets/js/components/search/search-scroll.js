import { getMovies } from "../../api/movie.js";
import { setupMovieContents } from "./movie-display.js";

export let currentPage = 1;
export let limit = 10;
export let total = 10;
let isLoding = false;

// 검색된 영화 리스트의 스크롤 이벤트
export const handleScroll = async (event) => {
  console.log("handleScroll 동작");
  const list = event.target;
  
  console.log( "list.scrollHeight : " , list.scrollHeight );
  console.log("list.scrollTop : " , list.scrollTop);
  if (list.scrollHeight - list.scrollTop < 500 
      && total > currentPage * limit
      && !isLoding ) {
    await loadPosts();
  }
};

export function setTotal( input ){
  total = input;
}

// 스크롤시 추가 로딩
export async function loadPosts() {
  console.log("로딩 포스트 동작");
  try{
    currentPage++;
    isLoding = true;
    console.log("추가 로딩 플래그를 올렸음");
    const searchTarget = document.querySelector(".search-input");
    const list = document.querySelector(".movie__list");
    console.log("검색할 페이지 : " , currentPage);
    let result = await getMovies(
      searchTarget.value,
      "",
      currentPage,
      limit
    );
    console.log("데이터 갖고왔음");
    let searchResult = await setupMovieContents(result);
    console.log("데이터 셋업 했음");
    
    list.innerHTML += searchResult;
    console.log("데이터 추가 했음");
  }catch(error){
    console.error("추가 호출 중 에러 발생 : " + error);
  }finally{
    isLoding = false;
    console.log("추가 로딩 플래그를 내렸음");
  }
}

export const initCurrentPage = () => {
  currentPage = 1;
}