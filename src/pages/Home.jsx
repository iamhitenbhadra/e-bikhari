import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import Hero from '../components/Hero';
import MediaRow from '../components/MediaRow';

const Home = () => {
    const { data: trending, isLoading } = useQuery({
        queryKey: ['trending'],
        queryFn: api.getTrending
    });

    if (isLoading) return <div className="h-screen grid place-items-center">Loading...</div>;

    return (
        <div className="min-h-screen pb-20">
            <Hero item={trending?.results[0]} />

            <div className="relative z-20 -mt-16">
                <MediaRow title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                <MediaRow title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                <MediaRow title="Action Hits" queryKey="action" queryFn={api.getActionMovies} />
            </div>
        </div>
    );
};

export default Home;
