import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import AmbientLight from './components/AmbientLight';
import Home from './pages/Home';
import Search from './pages/Search';
import Watch from './pages/Watch';

function App() {
    const location = useLocation();

    return (
        <>
            <AmbientLight />
            {location.pathname !== '/search' && !location.pathname.includes('/watch') && <Navbar />}

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/watch/:type/:id" element={<Watch />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
