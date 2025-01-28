export const topButton = () => {
  const topBtn = document.createElement("button");
  topBtn.innerHTML = "<i class='bx bx-up-arrow-alt'></i>";
  topBtn.className = "btn-top";
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      topBtn.style.opacity = "1";
      topBtn.style.visibility = "visible";
    } else {
      topBtn.style.opacity = "0";
      topBtn.style.visibility = "hidden";
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
