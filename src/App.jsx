import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import AmbientLight from './components/AmbientLight';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Watch = lazy(() => import('./pages/Watch'));

function App() {
    const location = useLocation();

    // Fade out initial loader on mount
    useEffect(() => {
        const loader = document.querySelector('.initial-loader');
        if (loader) {
            // Small delay to ensure the app is actually painted
            requestAnimationFrame(() => {
                loader.classList.add('fade-out');
                setTimeout(() => loader.remove(), 600); // Remove from DOM after transition
            });
        }
    }, []);

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
                        <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a]">
                            <div className="w-[60px] h-[60px] bg-white rounded-full animate-[ping_1.5s_ease-in-out_infinite] opacity-20 relative">
                                <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50"></div>
                            </div>
                            {/* Matching the index.html vibe but using Tailwind */}
                            <div className="absolute w-[60px] h-[60px] bg-white rounded-full opacity-80 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.4)]"></div>
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
