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
              -mt-32 pulls the rows UP into the Hero's bottom gradient.
              The Hero content has pb-60, creating a large buffer zone.
              z-30 ensures rows are clickable and sit on top of the hero fade.
            */}
            <div className="relative z-30 -mt-24 md:-mt-32 space-y-8">
                <MediaRow title="Trending Now" queryKey="trending" queryFn={api.getTrending} />
                <MediaRow title="Top Rated" queryKey="topRated" queryFn={api.getTopRated} />
                <MediaRow title="Action Hits" queryKey="action" queryFn={api.getActionMovies} />
            </div>
        </div>
    );
};

export default Home;
