export const loadHeader = () => {
  const url = window.location.hostname === "hyeran0513.github.io" 
  ? "/movies/components/header.html" 
  : "/components/header.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;  
    })
    .catch((error) => console.error("헤더 fetch 오류:", error));
}