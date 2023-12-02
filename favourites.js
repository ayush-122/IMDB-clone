let favGrid =document.getElementById('fav-grid');

// function to create movieCard will be called by displayFav function
// with move image ,title,button to remove favourites 
//on which I have added onclick listner also more button which will provide more details of movies and it will return it
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.innerHTML = `
    <div class="fav-card">
        <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
        <div >
            <h4 class>${movie.Title}</h4>
            <button class="btn btn-danger btn-sm remove-button" onclick="removeFav('${movie.imdbID}')">Remove from Favourites</button>
            <a href="movie.html?id=${movie.imdbID}" class="btn btn-secondary btn-sm more-button">More</a>
        </div>
        </div>
    `;

    
    return movieCard;
}


function removeFav(imdbID)
{
 //Retrive favourites from localstorage
 const favouritesList=JSON.parse(localStorage.getItem('favourites'));

 //find index of the movie with the give imdbID

 const indexToRemove =favouritesList.findIndex(movie=>movie.imdbID ==imdbID);
 if(indexToRemove!=-1)
 {
    //remove the list from favouritesList

    favouritesList.splice(indexToRemove,1);
    localStorage.setItem('favourites',JSON.stringify(favouritesList));
    
 }
 displayFav();
}

function displayFav()
{
    // I am parsed the string to get data in array
    const favouritesList =JSON.parse(localStorage.getItem('favourites'))||[];
        //Clear the previous content of favGrid and it is necessary other wise our removeFav function will not work.
    favGrid.innerHTML = '';

   // console.log(favouritesList);
      /// if favouritesList length is 0 then there is no element in favouritesList
    if(favouritesList.length==0)
    {
        const emptyMessage =document.createElement('h2');
        emptyMessage.textContent='Your favourites list is empty';
        favGrid.appendChild(emptyMessage);
    }
   else
   {
    // we can display all movieCard
    favouritesList.forEach(movie=>{
        const movieCard = createMovieCard(movie);
        //console.log(movieCard);
        favGrid.appendChild(movieCard);
    })
   }
  


}