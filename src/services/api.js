const API_KEY = import.meta.env.VITE_API_KEY;
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
    getTrending: (page = 1) => fetchTMDB(`/trending/all/day?page=${page}`),
    getTopRated: (page = 1) => fetchTMDB(`/movie/top_rated?page=${page}`),
    getActionMovies: (page = 1) => fetchTMDB(`/discover/movie?with_genres=28&page=${page}`),
    getByGenre: (genreId, page = 1) => fetchTMDB(`/discover/movie?with_genres=${genreId}&page=${page}`),
    getDetails: (type, id) => fetchTMDB(`/${type}/${id}`),
    search: (query, page = 1) => fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}&page=${page}`),
    getSimilar: (type, id, page = 1) => fetchTMDB(`/${type}/${id}/similar?page=${page}`),
    getRecommended: (type, id, page = 1) => fetchTMDB(`/${type}/${id}/recommendations?page=${page}`),
    getVideos: (type, id) => fetchTMDB(`/${type}/${id}/videos`),
    getCredits: (type, id) => fetchTMDB(`/${type}/${id}/credits`),
};
