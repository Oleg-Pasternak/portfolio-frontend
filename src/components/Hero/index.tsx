import { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import parse from 'html-react-parser';
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

export default function Hero(props : HeroProps) {
  const titleRef = useRef(null);

  useEffect(() => {
    const text: any = titleRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: text,
        scrub: 1,
        start: "top 90%",
        end: "bottom 30%",
      },
    });

    if (props.darkMode || props.advancedHero) {
      const container = text.parentNode;

      const updateOpacity = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const opacity = 1 - scrollY / window.innerHeight * 2;
        const blur = scrollY / window.innerHeight * 5;
  
        // Use gsap.to for a smoother transition with delay
        gsap.to(container, {
          opacity,
          duration: 0.05, // Adjust the duration as needed
          ease: "power2.inOut", // Choose an ease that fits your preference
        });

        // Use another gsap.to for blur with delay
        gsap.to(container, {
          webkitFilter: `blur(${blur}px)`,
          duration: 0.05, // Adjust the duration as needed
          ease: "power2.inOut", // Choose an ease that fits your preference
          delay: 0.3, // Add a delay to the blur effect
        });
      };
  
      updateOpacity(); // Initial opacity setup
  
      // Listen to the scroll event and update opacity
      window.addEventListener("scroll", updateOpacity);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", updateOpacity);
      };
    }
  }, []);
    
  return (
    <div className={props.advancedHero ? 'hero hero-advanced' : 'hero'}>
      <div className="hero-inner">
          {!props.projectLogo && props.title && (
            <h1 
                style={{background: `-webkit-linear-gradient(30deg, ${props.color1} 0%, ${props.color2} 100%, ${props.color2} 100%)`, backgroundClip: 'revert-layer'}}
                className={!props.color1 || !props.color2 ? 'hero-inner-title' : 'hero-inner-title--gradient'}
                ref={titleRef}
            >
                {props.title}
            </h1>
          )}
          {props.projectLogo && (
            <Img image={props.projectLogo} alt='Project logo' />
          )}
          <div className="hero-inner-description">
            {parse(props.description)}
          </div>
          <div className="hero-inner-buttons">
            {props.websiteUrl && (
              <Button 
                link={props.websiteUrl}
              >
                Open
              </Button>
            )}
            {props.iosUrl && (
              <Button 
                link={props.iosUrl}
                ios
              />
            )}
          </div>
      </div>
    </div>
  )
}
  