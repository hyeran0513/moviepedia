export const addLoader = (HTMLElement) => {
  if (!HTMLElement.querySelector(".loading")) {
    let context = `
      <div class='loading'>
        <div class='dot'></div>
        <div class='dot'></div>
        <div class='dot'></div>
      </div>
    `;

    HTMLElement.innerHTML += context;
  }
};

// 로딩 애니메이션을 제거
export const removeLoader = (HTMLElement) => {
  const loader = HTMLElement.querySelector(".loading");
  HTMLElement.removeChild(loader);
};
