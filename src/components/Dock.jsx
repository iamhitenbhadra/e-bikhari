import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Dock = ({ onOpenSearch }) => {
    const location = useLocation();

    const items = [
        { icon: "home", path: "/", label: "Home" },
        { icon: "search", action: onOpenSearch, label: "Search" },
        // Add more unique icons/features here later
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                className="flex items-center gap-2 p-2 bg-white/10 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                {items.map((item, index) => (
                    item.path ? (
                        <Link
                            key={index}
                            to={item.path}
                            className={`p-3 rounded-full transition-all ${location.pathname === item.path
                                    ? 'bg-white text-black'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <Icon name={item.icon} />
                        </Link>
                    ) : (
                        <button
                            key={index}
                            onClick={item.action}
                            className="p-3 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <Icon name={item.icon} />
                        </button>
                    )
                ))}
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
    return null;
};

export default Dock;
