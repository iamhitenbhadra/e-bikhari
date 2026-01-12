import MasonryGrid from '../components/MasonryGrid';
import { useWatchlist } from '../hooks/useWatchlist';

const MyList = () => {
    const { watchlist } = useWatchlist();

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-32">
            <div className="px-4 md:px-8 max-w-[1800px] mx-auto mb-8">
                <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">My Watchlist</h1>
                <p className="text-white/50 mt-2">{watchlist.length} titles saved</p>
            </div>

            <MasonryGrid
                title=""
                queryKey="watchlist-page"
                queryFn={() => Promise.resolve({ results: watchlist })}
            />
        </div>
    );
};

export default MyList;
