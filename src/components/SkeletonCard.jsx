const SkeletonCard = () => {
    return (
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-white/5">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent backdrop-blur-sm" />
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
            </div>
        </div>
    );
};

export default SkeletonCard;
