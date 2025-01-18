import { fetchExample } from "../api/fetch-example.js";

export const loadSearchModal = () => {
  const url =
    window.location.hostname === "hyeran0513.github.io"
      ? "/moviepedia/components/searchModal.html"
      : "/components/searchModal.html";

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("searchModal").innerHTML = data;

      // 검색 모달
      const closeButton = document.getElementById("closeButton");
      const searchButton = document.getElementById("searchButton");

      // 검색 모달 열기
      searchButton.addEventListener("click", () => {
        searchModal.style.display = "flex";
      });

      // 검색 모달 닫기
      closeButton.addEventListener("click", () => {
        searchModal.style.display = "none";
      });
    })
    .catch((error) => console.error("모달 fetch 오류:", error));

};


document.addEventListener("DOMContentLoaded" , async function(){ 
  searchModule();
})

// 외부 모듈상태에서 DOMContentsLoad 옵션이 작동이 제대로 안됌.
// search-modal.js가 searchModal.html보다 먼저 로딩되고있음
async function searchModule () {
    // const searchTarget = document.getElementsByClassName('modal-search__title');
    const searchTarget = document.querySelector('modal-search__title');

    console.log( 'searchTarget : ', searchTarget);

    searchTarget.addEventListener( 'keyup' , async (e) => {
      console.log('event : ' , e);
      console.log( '입력한 제목 : ', searchTarget.innerHTML );

      try{ 
        if(searchTarget.value === null ){
          console.log( '입력한 제목이 없음 ');
          return;
        }
        
        console.log( '입력한 제목 : ', searchTarget.value );
        const result = await fetchExample(searchTarget.value);

        console.log( '결과 : ', result);

        /* <i class='bx bx-time' ></i> */

      }catch(error){
        throw new Error('예외 상황 발생 : ' + error );
      }
    });
}

// const searchTest = function(callback){
//   document.readyState === "interactive" || document.readyState ==="complete" 
//     ? callback() : document.addEventListener("DOMContentLoaded", callback);
// }

// searchTest(searchModule);