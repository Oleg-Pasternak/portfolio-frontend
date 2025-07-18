import React, { useRef, useEffect } from "react";

interface ScrollVideoProps {
    src: string;
    height?: string | number;
    width?: string | number;
    className?: string;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({
    src,
    height = "100vh",
    width = "100%",
    className = "",
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoLoadedRef = useRef<boolean>(false);
    const animationRef = useRef<number>(0);
    const lastScrollTimeRef = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;

        if (!video || !container) return;

        const playbackConst = 250;
        const throttleTime = 50;

        // Set up video loading
        const setPageHeight = () => {
            if (!videoLoadedRef.current) {
                container.style.height = Math.floor(video.duration) * playbackConst + "px";
                videoLoadedRef.current = true;
            }
        };

        const handleVideoLoaded = () => {
            if (video.readyState >= 3) {
                setPageHeight();
            }
        };

        video.addEventListener('loadedmetadata', handleVideoLoaded);
        video.addEventListener('canplay', handleVideoLoaded);
        
        if (video.readyState >= 3) {
            setPageHeight();
        }

        // Scroll playback function using RAF
        const scrollPlay = () => {
            const currentTime = Date.now();
            
            if (currentTime - lastScrollTimeRef.current > throttleTime && videoLoadedRef.current) {
                const frameNumber = window.scrollY / playbackConst;
                
                if (frameNumber >= 0 && frameNumber <= video.duration) {
                    video.currentTime = frameNumber;
                }

                video.style.opacity = window.scrollY > 450 ? "0" : "1";
                lastScrollTimeRef.current = currentTime;
            }
            
            animationRef.current = requestAnimationFrame(scrollPlay);
        };

        animationRef.current = requestAnimationFrame(scrollPlay);

        return () => {
            cancelAnimationFrame(animationRef.current);
            video.removeEventListener('loadedmetadata', handleVideoLoaded);
            video.removeEventListener('canplay', handleVideoLoaded);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`scroll-video ${className}`}
            style={{
                overflow: "hidden",
                width,
            }}
        >
            <video
                ref={videoRef}
                src={src}
                muted
                preload="auto"
                style={{
                    height,
                    width: "100%",
                    transition: "opacity 0.3s ease",
                }}
            />
        </div>
    );
};
