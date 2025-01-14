const navLinks = [
  { href: "/", text: "Home" },
  { href: "/explore.html", text: "Explore" },
  { href: "/genre.html", text: "Genre" },
  { href: "/news.html", text: "News" },
  { href: "/movie.html", text: "Movies" },
  { href: "/tvshow.html", text: "TV Show" },
];

export const loadHeader = () => {
  const url =
    window.location.hostname === "hyeran0513.github.io"
      ? "/movies/components/header.html"
      : "/components/header.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;

      // 로고 이미지
      const logoImg = document.querySelector(".logo-img");
      logoImg.src = `${window.baseUrl}assets/images/icon/logo.svg`;

      // 네비게이션
      const nav = document.querySelector(".gnb ul");

      // li 항목
      const menuItems = navLinks.map((link) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `${window.baseUrl}${link.href}`;
        a.textContent = link.text;
        li.appendChild(a);
        return li;
      });

      // 생성된 li 항목들을 ul에 추가
      menuItems.forEach((item) => nav.appendChild(item));
    })
    .catch((error) => console.error("헤더 fetch 오류:", error));
};