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
}

export default function Hero(props : HeroProps) {
  const titleRef = useRef(null);

  useEffect(() => {
    const text = titleRef.current;
  
    gsap.timeline({
      scrollTrigger: {
        trigger: text,
        scrub: 1,
        start: "top 90%",
        end: "bottom 30%",
      },
    });

    gsap.fromTo('.hero-inner', {opacity: 0}, {opacity: 1, duration: 1})
        
  }, []);

    
    return (
      <div className='hero'>
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
  