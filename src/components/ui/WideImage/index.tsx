import React, { useEffect, useRef } from "react";
import { ImageProps } from "src/constants/interfaces";
import gsap from "gsap";
import { useScrollPosition } from "src/hooks/useScrollPosition";

export const WideImage = (props: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const scrollY = useScrollPosition();

  useEffect(() => {
    if (!props.disableParallax && imageRef.current) {
      const translateY = scrollY * 0.1;
      gsap.to(imageRef.current, {
        y: translateY,
        ease: "none",
        duration: 0.05,
      });
    }
  }, [scrollY, props.disableParallax]);

  useEffect(() => {
    if (props.disableParallax) {
      gsap.fromTo(
        ".wide-image",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }
  }, [props.disableParallax]);

  return (
    <div
      className={
        props.disableParallax
          ? "wide-image"
          : "wide-image wide-image-parallax full-width"
      }
    >
      <img
        ref={imageRef}
        src={props.image.rendition.url}
        alt="Wide Image"
        style={{ maxHeight: props.maxHeight, padding: props.padding }}
      />
    </div>
  );
};
