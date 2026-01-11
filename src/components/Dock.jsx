import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

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
            if (document.activeElement === inputRef.current) return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.key.length !== 1) return;

            setIsSearchExpanded(true);
            inputRef.current?.focus();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Simplified Debounce
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
        }, 500);
    };

    const toggleSearch = () => {
        if (isSearchExpanded) {
            setIsSearchExpanded(false);
            setSearchParams({});
            if (inputRef.current) {
                inputRef.current.value = '';
                inputRef.current.blur();
            }
        } else {
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
                        style={{ pointerEvents: isSearchExpanded ? 'auto' : 'none' }}
                        onBlur={() => {
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
    if (name === "search") {
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        );
    }
    return null;
};

export default Dock;
