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
  const loaders = HTMLElement.querySelectorAll("[class^='loading']");
  loaders.forEach((loader) => {
    loader.remove();
  });
};

export const addLoaderEle = (HTMLElement) => {
  if (
    !HTMLElement.querySelector(".loading__ele") == null ||
    !HTMLElement.querySelector(".loading__ele")
  ) {
    let context = `
      <div class='loading__ele'>
        <div class='dot'></div>
        <div class='dot'></div>
        <div class='dot'></div>
      </div>
    `;
    HTMLElement.innerHTML += context;
  }
};

// 전체 로딩 애니메이션 표시
export const showLoading = () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.classList.add("--active");
};

// 전체 로딩 애니메이션 숨김
export const hideLoading = () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  loadingOverlay.classList.remove("--active");
};
