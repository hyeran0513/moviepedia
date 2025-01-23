// 테마를 로컬 스토리지에 저장
const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

// 로컬 스토리지에서 테마를 불러오기
const loadTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
    // 로컬 스토리지에 저장된 테마에 맞게 라디오 버튼 상태 변경
    document.getElementById(savedTheme).checked = true;
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const defaultTheme = prefersDark ? "dark" : "light";
    setTheme(defaultTheme);
    document.getElementById(defaultTheme).checked = true;
  }
};

export const handleTheme = () => {
  // 테마 변경 시 radio 버튼의 상태에 따라 테마 설정
  document.querySelectorAll('input[name="color-scheme"]').forEach((input) => {
    input.addEventListener("change", () => {
      console.log("?????");
      setTheme(input.value);
    });
  });

  // 초기 로드 시 테마 적용
  loadTheme();
};
