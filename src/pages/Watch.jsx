import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api, BACKDROP_BASE, IMAGE_BASE } from '../services/api';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Watch = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);

    const { data: item, isLoading } = useQuery({
        queryKey: ['details', type, id],
        queryFn: () => api.getDetails(type, id)
    });

    if (isLoading) return <div className="h-screen grid place-items-center">Loading...</div>;

    const embedUrl = type === 'tv'
        ? `https://www.vidking.net/embed/tv/${id}/1/1`
        : `https://www.vidking.net/embed/movie/${id}`;

    return (
        <div className="relative min-h-screen bg-black text-white w-full overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 blur-3xl scale-125 pointer-events-none"
                style={{ backgroundImage: `url(${BACKDROP_BASE}${item.backdrop_path})` }}
            />

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 z-50 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
                ← Back
            </button>

            {isPlaying ? (
                <div className="fixed inset-0 z-40 bg-black flex items-center justify-center">
                    <iframe
                        src={embedUrl}
                        className="w-full h-full border-0"
                        allowFullScreen
                        allow="autoplay; encrypted-media"
                    />
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-6 right-6 bg-white/10 p-3 rounded-full hover:bg-white/20"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div className="relative z-10 flex flex-col md:flex-row items-end min-h-screen p-[6%] pb-20 gap-10">
                    {/* Poster */}
                    <motion.img
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        src={`${IMAGE_BASE}${item.poster_path}`}
                        className="w-64 rounded-2xl shadow-2xl hidden md:block"
                    />

                    <div className="flex-1 max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-bold mb-4"
                        >
                            {item.title || item.name}
                        </motion.h1>

                        <div className="flex gap-4 items-center text-white/60 mb-6">
                            <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                            <span>★ {item.vote_average?.toFixed(1)}</span>
                            {item.runtime && <span>{Math.floor(item.runtime / 60)}h {item.runtime % 60}m</span>}
                        </div>

                        <p className="text-lg leading-relaxed text-white/80 mb-8 max-w-xl">
                            {item.overview}
                        </p>

                        <button
                            onClick={() => setIsPlaying(true)}
                            className="bg-[#2997FF] hover:bg-[#1a8aff] text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(41,151,255,0.4)] hover:shadow-[0_0_60px_rgba(41,151,255,0.6)] transition-all transform hover:scale-105"
                        >
                            Play Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Watch;
