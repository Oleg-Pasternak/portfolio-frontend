import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import parse from "html-react-parser";
import { Rendition } from "src/constants/interfaces";
import { Img } from "src/components/ui/Img";
import Button from "src/components/ui/Button";
import { useScrollPosition } from "src/hooks/useScrollPosition";
import { useMousePosition } from "src/hooks/useMousePosition";

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
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollPosition = useScrollPosition({
    throttle: 50,
  });
  const mousePosition = useMousePosition();

  useEffect(() => {
    const text = titleRef.current;
    if (text) {
      gsap.to(text, {
        y: -scrollPosition,
        scale: 1 + scrollPosition * 0.002,
        duration: 0.3,
        ease: "power1.out",
        overwrite: true,
      });
    }
  }, [scrollPosition]);

  useEffect(() => {
    const text = titleRef.current;
    if (text && heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = mousePosition.x - centerX;
      const deltaY = mousePosition.y - centerY;
      const maxRotation = 10;
      const rotateY = Math.max(
        -maxRotation,
        Math.min(maxRotation, deltaX * 0.01)
      );
      const rotateX = Math.max(
        -maxRotation,
        Math.min(maxRotation, -deltaY * 0.01)
      );

      gsap.to(text, {
        rotateY,
        rotateX,
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
