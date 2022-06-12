const api_key = "cf6533ee7ae81bbfce0ede59d4487cb3";
const imageUrl = "https://image.tmdb.org/t/p/w500";
const genereHttp = "https://api.themoviedb.org/3/genre/movie/list?";
const movieDiscovery = "https://api.themoviedb.org/3/discover/movie?";
const main = document.querySelector(".main");

// fetch data from api
fetch(genereHttp + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(movie => {
            fetchMovieListByGenres(movie.id, movie.name);
        });
    });

// getting movie genres from api
const fetchMovieListByGenres = (id, genre) => {
    fetch(movieDiscovery + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        pages: Math.floor(Math.random() * 3) + 1
    }))
        .then(res => res.json())
        .then(data => {
            showCategory(`${genre}_movies`, data.results);
        });
};

// movie categories from api
const showCategory = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">
        <button class="previous"><i class="uil uil-angle-left-b"></i></button>
        <h2 class="movie-category">${category.split("_").join(" ")}</h2>
        <div class="movie-container" id="${category}">
        </div>
        <button class="next"><i class="uil uil-angle-right-b"></i></button>
    </div>
`;
    movieCards(category, data);
};

// movie images/poster
movieCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    const containerLenght = data;
    const size = Object.keys(containerLenght).length;
    // movie poster
    data.forEach((movie, i) => {
        if (movie.backdrop_path == null) {
            movie.backdrop_path = movie.poster_path;
            if (movie.backdrop_path == null) {
                return;
            }
        }
        // sending api data to frontend
        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href='/${movie.id}'">
            <img src="${imageUrl}${movie.backdrop_path}" alt="">
            <p class="movie-title">${movie.title}</p>
        </div>
        `;
        // callback function to launch scroll function when page is loaded
        if (i == size - 1) {
            setTimeout(() => {
                scroll();
            }, 100);
        }
    });
};

// scroll button
const scroll = () => {
    const container = [...document.querySelectorAll(".movie-container")];
    const next = [...document.querySelectorAll(".next")];
    const previous = [...document.querySelectorAll(".previous")];

    container.forEach((movie, i) => {
        let containerDimensions = movie.getBoundingClientRect();
        let containerWidth = containerDimensions.width;
        next[i].addEventListener("click", () => {
            movie.scrollLeft += containerWidth;
        });
        previous[i].addEventListener("click", () => {
            movie.scrollLeft -= containerWidth;
        });
    });
};