import { useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import AmbientLight from './components/AmbientLight';
import SearchModal from './components/SearchModal';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Watch = lazy(() => import('./pages/Watch'));

function App() {
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <AmbientLight />

            {/* Navbar with Search Trigger */}
            {location.pathname !== '/search' && !location.pathname.includes('/watch') && (
                <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
            )}

            {/* Global Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

            <div className="min-h-screen bg-black">
                <AnimatePresence mode="wait">
                    <Suspense fallback={
                        <div className="h-screen w-full grid place-items-center bg-black text-white/50">
                            Loading...
                        </div>
                    }>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/watch/:type/:id" element={<Watch />} />
                        </Routes>
                    </Suspense>
                </AnimatePresence>
            </div>
        </>
    );
}

export default App;
