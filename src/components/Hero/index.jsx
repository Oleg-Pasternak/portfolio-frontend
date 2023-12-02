import { useRef, useEffect } from "react";
import { gsap } from 'gsap';
import { Parser as HtmlToReactParser } from 'html-to-react';
var htmlToReactParser = new HtmlToReactParser()


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
            <h1 ref={titleRef}>{props.title}</h1>
            {htmlToReactParser.parse(props.description)}
        </div>
      </div>
    )
  }
  