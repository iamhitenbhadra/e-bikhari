import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import SpotlightHero from '../components/SpotlightHero';
import MasonryGrid from '../components/MasonryGrid';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');
    const genreId = searchParams.get('genre');
    const genreName = searchParams.get('name');

    // Fetch Trending for Sidebar/Hero
    const { data: trending } = useQuery({ queryKey: ['trending'], queryFn: api.getTrending });
    const heroItem = trending?.results?.[0];

    // Genre List (Hardcoded for control)
    const genres = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 27, name: "Horror" },
        { id: 878, name: "Sci-Fi" },
        { id: 53, name: "Thriller" },
    ];

    const handleGenreClick = (g) => {
        if (genreId === String(g.id)) {
            setSearchParams({}); // Deselect
        } else {
            setSearchParams({ genre: g.id, name: g.name });
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-32">
            {!query && !genreId ? (
                // Standard Home Feed
                <>
                    <SpotlightHero item={heroItem} />

                    {/* Genre Chips (Sticky) */}
                    <div className="sticky top-[60px] z-40 py-4 mb-8 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent backdrop-blur-sm overflow-x-auto no-scrollbar px-4 md:px-8 flex gap-3">
                        {genres.map(g => (
                            <button
                                key={g.id}
                                onClick={() => handleGenreClick(g)}
                                className="whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all border border-white/10 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white hover:scale-105"
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-0 relative z-10">
                        <MasonryGrid title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                        <MasonryGrid title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                        <MasonryGrid title="Action Collection" queryKey="action" queryFn={api.getActionMovies} />
                    </div>
                </>
            ) : genreId ? (
                // Genre Feed
                <div className="pt-32">
                    <div className="px-4 md:px-8 mb-4 flex items-center gap-4">
                        <button onClick={() => setSearchParams({})} className="text-white/50 hover:text-white transition-colors">← Back</button>
                        <h1 className="text-4xl font-bold text-white">{genreName} Movies</h1>
                    </div>
                    {/* Genre Chips (Visible even in filter mode to switch fast) */}
                    <div className="py-4 mb-8 overflow-x-auto no-scrollbar px-4 md:px-8 flex gap-3">
                        {genres.map(g => (
                            <button
                                key={g.id}
                                onClick={() => handleGenreClick(g)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all border ${genreId === String(g.id)
                                        ? 'bg-white text-black border-white'
                                        : 'border-white/10 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white'
                                    }`}
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>

                    <MasonryGrid
                        title={`Top ${genreName}`}
                        queryKey={`genre-${genreId}`}
                        queryFn={() => api.getByGenre(genreId)}
                    />
                </div>
            ) : (
                // Search Results Feed
                <div className="pt-32">
                    <MasonryGrid
                        title={`Results for "${query}"`}
                        queryKey={`search-${query}`}
                        queryFn={() => api.search(query)}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
