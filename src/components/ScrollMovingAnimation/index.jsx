import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ScrollMovingAnimation = () => {
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
      <div ref={squareRef} className="square"></div>
      <div ref={rectangleRef} className="rectangle"></div>
      <div ref={lineRef} className="line"></div>
    </div>
  );
};

export default ScrollMovingAnimation;
