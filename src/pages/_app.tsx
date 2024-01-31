import '../styles/main.scss';
import { gsap } from 'gsap';
import TweenTarget from 'gsap';
import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';
import Context from 'src/Context';
import TagManager from 'react-gtm-module';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const scrollContainerRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Set up GSAP ticker to work with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for better performance
    gsap.ticker.lagSmoothing(0);

    // Set up ScrollTrigger
    gsap.registerPlugin(Lenis); // Register Lenis as a GSAP plugin
    gsap.utils.toArray('.animate-me').forEach((element: any) => {
        gsap.to(element, {
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top bottom', // Adjust as needed
          end: 'bottom top', // Adjust as needed
          scrub: true,
          pin: true,
        },
      });
    });

    const onMouseMove = (e: React.MouseEvent) => {
      const tagName = (e.target as Element).tagName.toLowerCase();
      const isLink = tagName === 'svg' || tagName === 'a' || tagName === 'span' || tagName === 'img' || tagName === 'button';

      gsap.to(cursorRef.current, {
        left: e.clientX,
        top: e.clientY,
        scale: isLink ? 1.5 : 1, // Adjust the scale factor as needed
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove as unknown as EventListener);

    TagManager.initialize({ gtmId: 'G-TZEYJMJWHG' });
    TagManager.initialize({ gtmId: 'G-K2BKRLV2BC' });

    // Cleanup: Remove event listeners and destroy Lenis when the component unmounts
    return () => {
      window.removeEventListener('mousemove', onMouseMove as unknown as EventListener);
      lenis.destroy();
    };
  }, []);

  const value = {
    scrollContainerRef,
    cursorRef,
  };

  return (
    <Context.Provider value={value}>
      <div ref={scrollContainerRef} style={{position: 'relative'}}>
        <Component {...pageProps} />
        <div className="cursor" ref={cursorRef} />
      </div>
    </Context.Provider>
  );
}

export default MyApp;
