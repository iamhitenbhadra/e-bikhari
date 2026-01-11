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
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            viewport={{ once: true, margin: "50px" }}
                            className="group cursor-pointer flex flex-col gap-3"
                            onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[2/3] rounded-3xl overflow-hidden bg-white/5 shadow-2xl">
                                <img
                                    src={`${IMAGE_BASE}${item.poster_path}`}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Minimal Metadata */}
                            <div className="px-2">
                                <h3 className="font-bold text-lg leading-tight text-white/90 group-hover:text-white transition-colors line-clamp-1">
                                    {item.title || item.name}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-white/40 font-medium mt-1">
                                    <span>{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="capitalize">{item.media_type || 'Movie'}</span>
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
