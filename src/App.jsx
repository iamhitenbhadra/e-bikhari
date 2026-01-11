import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import AmbientLight from './components/AmbientLight';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Watch = lazy(() => import('./pages/Watch'));

function App() {
    const location = useLocation();

    return (
        <>
            <AmbientLight />

            {/* Dock Navigation */}
            {!location.pathname.includes('/watch') && (
                <Dock />
            )}

            <div className="min-h-screen bg-[#0a0a0a]">
                <AnimatePresence mode="wait">
                    <Suspense fallback={
                        <div className="h-screen w-full grid place-items-center bg-[#0a0a0a] text-white/50">
                            Loading...
                        </div>
                    }>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/watch/:type/:id" element={<Watch />} />
                        </Routes>
                    </Suspense>
                </AnimatePresence>
            </div>
        </>
    );
}

export default App;
