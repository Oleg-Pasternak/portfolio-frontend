import "../styles/main.scss";
import { gsap } from "gsap";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import Context from "src/Context";
import TagManager from "react-gtm-module";
import { ViewTransitions } from "next-view-transitions";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined" || !scrollContainerRef.current) return;

    lenisRef.current = new Lenis({
      lerp: 0.1,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleRouteChange = () => {
      if (lenisRef.current) {
        lenisRef.current.stop();
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.start();
      }
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      const target = e.target as HTMLElement;
      const isInteractive =
        target && typeof (target as any).closest === "function" &&
        target.closest("a, button, [data-cursor-hover]") !== null;

      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        scale: isInteractive ? 1.5 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    if (process.env.NODE_ENV === "production") {
      TagManager.initialize({ gtmId: "G-TZEYJMJWHG" });
      TagManager.initialize({ gtmId: "G-BN2RYC8Y38" });
    }

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      window.removeEventListener("mousemove", onMouseMove);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [router]);

  const contextValue = {
    scrollContainerRef,
    cursorRef,
    lenis: lenisRef.current,
  };

  return (
    <Context.Provider value={contextValue}>
      <ViewTransitions>
        <div className="smooth-scroll-wrapper">
          <div ref={scrollContainerRef} className="smooth-scroll-content">
            <Component {...pageProps} />
            <div className="cursor" ref={cursorRef} />
          </div>
        </div>
      </ViewTransitions>
    </Context.Provider>
  );
}

export default MyApp;
