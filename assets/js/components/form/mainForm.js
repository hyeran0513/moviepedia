import { createYearOptions } from "../common/select.js";
import { showLoading } from "../common/loader.js";

export const initializeFormHandler = () => {
  const searchForm = document.getElementById("searchForm");
  const titleInput = document.getElementById("movieTitle");
  const deleteButton = document.querySelector(".btn-del");

  // searchForm 제출 이벤트
  searchForm.addEventListener("submit", submitForm);

  // 셀렉트 박스 옵션 설정 (1900년 ~ 현재 연도)
  createYearOptions("selectYear", 1900);

  // 타이틀 입력 필드에 따른 삭제 버튼 표시/숨기기
  titleInput.addEventListener("input", toggleDeleteButton);

  // 타이틀 삭제 버튼 클릭 이벤트
  deleteButton.addEventListener("click", deleteTitle);

  // 초기 삭제 버튼 상태 설정
  toggleDeleteButton();
};

// 영화 제목 입력 필드 초기화
export const deleteTitle = () => {
  const titleInput = document.getElementById("movieTitle");
  titleInput.value = "";
  toggleDeleteButton();
};

// 영화 제목 입력 필드에 따른 삭제 버튼 표시/숨기기
export const toggleDeleteButton = () => {
  const titleInput = document.getElementById("movieTitle");
  const deleteButton = document.querySelector(".btn-del");

  deleteButton.style.opacity = titleInput.value.trim() ? "1" : "0";
};

// searchForm 제출 이벤트 핸들러
export const submitForm = (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("movieTitle");
  const yearSelect = document.getElementById("selectYear");

  const title = titleInput.value.trim();
  const year = yearSelect.value;

  let url = "result.html?";
  let isValid = false;

  // 필드 유효성 검사
  const validateField = (field, isValid) => {
    const formField = field.closest(".form-field");
    const formInfo = formField.querySelector(".form-info");

    if (isValid) {
      formField.classList.remove("warning");
      formInfo.style.display = "none";
    } else {
      formField.classList.add("warning");
      formInfo.style.display = "flex";
    }

    return isValid;
  };

  // 타이틀 필드 유효성 검사
  if (title !== "") {
    isValid = true;
    validateField(titleInput, true);
  } else {
    validateField(titleInput, false);
  }

  // 년도 필드 유효성 검사
  if (year !== "") {
    isValid = true;
    validateField(yearSelect, true);
  } else {
    validateField(yearSelect, false);
  }

  if (isValid) {
    validateField(titleInput, true);
    validateField(yearSelect, true);

    if (title) url += `title=${title}&`;
    if (year) url += `year=${year}&`;

    // 마지막 '&' 제거 후 결과 페이지로 이동
    window.location.href = url.slice(0, -1);

    showLoading();
  }
};
