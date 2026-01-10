import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onOpenSearch }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'TV Shows', path: '/' },
        { name: 'Movies', path: '/' },
        { name: 'New & Popular', path: '/' },
        { name: 'My List', path: '/' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-[4%] transition-colors duration-300 ${scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
                } h-[68px]`}
        >
            <div className="flex items-center gap-8">
                {/* Netflix Logo (Text replacement for now) */}
                <Link to="/" className="text-[#E50914] text-2xl md:text-3xl font-bold tracking-tighter uppercase mr-4">
                    NETFLIX
                </Link>

                {/* Primary Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-5">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-medium text-[#e5e5e5] hover:text-gray-300 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-6 text-white">
                {/* Search */}
                <button onClick={onOpenSearch} className="hover:text-gray-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0711 14.0711C16 11.2649 16 7.51944 14.0711 4.71327C11.6667 1.20817 6.33333 1.20817 3.92893 4.71327C1.52454 8.21837 1.52454 12.7816 3.92893 16.2867C6.33333 19.7918 11.6667 19.7918 14.0711 16.2867L14.0711 16.2867L20.4853 22.7009L22.7009 20.4853L16.2867 14.0711L14.0711 14.0711Z" fill="currentColor" />
                    </svg>
                </button>

                {/* Bell / Notifications */}
                <button className="hidden sm:block hover:text-gray-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>

                {/* Profile Group */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt="Profile"
                        className="w-8 h-8 rounded"
                    />
                    <svg className="w-3 h-3 transition-transform group-hover:rotate-180" viewBox="0 0 24 24" fill="white">
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
