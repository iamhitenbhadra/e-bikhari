import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                <h1 className="text-[120px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 font-display select-none">
                    404
                </h1>
                <h2 className="text-2xl font-semibold mb-4 text-white/90">Page Not Found</h2>
                <p className="text-gray-400 max-w-md mb-8">
                    The movie reel you are looking for has been lost in the archives.
                </p>

                <Link
                    to="/"
                    className="group px-8 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                    Back to Home
                    <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
