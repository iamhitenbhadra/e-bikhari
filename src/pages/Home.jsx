import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import Hero from '../components/Hero';
import MediaRow from '../components/MediaRow';

const Home = () => {
    // Fetch Trending for Sidebar/Hero
    const { data: trending } = useQuery({ queryKey: ['trending'], queryFn: api.getTrending });
    const heroItem = trending?.results?.[0];

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-32">
            <SpotlightHero item={heroItem} />

            <div className="space-y-0 relative z-10">
                <MasonryGrid title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                <MasonryGrid title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                <MasonryGrid title="Action Collection" queryKey="action" queryFn={api.getActionMovies} />
            </div>
        </div>
    );
};

export default Home;
