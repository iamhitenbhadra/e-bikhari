import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Dock = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const inputRef = useRef(null);

    // Sync local state with URL
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setIsSearchExpanded(true);
            if (inputRef.current) inputRef.current.value = query;
        } else if (isSearchExpanded && !query) {
            // If we manually cleared URL, but dock is open, maybe close it? 
            // actually, better to keep it open if user is interacting.
            // letting user close it manually is better UX for now.
            if (inputRef.current && inputRef.current.value === '') {
                // only close if empty
            }
        }
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        if (value) {
            setSearchParams({ q: value });
            if (location.pathname !== '/') navigate('/'); // Ensure we are on Home
        } else {
            setSearchParams({});
        }
    };

    const toggleSearch = () => {
        if (isSearchExpanded) {
            // Close: clear search
            setIsSearchExpanded(false);
            setSearchParams({});
            if (inputRef.current) inputRef.current.value = '';
        } else {
            // Open: focus
            setIsSearchExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                className="flex items-center gap-2 p-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Home Icon */}
                <Link
                    to="/"
                    onClick={() => {
                        setSearchParams({});
                        setIsSearchExpanded(false);
                        if (inputRef.current) inputRef.current.value = '';
                    }}
                    className={`p-3 rounded-full transition-all ${location.pathname === '/' && !searchParams.get('q')
                            ? 'bg-white text-black'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <Icon name="home" />
                </Link>

                {/* Search Interaction */}
                <div className="flex items-center">
                    <AnimatePresence>
                        {isSearchExpanded && (
                            <motion.input
                                ref={inputRef}
                                initial={{ width: 0, opacity: 0, padding: 0 }}
                                animate={{ width: 200, opacity: 1, padding: "0 12px" }}
                                exit={{ width: 0, opacity: 0, padding: 0 }}
                                className="bg-transparent border-none outline-none text-white text-sm placeholder-white/30 h-full"
                                placeholder="Search VEXO..."
                                onChange={handleSearchChange}
                            />
                        )}
                    </AnimatePresence>

                    <button
                        onClick={toggleSearch}
                        className={`p-3 rounded-full transition-all ${isSearchExpanded || searchParams.get('q')
                                ? 'bg-white text-black'
                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <Icon name={isSearchExpanded ? "close" : "search"} />
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const Icon = ({ name }) => {
    if (name === "home") {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        );
    }
    if (name === "search") {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        );
    }
    if (name === "close") {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        )
    }
    return null;
};

export default Dock;
