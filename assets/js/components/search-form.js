export const submitForm = (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("movieTitle");
  const yearSelect = document.getElementById("selectYear");

  const title = titleInput.value;
  const year = yearSelect.value;

  let url = "result.html?";

  let isValid = false;

  // 영화 제목이 비어있으면 warning 표시
  if (!title) {
    titleInput.closest(".form-field").classList.add("warning");
    titleInput
      .closest(".form-field")
      .querySelector(".form-info").style.display = "flex"; // 메시지 표시
  } else {
    titleInput.closest(".form-field").classList.remove("warning");
    titleInput
      .closest(".form-field")
      .querySelector(".form-info").style.display = "none"; // 메시지 숨기기
    isValid = true;
  }

  // 년도가 비어있으면 warning 표시
  if (!year) {
    yearSelect.closest(".form-field").classList.add("warning");
    yearSelect
      .closest(".form-field")
      .querySelector(".form-info").style.display = "flex"; // 메시지 표시
  } else {
    yearSelect.closest(".form-field").classList.remove("warning");
    yearSelect
      .closest(".form-field")
      .querySelector(".form-info").style.display = "none"; // 메시지 숨기기
    isValid = true;
  }

  // 유효성 검사 후, title 또는 year 값이 있으면 결과 페이지로 이동
  if (isValid) {
    if (title) {
      url += `title=${encodeURIComponent(title)}&`;
    }

    if (year) {
      url += `year=${encodeURIComponent(year)}&`;
    }

    // 마지막 '&' 제거
    url = url.slice(0, -1);

    // 결과 페이지로 이동
    window.location.href = url;
  }
};

export const deleteTitle = () => {
  const titleInput = document.getElementById("movieTitle");
  titleInput.value = "";
  toggleDeleteButton();
};

export const toggleDeleteButton = () => {
  const titleInput = document.getElementById("movieTitle");
  const deleteButton = document.querySelector(".btn-del");

  if (titleInput.value.trim() !== "") {
    deleteButton.style.opacity = "1"; // 삭제 버튼 표시
  } else {
    deleteButton.style.opacity = "0"; // 삭제 버튼 숨기기
  }
};

document
  .getElementById("movieTitle")
  .addEventListener("input", toggleDeleteButton);
