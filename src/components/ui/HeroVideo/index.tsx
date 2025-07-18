import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface HeroVideoProps {
    src: string;
    height?: string | number;
    width?: string | number;
    className?: string;
    hideOnScroll?: boolean;
    scrollThreshold?: number;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
    src,
    height = "100vh",
    width = "100%",
    className = "",
    hideOnScroll = true,
    scrollThreshold = 350,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS device
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(iOS);
    }, []);

    useEffect(() => {
        if (!hideOnScroll || !containerRef.current) return;

        const container = containerRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const targetOpacity = scrollPosition < scrollThreshold ? 1 : 0;
            
            gsap.to(container, {
                opacity: targetOpacity,
                duration: 0.5,
                ease: "power2.out"
            });
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hideOnScroll, scrollThreshold]);

    useEffect(() => {
        // Attempt to play video after component mounts
        if (videoRef.current && !isIOS) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play was prevented:", error);
                });
            }
        }
    }, [isIOS]);

    const handleUserInteraction = () => {
        if (videoRef.current && isIOS) {
            videoRef.current.play().catch(error => {
                console.log("Video play failed:", error);
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className={`hero-video ${className}`}
            style={{
                overflow: "hidden",
                width,
            }}
            onClick={handleUserInteraction}
            onTouchStart={handleUserInteraction}
        >
            <video
                ref={videoRef}
                src={src}
                muted
                autoPlay={!isIOS}
                loop
                preload="auto"
                playsInline
                webkit-playsinline="true"
                style={{
                    height,
                    width: "100%",
                }}
            />
        </div>
    );
};