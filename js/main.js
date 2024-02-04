let elMovieTemplate = document.querySelector(".movie-template").content
let elMovieList = document.querySelector(".movie-list");
let elSearchForm = document.querySelector(".search-form");
let elSearchInput = document.querySelector(".search-input");
let movieFragment = new DocumentFragment()

const API_KEY = "def42203";
const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=def42203`;
const API_TRY = `https://www.omdbapi.com/?i=tt3896198&apikey=def42203&s=ilonmusk`;


/*
{"Title":"Guardians of the Galaxy Vol. 2","Year":"2017","Rated":"PG-13","Released":"05 May 2017","Runtime":"136 min","Genre":"Action, Adventure, Comedy","Director":"James Gunn","Writer":"James Gunn, Dan Abnett, Andy Lanning","Actors":"Chris Pratt, Zoe Saldana, Dave Bautista","Plot":"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.","Language":"English","Country":"United States","Awards":"Nominated for 1 Oscar. 15 wins & 60 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.6/10"},{"Source":"Rotten Tomatoes","Value":"85%"},{"Source":"Metacritic","Value":"67/100"}],"Metascore":"67","imdbRating":"7.6","imdbVotes":"750,086","imdbID":"tt3896198","Type":"movie","DVD":"10 Jul 2017","BoxOffice":"$389,813,101","Production":"N/A","Website":"N/A","Response":"True"}
 */


const renderMovies = (search = "iron") => {
  elMovieList.innerHTML = null;

  fetch(API_URL + `&s=${search}`)
    .then((res) => res.json())
    .then((movie) => {

      if (movie.Response != "False") {
        for (let i = 0; i < 9; i++) {
          let newTemplate = elMovieTemplate.cloneNode(true)
          newTemplate.querySelector(".movie-title").textContent = movie.Search[i].Title
          newTemplate.querySelector(".movie-img").src = movie.Search[i].Poster
          newTemplate.querySelector(".movie-year").textContent = movie.Search[i].Year
          newTemplate.querySelector(".movie-rating").href = "https://www.imdb.com/title/" + movie.Search[i].imdbID
          newTemplate.querySelector(".movie-rating").textContent = "imdb"
          newTemplate.querySelector(".movie-plot").textContent = movie.Search[i].Plot

          movieFragment.appendChild(newTemplate)
          console.log(movie)
        }
        elMovieList.appendChild(movieFragment)
      } else {
        elMovieList.append("Not found")
      }
    }
    )
    .catch((err) => console.log(err.messages));


};

// renderMovies();

elSearchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let inputValue = elSearchInput.value.trim();

  renderMovies(inputValue);
});
