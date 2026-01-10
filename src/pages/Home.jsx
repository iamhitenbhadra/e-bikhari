import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import Hero from '../components/Hero';
import MediaRow from '../components/MediaRow';

const Home = () => {
    const { data: trending, isLoading } = useQuery({
        queryKey: ['trending'],
        queryFn: api.getTrending
    });

    if (isLoading) return <div className="h-screen bg-black grid place-items-center">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
    </div>;

    const heroItem = trending?.results[0];

    return (
        <div className="min-h-screen bg-black pb-20">
            {/* Hero Section */}
            <Hero item={heroItem} />

            {/* 
              Content Rows 
              Standard Netflix layout: Rows start overlapping the bottom fade of the billboard slightly.
            */}
            <div className="relative z-20 -mt-32 md:-mt-48 space-y-8 pl-4 md:pl-12 pb-20">
                <MediaRow title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                <MediaRow title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                <MediaRow title="Action Movies" queryKey="action" queryFn={api.getActionMovies} />
            </div>
        </div>
    );
};

export default Home;
