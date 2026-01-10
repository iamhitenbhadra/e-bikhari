import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { api, IMAGE_BASE } from '../services/api';

const SearchModal = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.length > 2) {
                setIsLoading(true);
                try {
                    const data = await api.search(query);
                    setResults(data.results || []);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleNavigate = (item) => {
        navigate(`/watch/${item.media_type || 'movie'}/${item.id}`);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed inset-x-4 top-[15%] md:inset-x-auto md:w-[600px] md:left-1/2 md:-translate-x-1/2 bg-[#1c1c1e]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[60vh]"
                    >
                        {/* Search Input Header */}
                        <div className="flex items-center px-4 py-4 border-b border-white/10">
                            <svg className="w-5 h-5 text-white/50 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search movies, shows, actors..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-white/30 h-8"
                            />
                            {isLoading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                        </div>

                        {/* Results List */}
                        <div className="overflow-y-auto p-2 scrollbar-hide">
                            {results.length === 0 && query.length > 2 && !isLoading && (
                                <div className="text-center text-white/30 py-8">No results found</div>
                            )}

                            {results.length === 0 && query.length <= 2 && (
                                <div className="text-center text-white/30 py-8 text-sm">Type to start searching...</div>
                            )}

                            <div className="grid gap-1">
                                {results.map((item) => (
                                    item.poster_path && (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavigate(item)}
                                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-white/10 transition-colors w-full text-left group"
                                        >
                                            <img
                                                src={`${IMAGE_BASE}${item.poster_path}`}
                                                alt={item.title}
                                                className="w-10 h-14 object-cover rounded-md shadow-sm group-hover:scale-105 transition-transform"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-medium truncate">{item.title || item.name}</h4>
                                                <div className="flex items-center gap-2 text-xs text-white/50 mt-0.5">
                                                    <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{item.media_type}</span>
                                                </div>
                                            </div>
                                            <div className="text-white/20 group-hover:text-white transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    )
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
