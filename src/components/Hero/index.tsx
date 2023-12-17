import { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import parse from 'html-react-parser';

interface HeroProps {
  title: string;
  description: string;
  color1: string;
  color2: string;
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
        
    }, []);

    
    return (
      <div className='hero'>
        <div className="hero-inner">
            <h1 
                style={{background: `-webkit-linear-gradient(30deg, ${props.color1} 0%, ${props.color2} 100%, ${props.color2} 100%)`, backgroundClip: 'revert-layer'}}
                ref={titleRef}
            >
                {props.title}
            </h1>
            {parse(props.description)}
        </div>
      </div>
    )
  }
  