import { initializeWeb } from "./main.js";
import { renderSwiperMovies } from "../components/swiper.js";
import { createYearOptions } from "../components/select.js";
import {
  submitForm,
  deleteTitle,
  toggleDeleteButton,
} from "../components/search-form.js";

document.addEventListener("DOMContentLoaded", () => {
  // 웹 초기화 설정
  initializeWeb();

  // 스와이퍼 무비 렌더링
  renderSwiperMovies();

  // 셀렉트 박스 옵션 설정 (1900년 ~ 현재 연도)
  createYearOptions("selectYear", 1900);

  // searchForm의 제출 버튼을 눌렀을 때 검색어와 선택된 년도 파라미터로 넘겨줌
  document.getElementById("searchForm").addEventListener("submit", submitForm);

  // 타이틀 검색 삭제 버튼
  document.querySelector(".btn-del").addEventListener("click", deleteTitle);

  // 검색 삭제 버튼 노출 토글
  toggleDeleteButton();
});
