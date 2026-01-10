const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWRiNTg1MGZjYTY1ZDk4NDkxNzYxNjU4OWMxMzcyMiIsIm5iZiI6MTc1ODc0Mjk3Mi4wMTIsInN1YiI6IjY4ZDQ0OWJiY2FiYmYxM2NkYTcxOWNmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y_wbEycxapRlawH-g4BwjBMpeD7Xnb7BFCHmMLuW2ZY";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

const fetchTMDB = async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
};

export const api = {
    getTrending: () => fetchTMDB("/trending/all/day"),
    getTopRated: () => fetchTMDB("/movie/top_rated"),
    getActionMovies: () => fetchTMDB("/discover/movie?with_genres=28"),
    getDetails: (type, id) => fetchTMDB(`/${type}/${id}`),
    search: (query) => fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}`),
};
