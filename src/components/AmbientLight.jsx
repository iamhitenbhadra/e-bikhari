import { useEffect, useRef } from 'react';

const AmbientLight = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        let requestId;
        const handleMouseMove = (e) => {
            if (requestId) return;

            requestId = requestAnimationFrame(() => {
                if (glowRef.current) {
                    glowRef.current.style.left = `${e.clientX}px`;
                    glowRef.current.style.top = `${e.clientY}px`;
                }
                requestId = null;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestId) cancelAnimationFrame(requestId);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="ambient-light"
            style={{
                position: 'fixed',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(41, 151, 255, 0.08) 0%, transparent 60%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 0,
                transition: '0.2s cubic-bezier(0.1, 0.5, 0.1, 1)',
                mixBlendMode: 'screen',
            }}
        />
    );
};

export default AmbientLight;
