import { initializeWeb } from './main.js';
import { fetchMovieDetails } from '../api/fetch-example.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeWeb();
  const params = new URLSearchParams(window.location.search);
  const imdbID = params.get('imdbID');

  if(!imdbID) {
    console.error('해당 영화 없음');
    return;
  }

  const loadMovie = async(id) => {
    try {
      const movie = await fetchMovieDetails(id);

      if(!movie||movie.Response === 'False'){
        console.error('영화 정보 없음');
        return;
      }

      const poster = document.querySelector('.img_card');
      const title =document.querySelector('.title_name');
      const storyline = document.querySelector('.storyline_name');
      const rating = document.querySelector('.rating_name');
      const releaseDate = document.querySelector('.releaseDate_name');
      const duration = document.querySelector('.duration_name');
      const cast = document.querySelector('.cast_name');
      const director = document.querySelector('.director_name');

      poster.src = movie.Poster !== "N/A" ? movie.Poster : '기본이미지.png';

      title.textContent = movie.Title;
      storyline.textContent = movie.Plot;
      rating.textContent = movie.Rated;
      releaseDate.textContent = movie.Released;
      duration.textContent = movie.Runtime;
      cast.textContent = movie.Actors;
      director.textContent = movie.Director;

      // 장르(,로 끊어서서) 여러개 받아오기
      document.querySelector('.genres_name').innerHTML = '';
      const genres = movie.Genre.split(',');
      genres.forEach(genre => {
        const genreName = document.createElement('span');
        genreName.textContent = genre.trim();
        genreName.classList.add('genre_item');
        document.querySelector('.genres_name').appendChild(genreName);
      })
      
      const favBtn = document.querySelector('.fav_btn');
      const favicon = document.querySelector('#heart');
      favBtn.addEventListener('click', () => {
        addFav(imdbID);
        favBtn.classList.toggle('active');
        if(favBtn.classList.contains('active')) {
          favicon.classList.remove('fa-regular', 'fa-heart');
          favicon.classList.add('fa-solid', 'fa-heart');
          console.log(favicon);
        } else {
          favicon.classList.remove('fa-solid', 'fa-heart');
          favicon.classList.add('fa-regular', 'fa-heart');
          console.log(favicon);
        }
      })

    }catch(error) {
      console.error('불러오기 실패')
    }
  } 
  loadMovie(imdbID);
})







// 테스트용
// const exMovie = {
//   imdbID: "tt3521164",
//   Poster: "https://picsum.photos/200/300",
//   Title: "test",
//   Plot: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic suscipit natus praesentium, voluptatum numquam repellendus corrupti ducimus nobis quasi sapiente dolore consequuntur quisquam provident sint error, magni, aliquam accusantium veritatis.",
//   Ratings: "8.5",
//   Released: "20250120",
//   Genre: "dfdf, dfdf,dfdaa", 
//   Runtime: "120 min",
//   Actors: "nmbmn, nmbmb",
//   Director: "hjgjh",
// };
// renderDetail(exMovie);


// 찜
const addFav = (imdbID) =>{
  const favorite = JSON.parse(localStorage.getItem('favorite')) || [];
  if(favorite.includes(imdbID)) {
    const index = favorite.indexOf(imdbID);
    favorite.splice(index,1);
    console.log(imdbID);
  } else {
    favorite.push(imdbID);
  }
  localStorage.setItem('favorite', JSON.stringify(favorite));
}