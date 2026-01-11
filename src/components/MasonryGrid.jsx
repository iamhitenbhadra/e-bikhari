import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IMAGE_BASE } from '../services/api';

const MasonryGrid = ({ title, queryKey, queryFn }) => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({ queryKey: [queryKey], queryFn });
    const ref = useRef(null);

    // Subtle parallax for grid items
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    if (isLoading) return <div className="h-96 w-full flex items-center justify-center text-white/10 animate-pulse">Loading Content...</div>;

    const items = data?.results || [];

    return (
        <section ref={ref} className="px-4 md:px-8 py-12 max-w-[1800px] mx-auto">
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black mb-12 text-white/90 tracking-tighter"
            >
                {title}
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-12">
                {items.map((item, index) => (
                    item.poster_path && (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true, margin: "50px" }}
                            className="group cursor-pointer flex flex-col gap-3 relative z-0 hover:z-10 will-change-transform"
                            onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                        >
                            {/* Card Image Container */}
                            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-white/5 shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 ring-0 group-hover:ring-2 ring-white/20">
                                <img
                                    src={`${IMAGE_BASE}${item.poster_path}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110"
                                    loading="lazy"
                                />

                                {/* Premium Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                {/* Timed Shine Effect (Diagonal Sweep) */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 overflow-hidden">
                                    <div className="absolute top-0 left-[-150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:animate-shine" />
                                </div>

                                {/* Rating Badge (Floating Top Right) */}
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                                    <span className="text-[#f5c518] text-xs">★</span>
                                    <span className="text-white text-xs font-bold">{item.vote_average?.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Clean Stats (Title + Meta) */}
                            <div className="px-1 space-y-1">
                                <h3 className="font-bold text-base leading-snug text-white/90 group-hover:text-white transition-colors line-clamp-1">
                                    {item.title || item.name}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-white/50 font-medium">
                                    <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="uppercase tracking-wider">{item.media_type || 'Movie'}</span>
                                </div>
                            </div>
                        </motion.div>
                    )
                ))}
            </div>
        </section>
    );
};

export default MasonryGrid;
