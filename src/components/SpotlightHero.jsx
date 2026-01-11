import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BACKDROP_BASE } from '../services/api';

const SpotlightHero = ({ item }) => {
    const navigate = useNavigate();
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    if (!item) return null;

    return (
        <div className="relative h-[85vh] w-full flex items-end justify-center pb-20 overflow-hidden group">
            {/* Immersive Background with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={`${BACKDROP_BASE}${item.backdrop_path}`}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-110"
                    fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
            </motion.div>

            {/* Centered Content */}
            <div className="relative z-10 text-center max-w-4xl px-6 space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs font-medium text-white/80 mb-4 tracking-wider uppercase">
                        Spotlight Selection
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-2xl mb-4 leading-[0.9] will-change-transform">
                        {item.title || item.name}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto line-clamp-2 leading-relaxed">
                        {item.overview}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-center justify-center gap-4"
                >
                    <button
                        onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                        className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] flex items-center gap-2"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Play Now
                    </button>
                    {/* Details button removed as requested */}
                </motion.div>
            </div>
        </div>
    );
};

export default SpotlightHero;
