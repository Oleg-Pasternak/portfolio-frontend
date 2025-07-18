import React, { useEffect, useRef } from "react";
import parse from "html-react-parser";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

interface DescriptionProps {
  title: string;
  text: string;
}

export const Description = (props: DescriptionProps) => {
  const titleRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const titleElement: any = titleRef.current;

      const split = new SplitType(titleElement, { types: "lines" });

      if (split.lines) {
        split.lines.forEach((target) => {
          gsap.to(target, {
            backgroundPositionX: "0%",
            ease: "none",
            scrollTrigger: {
              trigger: target,
              scrub: 1,
              start: "top center",
              end: "bottom center",
            },
          });
        });
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [titleRef]);

  return (
    <div className="description">
      <div className="description-container">
        <div className="description-inner">
          {props.title && <h2 ref={titleRef}>{props.title}</h2>}
          {props.text && (
            <div className="description__content">{parse(props.text)}</div>
          )}
        </div>
      </div>
    </div>
  );
};
