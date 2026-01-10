import { useNavigate } from 'react-router-dom';
import { BACKDROP_BASE } from '../services/api';

const Hero = ({ item }) => {
    const navigate = useNavigate();
    if (!item) return null;

    return (
        <div className="relative h-[90vh] w-full">
            {/* Background Layer */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${BACKDROP_BASE}${item.backdrop_path})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full flex items-center px-[4%] pt-[80px]">
                <div className="max-w-xl md:max-w-2xl space-y-6">
                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-lg text-white">
                        {item.title || item.name}
                    </h1>

                    {/* Metadata (Simulated) */}
                    <div className="flex items-center gap-4 text-green-400 font-bold text-lg">
                        <span>98% Match</span>
                        <span className="text-gray-300 font-normal">{(item.release_date || item.first_air_date || '').slice(0, 4)}</span>
                        <span className="border border-gray-500 px-1 text-xs text-white rounded font-normal">HD</span>
                    </div>

                    {/* Description */}
                    <p className="text-white text-lg md:text-xl drop-shadow-md line-clamp-3 w-[90%]">
                        {item.overview}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            onClick={() => navigate(`/watch/${item.media_type || 'movie'}/${item.id}`)}
                            className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded hover:bg-white/90 transition font-bold text-xl"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            Play
                        </button>

                        <button className="flex items-center gap-3 bg-[rgba(109,109,110,0.7)] text-white px-8 py-3 rounded hover:bg-[rgba(109,109,110,0.4)] transition font-bold text-xl backdrop-blur-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
