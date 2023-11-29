import '../styles/globals.scss';
import { gsap } from 'gsap';
import Lenis from '@studio-freight/lenis';
import { useEffect, useRef } from 'react';

function MyApp({ Component, pageProps }) {
  const scrollContainerRef = useRef(null);

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
    gsap.utils.toArray('.animate-me').forEach((element) => {
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

    // Cleanup: Remove event listeners and destroy Lenis when the component unmounts
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scrollContainerRef}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
