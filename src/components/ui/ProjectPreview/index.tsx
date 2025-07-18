import Link from "next/link";
import Image from "next/image";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import { ProjectItem } from "src/constants/interfaces";
import { useTransitionRouter } from "next-view-transitions";
import { triggerPageTransition } from "src/constants/triggerPageTransition";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useMousePosition } from "src/hooks/useMousePosition";
import { useScrollPosition } from "src/hooks/useScrollPosition";

export function ProjectPreview(props: ProjectItem): ReactElement {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useTransitionRouter();
  const nextRouter = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      setIsMobile(mediaQuery.matches);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  useEffect(() => {
    // Only change colors if not on mobile
    if (!isMobile) {
      if (isHovering) {
        document.body.style.color = "#ffffff";
        document.body.style.backgroundColor =
          props.backgroundColor || "#ffffff";
        document.body.style.transition = "background-color 0.5s, color 0.5s";

        nextRouter.prefetch(`/project/${props.page.slug}`);
      } else {
        document.body.style.backgroundColor = "";
        document.body.style.color = "#ffffff";
        document.body.style.backgroundColor = "#050505";
      }
    }
    if (isMobile) {
      nextRouter.prefetch(`/project/${props.page.slug}`);
    }
    return () => {
      document.body.style.color = "#050505";
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, [
    isHovering,
    props.backgroundColor,
    nextRouter,
    props.page.slug,
    isMobile,
  ]);

  // Use mouse position and scroll position for 3D effect
  useEffect(() => {
    if (!isHovering || isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card
    const x = mouse.x - rect.left;
    const y = mouse.y - rect.top;

    // Only animate if mouse is inside the card
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 2;
      const rotateX = -((y - centerY) / centerY) * 2;

      gsap.to(card, {
        duration: 0.5,
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        ease: "power2.out",
        transformStyle: "preserve-3d",
      });
    }
  }, [mouse, isHovering, isMobile]);

  // Reset card on mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        transformPerspective: 1000,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-preview"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      <Link
        href={`/project/${props.page.slug}`}
        as={`/project/${props.page.slug}`}
        onClick={(e) => {
          e.preventDefault();
          router.push(`/project/${props.page.slug}`, {
            onTransitionReady: triggerPageTransition,
          });
        }}
      >
        <Image
          src={props.previewImage.rendition.url}
          alt="Project Image"
          width={600}
          height={400}
          style={{
            filter: isHovering || isMobile ? "none" : "grayscale(100%)",
            transition: "filter 0.5s ease",
            transformStyle: "preserve-3d",
            transform: "translateZ(20px)",
            width: "100%",
            height: "auto",
          }}
        />
      </Link>
      <div
        className="project-preview-description"
        style={{
          transform: "translateZ(30px)",
          transformStyle: "preserve-3d",
        }}
      >
        <Link
          href={`/project/${props.page.slug}`}
          as={`/project/${props.page.slug}`}
        >
          <p>{props.page.title}</p>
        </Link>
      </div>
    </div>
  );
}
