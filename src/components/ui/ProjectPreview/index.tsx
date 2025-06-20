import Link from "next/link";
import React, { ReactElement, useState, useEffect, useRef } from "react";
import { ProjectItem } from "src/constants/interfaces";
import { useTransitionRouter } from "next-view-transitions";
import { triggerPageTransition } from "src/constants/triggerPageTransition";
import { useRouter } from "next/router";
import gsap from "gsap";

export function ProjectPreview(props: ProjectItem): ReactElement {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useTransitionRouter();
  const nextRouter = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

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

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 2;
    const rotateX = -((y - centerY) / centerY) * 2;

    // Animate with GSAP
    gsap.to(card, {
      duration: 0.5,
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      transformStyle: "preserve-3d",
    });
  };

  // Reset card on mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.5,
        rotateX: 0,
        rotateY: 0,
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
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        borderRadius: "8px",
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
        <img
          src={props.previewImage.rendition.url}
          alt="Project Image"
          style={{
            filter: isHovering && !isMobile ? "none" : "grayscale(100%)",
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
