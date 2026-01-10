import { motion } from 'framer-motion';
import { IMAGE_BASE } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MediaCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="relative flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden aspect-[2/3] w-[clamp(160px,40vw,240px)]"
            whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
        >
            <img
                src={`${IMAGE_BASE}${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-full object-cover rounded-2xl shadow-lg"
                loading="lazy"
            />

            {/* Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

export default MediaCard;
