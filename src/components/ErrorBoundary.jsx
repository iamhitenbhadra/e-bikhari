import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-6 text-center">
                    <div className="w-24 h-24 mb-8 relative">
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                        <div className="relative z-10 w-full h-full border-2 border-red-500/30 rounded-full flex items-center justify-center">
                            <span className="text-4xl">⚠️</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-4 font-display">Something went wrong</h1>
                    <p className="text-gray-400 max-w-md mb-8">
                        We encountered an unexpected error. Please try refreshing the page or come back later.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                        >
                            Refresh Page
                        </button>
                        <a
                            href="/"
                            className="px-6 py-2 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
                        >
                            Go Home
                        </a>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
