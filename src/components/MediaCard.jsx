import { motion } from 'framer-motion';
import { IMAGE_BASE, BACKDROP_BASE } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MediaCard = ({ item }) => {
    const navigate = useNavigate();
    const imagePath = item.backdrop_path || item.poster_path; // Prefer landscape

    return (
        <motion.div
            className="relative flex-shrink-0 cursor-pointer rounded-md overflow-hidden aspect-video w-[240px] md:w-[280px]"
            whileHover={{
                scale: 1.1,
                zIndex: 50,
                transition: { duration: 0.3, delay: 0.1 }
            }}
            onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
        >
            <img
                src={`${BACKDROP_BASE}${imagePath}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
            />

            {/* Hover Overlay Gradient */}
            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />

            {/* Title on Hover (Simple version) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/60 to-transparent"
            >
                <h4 className="text-white text-sm font-bold truncate">{item.title || item.name}</h4>
                <div className="flex gap-2 text-[10px] text-green-400 font-semibold mt-1">
                    <span>98% Match</span>
                    <span className="text-white border border-white/40 px-1 rounded">HD</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MediaCard;
