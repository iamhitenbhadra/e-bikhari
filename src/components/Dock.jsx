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
    const debounceTimeout = useRef(null);

    const handleSearchChangeDebounced = (e) => {
        const value = e.target.value;

        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = setTimeout(() => {
            if (value) {
                setSearchParams({ q: value });
                if (location.pathname !== '/') navigate('/');
            } else {
                setSearchParams({});
            }
        }, 300);
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

    // Hover Logic: Expand on enter. Collapse on leave IF empty.
    const handleMouseEnter = () => {
        setIsSearchExpanded(true);
        inputRef.current?.focus();
    };

    const handleMouseLeave = () => {
        // Close if empty, even if focused due to our auto-focus logic
        if (inputRef.current && !inputRef.current.value) {
            setIsSearchExpanded(false);
            inputRef.current.blur(); // Remove focus so it doesn't stay active
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                ref={dockRef}
                className="flex items-center p-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Unified Search Pill */}
                <motion.div
                    className={`flex items-center rounded-full transition-all duration-200 ease-out ${isSearchExpanded ? 'bg-white/10 pl-4 pr-1' : ''
                        }`}
                    layout
                >
                    {/* Input (Always mounted for performance/focus) */}
                    <motion.input
                        ref={inputRef}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                            width: isSearchExpanded ? 240 : 0,
                            opacity: isSearchExpanded ? 1 : 0
                        }}
                        transition={{ duration: 0.2, ease: "circOut" }}
                        className="bg-transparent border-none outline-none text-white text-base placeholder-white/30 h-10 min-w-0"
                        placeholder="Search VEXO..."
                        onChange={handleSearchChangeDebounced}
                        style={{ pointerEvents: isSearchExpanded ? 'auto' : 'none' }}
                    />

                    <button
                        onClick={toggleSearch}
                        className={`p-3 rounded-full transition-all duration-200 relative group ${isSearchExpanded || searchParams.get('q')
                            ? 'text-white hover:bg-white/10'
                            : 'text-white hover:bg-white text-black'
                            }`}
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
                                <Icon name="close" />
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
