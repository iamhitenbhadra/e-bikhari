import { motion } from 'framer-motion';

const NetworkError = ({ onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-[#0a0a0a] min-h-[50vh] w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md space-y-6"
            >
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1l22 22"></path>
                        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
                        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
                        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
                        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                        <line x1="12" y1="20" x2="12.01" y2="20"></line>
                    </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white">Connection Failed</h3>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left space-y-2">
                    <p className="text-white/80 font-medium">Tips to fix this:</p>
                    <ul className="text-sm text-white/60 list-disc list-inside space-y-1">
                        <li>Check your internet connection</li>
                        <li className="text-yellow-400/90 font-semibold">Try enabling a VPN (TMDB may be blocked)</li>
                        <li>Disable ad-blockers</li>
                    </ul>
                </div>

                <button
                    onClick={onRetry}
                    className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                >
                    Try Again
                </button>
            </motion.div>
        </div>
    );
};

export default NetworkError;
