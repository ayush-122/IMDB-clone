//api url
const baseUrl = "http://www.omdbapi.com/?";

//api -key
const apiKey = "4dd33383";
// http://www.omdbapi.com/?s="avengers"&apikey=4dd33383

//taking the required element from index.html i.e frontpage
let searchInput = document.getElementById('search-input');
let movieGrid = document.getElementById('movie-grid');


//add event listner at searchInput
searchInput.addEventListener("input", fetchMoviesDisplay);

function fetchMoviesDisplay() {
    let inputTerm = searchInput.value.trim();
    if (inputTerm != "") {
        // aysnc function to fetech the movie from OMDB
        fetchMovies(inputTerm);
    }
}



async function fetchMovies(inputTerm) {
    console.log(inputTerm);
    //Uses the fetch function to make an asynchronous HTTP request to the OMDB API.
    const response = await fetch(`${baseUrl}s=${inputTerm}&apikey=${apiKey}`);
    //Parses the response from the API as JSON. The await keyword is used to wait for
    // the completion of the JSON parsing operation, 
    //and the result is stored in the search variable.
    const responeJSON = await response.json();
    //console.log(search);
    displayMovies(responeJSON.Search);
}



async function displayMovies(movies) {

    if (movies) {
        // placing the movieCard inside movieGrid div by interploation string
        //also I have added onclick on button Add to favourites for adding to favourites
        movieGrid.innerHTML = movies.map(movie => {
            return `
            <div>
            <div class="movie-card">
            <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                <h4 class>${movie.Title}</h4>
                <button class="btn btn-success btn-sm remove-button" onclick="addToFavorites('${movie.imdbID}')">Add Favourites</button>
                <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button">More</a>
            </div>
            </div>
        `;

        }).join("");
    }
    else {
        movieGrid.innerHTML = "<h2 class='text-danger'>Movie does not exist with given Keyword</h2>";
    }
}

async function addToFavorites(id) {

    //get movie details by id
    const movie = await getMovieDetails(id);
    // console.log(movie);
    if (movie) {
        //fetching out  date with favourites key from localstorage
        const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
        //if movie is not present then add to favourites otherwise display alert that movies is already exists in favourites
        if (!favouritesList.some(m => m.imdbID == movie.imdbID)) {
            favouritesList.push(movie);
            localStorage.setItem('favourites', JSON.stringify(favouritesList));
            alert(`${movie.Title} is added to your favourites`);
        }
        else {
            alert(`${movie.Title} is already in your favourites`);
        }
    }

}

//method to fetch movies using id.
async function getMovieDetails(imdbID) {
    const response = await fetch(`${baseUrl}apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}






