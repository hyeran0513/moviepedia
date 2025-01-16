export const setBaseUrl = () => {
  let base = document.querySelector('base');
  let baseUrl = "";

  // base 태그의 유무에 따른 유효성 검사
  if (base) {
    baseUrl = base.href;
  } else {
    base = document.createElement("base");

    if (window.location.hostname === "hyeran0513.github.io") {
      baseUrl = "/moviepedia/";
    } else {
      baseUrl = "/";
    }

    base.href = baseUrl;
    document.head.prepend(base);
  }

  window.baseUrl = baseUrl;
};
