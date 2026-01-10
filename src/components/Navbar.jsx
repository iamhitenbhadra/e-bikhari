import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ onOpenSearch }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Also enable Cmd+K to open search
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                onOpenSearch?.();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onOpenSearch]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-300 ${scrolled
                ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-3'
                : 'py-6'
                }`}
            style={{ paddingLeft: '6%', paddingRight: '6%' }}
        >
            <Link to="/" className="text-white font-extrabold text-2xl tracking-tighter" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                VEXO
            </Link>

            <button
                onClick={onOpenSearch}
                className="w-11 h-11 rounded-full bg-white/10 grid place-items-center hover:bg-white/20 transition-colors group"
                aria-label="Search"
            >
                <svg viewBox="0 0 24 24" width="20" fill="white" className="group-hover:scale-110 transition-transform">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
            </button>
        </header>
    );
};

export default Navbar;
