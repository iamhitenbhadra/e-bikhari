import { motion } from 'framer-motion';
import { BACKDROP_BASE } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Hero = ({ item }) => {
    const navigate = useNavigate();
    if (!item) return null;

    return (
        <div className="relative h-[85vh] w-full flex items-end pb-[calc(60px+env(safe-area-inset-bottom))] overflow-hidden group">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${BACKDROP_BASE}${item.backdrop_path})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

            {/* Content */}
            <div className="relative z-10 px-[6%] w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold mb-4"
                >
                    TRENDING #1
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl"
                >
                    {item.title || item.name}
                </motion.h1>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                    className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                </motion.button>
            </div>
        </div>
    );
};

export default Hero;
