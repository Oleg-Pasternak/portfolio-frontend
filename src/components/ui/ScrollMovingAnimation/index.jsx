import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ScrollMovingAnimation = (props) => {
  const squareRef = useRef(null);
  const lineRef = useRef(null);
  const rectangleRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(squareRef.current, { y: -100 + scrollY * 0.3, x: 0 + scrollY * 0.1, duration: 1 });
    tl.to(lineRef.current, { y: -100 + scrollY * 0.6, x: 0 - scrollY * 0.08, duration: 1 }, '-=1');
    tl.to(rectangleRef.current, { y: 20 + scrollY * 0.05, x: -150 + scrollY * 0.05, duration: 1 }, '-=1');
  }, [scrollY]);

  return (
    <div className="scroll-moving-container">
      <div 
        ref={squareRef} 
        className="square"
        style={{background: `-webkit-linear-gradient(90deg, ${props.color1} 0%, #F7BB97 100%, ${props.color2} 100%)`}}
      />
      <div 
        ref={rectangleRef} 
        className="rectangle" 
        style={{background: `-webkit-linear-gradient(90deg, ${props.color1} 0%, #F7BB97 100%, ${props.color2} 100%)`}}
      />
      <div 
        ref={lineRef} 
        className="line" 
        style={{background: `-webkit-linear-gradient(90deg, ${props.color1} 0%, #F7BB97 100%, ${props.color2} 100%)`}}
      />
    </div>
  );
};

export default ScrollMovingAnimation;
