import { motion } from 'framer-motion';
import { BACKDROP_BASE } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Hero = ({ item }) => {
    const navigate = useNavigate();
    if (!item) return null;

    return (
        <div className="relative w-full h-[95vh] overflow-hidden">
            {/* Background Image - Fixed/Absolute Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out hover:scale-105"
                    style={{ backgroundImage: `url(${BACKDROP_BASE}${item.backdrop_path})` }}
                />
            </div>

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-[#000000] via-black/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />

            {/* Content Layer - Adjusted for safety */}
            <div className="relative z-20 h-full flex flex-col justify-end px-[6%] pb-20 md:pb-32 pt-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <div className="inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold mb-6 text-white/90">
                        TRENDING #1
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                        {item.title || item.name}
                    </h1>

                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-10 line-clamp-3">
                        {item.overview}
                    </p>

                    <button
                        onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                        className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Watch Now
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
