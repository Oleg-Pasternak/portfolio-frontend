'use client';

import { useCallback } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export function useRevealer() {
  const reveal = useCallback((element: HTMLElement) => {
    gsap.to(element, {
      scaleY: 0,
      duration: 1.25,
      ease: "hop",
      delay: 1,
    });
  }, []);

  return { reveal };
}
