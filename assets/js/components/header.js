export const loadHeader = () => {
  const url = window.location.hostname === "hyeran0513.github.io" 
  ? "/movies/components/header.html" 
  : "/components/header.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;  

      const logoImg = document.querySelector(".logo-img");
      logoImg.src = `${window.baseUrl}assets/images/icon/logo.svg`;
    })
    .catch((error) => console.error("헤더 fetch 오류:", error));
}