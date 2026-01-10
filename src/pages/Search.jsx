import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, IMAGE_BASE } from '../services/api';
import { motion } from 'framer-motion';

const Search = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const navigate = useNavigate();

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query), 500);
        return () => clearTimeout(timer);
    }, [query]);

    const { data } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => api.search(debouncedQuery),
        enabled: debouncedQuery.length > 2,
    });

    return (
        <div className="min-h-screen bg-black pt-[calc(20px+env(safe-area-inset-top))]">
            <div className="flex gap-4 p-5 items-center sticky top-0 bg-black z-50">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies, shows..."
                    className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white text-lg outline-none focus:border-white/30 transition-colors"
                    autoFocus
                />
                <button
                    onClick={() => navigate(-1)}
                    className="text-[#2997FF] font-semibold px-2"
                >
                    Done
                </button>
            </div>

            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.results?.map((item) => (
                    item.poster_path && (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                            className="relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer"
                        >
                            <img
                                src={`${IMAGE_BASE}${item.poster_path}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Search;
