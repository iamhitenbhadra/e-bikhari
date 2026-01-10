import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import AmbientLight from './components/AmbientLight';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Watch = lazy(() => import('./pages/Watch'));

function App() {
    const location = useLocation();

    return (
        <>
            <AmbientLight />
            {location.pathname !== '/search' && !location.pathname.includes('/watch') && <Navbar />}

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
