const api_key = "cf6533ee7ae81bbfce0ede59d4487cb3";
const imageUrl = "https://image.tmdb.org/t/p/w500";
const originalImage = "https://image.tmdb.org/t/p/original";
const genereHttp = "https://api.themoviedb.org/3/genre/movie/list?";
const movieDiscovery = "https://api.themoviedb.org/3/discover/movie?";
const movieDetail = "https://api.themoviedb.org/3/movie";
const movieId = location.pathname;

// fetch movie detail
fetch(`${movieDetail}${movieId}?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        movieInfo(data);
    });

// set movie info
const movieInfo = (movie) => {
    const title = document.getElementById("title-bar");
    const movieName = document.querySelector(".movie-name");
    const movieGenre = document.querySelector(".genre");
    const movieDescription = document.querySelector(".description");
    const moviePoster = document.querySelector(".movie-info");
    // api to frontend
    title.innerHTML = movieName.innerHTML = movie.title;
    movieGenre.innerHTML = `${movie.release_date.split("-")[0]} | `;
    for (let i = 0; i < movie.genres.length; i++) {
        movieGenre.innerHTML += movie.genres[i].name + format(i, movie.genres.length);
    }
    if (movie.adult == true) {
        movieName.innerHTML += ' | <i class="uil uil-18-plus"></i>';
    }
    if (movie.backdrop_path == null) {
        movie.backdrop_path = movie.poster_path;
    }
    movieDescription.innerHTML = movie.overview;
    moviePoster.style.backgroundImage = `url(${originalImage}${movie.backdrop_path})`;
};

// format genres from api array on frontend
const format = (current, max) => {
    // if text is last, return "." and if text is not last add "," with space (", ")
    return (current == max - 1) ? "." : ", ";
};

// fetch credits
fetch(`${movieDetail}${movieId}/credits?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        const movieCast = document.querySelector(".cast");
        for (let i = 0; i < 7; i++) {
            movieCast.innerHTML += data.cast[i].name + format(i, 7);
        }
    });

// fetch trailers
fetch(`${movieDetail}${movieId}/videos?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        const movieTrailer = document.querySelector(".movie-trailer");
        const clips = (data.results.length > 6) ? 6 : data.results.length;
        for (let i = 0; i < clips; i++) {
            movieTrailer.innerHTML += `
                <iframe src="https://www.youtube.com/embed/${data.results[i].key}"
                title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            `;
        }
    });

// fetch recommendations
fetch(`${movieDetail}${movieId}/recommendations?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        const recommendation = document.querySelector(".recommendations");
        for (let i = 0; i < 12; i++) {
            if (data.results[i].backdrop_path == null) {
                i++;
            }
            recommendation.innerHTML += `
            <div class="movie" onclick="location.href='/${data.results[i].id}'">
                <img src="${imageUrl}${data.results[i].backdrop_path}" alt="">
                <p class="movie-title">${data.results[i].title}</p>
            </div>
            `;
        }
    });