import { initializeWeb } from "./main.js";
import { renderSwiperMovies } from "../components/swiper/swiper.js";
import { initializeFormHandler } from "../components/form/mainForm.js";
import { showLoading } from "../components/common/loader.js";

// 로딩 표시
showLoading();

// 웹 초기화 설정
initializeWeb();

// 스와이퍼 무비 렌더링
renderSwiperMovies();

// 폼 핸들러 초기화
initializeFormHandler();
