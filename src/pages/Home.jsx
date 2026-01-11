import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import SpotlightHero from '../components/SpotlightHero';
import MasonryGrid from '../components/MasonryGrid';
import NetworkError from '../components/NetworkError';
import { useWatchlist } from '../hooks/useWatchlist';

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q');
    const genreId = searchParams.get('genre');
    const genreName = searchParams.get('name');
    const { watchlist } = useWatchlist(); // Get watchlist

    // Fetch Trending for Sidebar/Hero
    const { data: trending, isError: isHeroError, isLoading: isHeroLoading, refetch: refetchHero } = useQuery({
        queryKey: ['trending'],
        queryFn: api.getTrending,
        retry: 1
    });
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
                    {isHeroError ? (
                        <div className="h-[85vh] w-full flex items-center justify-center">
                            <NetworkError onRetry={refetchHero} />
                        </div>
                    ) : isHeroLoading ? (
                        // Hero Skeleton
                        <div className="relative h-[85vh] w-full bg-[#0a0a0a] overflow-hidden">
                            <div className="absolute inset-0 animate-pulse bg-white/5" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                        </div>
                    ) : (
                        <SpotlightHero item={heroItem} />
                    )}

                    {/* Genre Chips (Sticky) */}
                    <div className="sticky top-0 z-40 py-4 mb-12 bg-[#0a0a0a]/90 backdrop-blur-xl overflow-x-auto no-scrollbar px-4 md:px-8 flex gap-3 -mx-4 md:mx-0 shadow-2xl transition-all duration-300">
                        {genres.map(g => (
                            <button
                                key={g.id}
                                onClick={() => handleGenreClick(g)}
                                className="whitespace-nowrap px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all border border-white/5 bg-white/5 hover:bg-white text-white/60 hover:text-black hover:scale-105 active:scale-95 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex-shrink-0"
                            >
                                {g.name}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-16 relative z-10 pb-20">
                        {/* My List Section */}
                        {watchlist.length > 0 && (
                            <MasonryGrid
                                title="My List"
                                queryKey="watchlist"
                                queryFn={() => Promise.resolve({ results: watchlist })}
                            />
                        )}
                        <MasonryGrid title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                        <MasonryGrid title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                        <MasonryGrid title="Action Collection" queryKey="action" queryFn={api.getActionMovies} />
                    </div>
                </>
            ) : genreId ? (
                // Genre Feed
                <div className="pt-32">
                    <div className="px-4 md:px-8 mb-4 flex items-center gap-4">
                        <button onClick={() => setSearchParams({})} className="text-white/50 hover:text-white transition-colors flex items-center gap-2 group">
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">{genreName} Movies</h1>
                    </div>
                    {/* Genre Chips (Visible even in filter mode to switch fast) */}
                    <div className="py-4 mb-8 overflow-x-auto no-scrollbar px-4 md:px-8 flex gap-3">
                        {genres.map(g => (
                            <button
                                key={g.id}
                                onClick={() => handleGenreClick(g)}
                                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all border ${genreId === String(g.id)
                                    ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'border-white/5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white'
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
