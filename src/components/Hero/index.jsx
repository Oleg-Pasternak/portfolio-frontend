import { useRef, useEffect } from "react";
import { gsap } from 'gsap';


export default function Hero(props) {
    const titleRef = useRef(null);

    useEffect(() => {
        const text = titleRef.current;
    
        gsap.timeline({
            scrollTrigger: {
                trigger: text,
                scrub: 1,
                trigger: ".scroll-trigger-ready__worm-wrap",
                start: "top 90%",
                end: "bottom 30%",
            },
          });
    }, []);

    
    return (
      <div className='hero'>
        <div className="hero-inner">
            <h1 ref={titleRef}>Hello, I’m Oleg</h1>
            <p>Front-end engineer</p>
        </div>
      </div>
    )
  }
  