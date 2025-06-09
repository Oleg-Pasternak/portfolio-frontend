import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import parse from "html-react-parser";
import { Rendition } from "src/constants/interfaces";
import { Img } from "src/components/ui/Img";
import Button from "src/components/ui/Button";

interface HeroProps {
  title: string;
  description: string;
  projectLogo?: Rendition;
  websiteUrl?: string;
  iosUrl?: string;
  color1?: string;
  color2?: string;
  darkMode?: boolean;
  advancedHero?: boolean;
}

export default function Hero(props: HeroProps) {
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const heroElement = heroRef.current as HTMLElement | null;
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Initial call to set the initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const text = titleRef.current;
    if (text) {
      gsap.to(text, {
        y: -scrollPosition * 1,
        scale: 1 + scrollPosition * 0.002,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [scrollPosition]);

  useEffect(() => {
    const text = titleRef.current;
    if (text) {
      const limitedY = Math.max(-20, Math.min(20, mousePosition.y));
      gsap.to(text, {
        rotationY: -mousePosition.x * 2,
        rotationX: -limitedY * 0.1,
        transformPerspective: 1000,
        transformOrigin: "center center",
        duration: 0.4,
        ease: "power1.out",
      });
    }
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      ref={heroRef}
      className={props.advancedHero ? "hero hero-advanced" : "hero"}
    >
      <div className="hero-inner">
        {!props.projectLogo && props.title && (
          <h1 className="hero-inner-title" ref={titleRef}>
            {props.title}
          </h1>
        )}
        {props.projectLogo && (
          <Img image={props.projectLogo} alt="Project logo" />
        )}
        {props.description && (
          <div className="hero-inner-description">
            {parse(props.description)}
          </div>
        )}
        <div className="hero-inner-buttons">
          {props.websiteUrl && <Button link={props.websiteUrl}>Open</Button>}
          {props.iosUrl && (
            <Button link={props.iosUrl} ios websiteUrl={props.websiteUrl} />
          )}
        </div>
      </div>
      <a href="#projects" className="hero-scroll-down" ref={scrollContainerRef}>
        <span />
      </a>
    </div>
  );
}
