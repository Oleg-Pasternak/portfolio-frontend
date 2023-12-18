import React, { useEffect, useRef } from 'react';
import { ImageProps } from 'src/constants/interfaces';
import gsap from 'gsap';

export const WideImage = (props: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollY = window.scrollY;
        console.log(scrollY);
        const translateY = scrollY * 0.1; // Invert the calculation
    
        gsap.to(imageRef.current, { y: translateY, ease: 'none', duration: 0.05 });
      }
    };
    
  
    if (!props.disableParallax) {
      // Attach the scroll event listener
      window.addEventListener('scroll', handleScroll);
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      gsap.fromTo('.wide-image', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
    }
  }, []);
  

  return (
    <div className={props.disableParallax ? 'wide-image' : 'wide-image wide-image-parallax full-width'}>
      <img ref={imageRef} src={props.image.rendition.url} alt="Wide Image" style={{ maxHeight: props.maxHeight, padding: props.padding }} />
    </div>
  );
};
