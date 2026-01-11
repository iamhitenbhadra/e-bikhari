import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import SpotlightHero from '../components/SpotlightHero';
import MasonryGrid from '../components/MasonryGrid';

const Home = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    // Fetch Trending for Sidebar/Hero (Only fetch if NOT searching to save resources, or keep it loaded?)
    // Actually, good to keep it for instant switch back.
    const { data: trending } = useQuery({ queryKey: ['trending'], queryFn: api.getTrending });
    const heroItem = trending?.results?.[0];

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-32">
            {!query ? (
                // Standard Home Feed
                <>
                    <SpotlightHero item={heroItem} />
                    <div className="space-y-0 relative z-10">
                        <MasonryGrid title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                        <MasonryGrid title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                        <MasonryGrid title="Action Collection" queryKey="action" queryFn={api.getActionMovies} />
                    </div>
                </>
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
