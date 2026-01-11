import { useState, useEffect } from 'react';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState(() => {
        try {
            const stored = localStorage.getItem('vexo_watchlist');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('vexo_watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (item) => {
        setWatchlist((prev) => {
            if (prev.find((i) => i.id === item.id)) return prev;
            return [...prev, { ...item, timestamp: Date.now() }];
        });
    };

    const removeFromWatchlist = (id) => {
        setWatchlist((prev) => prev.filter((i) => i.id !== id));
    };

    const isInWatchlist = (id) => {
        return !!watchlist.find((i) => i.id === id);
    };

    return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};
