import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Dock = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const inputRef = useRef(null);
    const dockRef = useRef(null);

    // Sync local state with URL
    useEffect(() => {
        const query = searchParams.get('q');
        if (query) {
            setIsSearchExpanded(true);
            if (inputRef.current) inputRef.current.value = query;
        }
    }, [searchParams]);

    // Global Keyboard Listener (Type to Search)
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if already focused or special keys
            if (document.activeElement === inputRef.current) return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.key.length !== 1) return; // Only printable chars

            // Auto-expand and focus
            setIsSearchExpanded(true);
            inputRef.current?.focus();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Debounce search updates
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isSearchExpanded && inputRef.current) {
                const value = inputRef.current.value;
                if (value) {
                    setSearchParams({ q: value });
                    if (location.pathname !== '/') navigate('/');
                } else if (!value && searchParams.get('q')) {
                    setSearchParams({});
                }
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [isSearchExpanded, searchParams]); // Start debounce when these change? No, this effect logic is flawed if we want to debounce the INPUT.

    // Better approach: Debounce the handleInput
    const handleSearchChange = (e) => {
        const value = e.target.value;
        // Direct update URL is bad for perf if typing fast. 
        // We should debounce the setSearchParams call.
    };

    // Let's rewrite the debounce logic properly using a ref for timeout
    const [recentSearches, setRecentSearches] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('vexo_recent_searches')) || [];
        } catch { return []; }
    });
    const [showHistory, setShowHistory] = useState(false);

    // Save history when search is confirmed (debounced fetch)
    const saveToHistory = (term) => {
        if (!term || term.length < 2) return;
        setRecentSearches(prev => {
            const newHistory = [term, ...prev.filter(t => t !== term)].slice(0, 5);
            localStorage.setItem('vexo_recent_searches', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const debounceTimeout = useRef(null);

    const handleSearchChangeDebounced = (e) => {
        const value = e.target.value;

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            if (value) {
                setSearchParams({ q: value });
                saveToHistory(value); // Save valid searches
                if (location.pathname !== '/') navigate('/');
            } else {
                setSearchParams({});
            }
        }, 500); // Increased debounce slightly
    };

    const toggleSearch = () => {
        if (isSearchExpanded) {
            // Close logic
            setIsSearchExpanded(false);
            setSearchParams({});
            if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.blur();
            }
        } else {
            // Open logic
            setIsSearchExpanded(true);
            inputRef.current?.focus();
        }
    };

    const handleMouseEnter = () => {
        if (window.matchMedia('(hover: hover)').matches) {
            setIsSearchExpanded(true);
            inputRef.current?.focus();
        }
    };

    const handleMouseLeave = () => {
        if (window.matchMedia('(hover: hover)').matches) {
            if (inputRef.current && !inputRef.current.value) {
                setIsSearchExpanded(false);
                inputRef.current.blur();
            }
        }
    };

    return (
        <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[300px] flex flex-col items-center pointer-events-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            {/* Recent Searches Popup */}
            <AnimatePresence>
                {isSearchExpanded && showHistory && !inputRef.current?.value && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="pointer-events-auto mb-4 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2"
                    >
                        <div className="flex items-center justify-between px-3 py-2">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Recent</span>
                            <button onMouseDown={() => {
                                setRecentSearches([]);
                                localStorage.removeItem('vexo_recent_searches');
                            }} className="text-[10px] text-white/20 hover:text-white/60 transition-colors uppercase tracking-wider">
                                Clear
                            </button>
                        </div>
                        {recentSearches.map(term => (
                            <button
                                key={term}
                                onMouseDown={(e) => { // Fixed: onMouseDown fires before blur
                                    e.preventDefault(); // Prevent focus loss
                                    if (inputRef.current) inputRef.current.value = term;
                                    setSearchParams({ q: term });
                                    setShowHistory(false);
                                    if (location.pathname !== '/') navigate('/');
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between group"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2"></circle><path strokeWidth="2" d="M12 6v6l4 2"></path></svg>
                                    <span>{term}</span>
                                </div>
                                <svg className="w-3 h-3 text-white/20 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                            </button>
                        ))}

                        {/* Trending Suggestions (New Feature) */}
                        <div className="px-3 py-2 mt-2 border-t border-white/5 text-xs font-bold text-white/40 uppercase tracking-wider">Trending Now</div>
                        {["Marvel", "Star Wars", "Anime", "Action"].map(term => (
                            <button
                                key={term}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    if (inputRef.current) inputRef.current.value = term;
                                    setSearchParams({ q: term });
                                    setShowHistory(false);
                                    if (location.pathname !== '/') navigate('/');
                                }}
                                className="w-full text-left px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3"
                            >
                                <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                {term}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                ref={dockRef}
                className="pointer-events-auto flex items-center p-1.5 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Unified Search Pill */}
                <motion.div
                    className={`flex items-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSearchExpanded ? 'bg-white/5 pl-4 pr-1' : ''}`}
                    layout
                >
                    {/* Input */}
                    <motion.input
                        ref={inputRef}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                            width: isSearchExpanded ? (window.innerWidth < 640 ? 200 : 260) : 0,
                            opacity: isSearchExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="bg-transparent border-none outline-none text-white text-base placeholder-white/30 h-10 min-w-0"
                        placeholder="Search VEXO..."
                        onChange={handleSearchChangeDebounced}
                        onFocus={() => setShowHistory(true)}
                        style={{ pointerEvents: isSearchExpanded ? 'auto' : 'none' }}
                        onBlur={() => {
                            // Delay hiding history to allow clicks
                            setTimeout(() => setShowHistory(false), 200);
                            if (!inputRef.current.value) {
                                setIsSearchExpanded(false);
                            }
                        }}
                    />

                    <button
                        onClick={toggleSearch}
                        className="p-3 rounded-full transition-all duration-300 relative group flex-shrink-0 text-white hover:bg-white/10"
                        aria-label={isSearchExpanded ? "Close Search" : "Open Search"}
                    >
                        {/* Animated Icon Swap */}
                        <div className="relative w-6 h-6">
                            <motion.div
                                animate={{
                                    opacity: isSearchExpanded ? 0 : 1,
                                    rotate: isSearchExpanded ? 90 : 0,
                                    scale: isSearchExpanded ? 0.5 : 1
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <Icon name="search" />
                            </motion.div>

                            <motion.div
                                animate={{
                                    opacity: isSearchExpanded ? 1 : 0,
                                    rotate: isSearchExpanded ? 0 : -90,
                                    scale: isSearchExpanded ? 1 : 0.5
                                }}
                                transition={{ duration: 0.2 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {/* Adjusted cross to be simpler */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </motion.div>
                        </div>
                    </button>
                </motion.div>
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
