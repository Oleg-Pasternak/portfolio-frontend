import Link from "next/link";
import React, { ReactElement, useState, useEffect } from "react";
import { ProjectItem } from "src/constants/interfaces";
import { useTransitionRouter } from "next-view-transitions";

export function ProjectPreview(props: ProjectItem): ReactElement {
  const [isHovering, setIsHovering] = useState(false);
  const router = useTransitionRouter();

  useEffect(() => {
    if (isHovering) {
      document.body.style.color = "#ffffff";
      document.body.style.backgroundColor = props.backgroundColor || "#ffffff";
      document.body.style.transition = "background-color 0.5s, color 0.5s";
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.color = "#ffffff";
      document.body.style.backgroundColor = "#050505";
    }

    return () => {
      document.body.style.color = "#050505";
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, [isHovering, props.backgroundColor]);

  // const triggerPageTransition = () => {
  //   document.documentElement.animate(
  //     [
  //       { clipPath: "polygon(25% 75%, 75% 75%, 25% 75%" },
  //       { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%" },
  //     ],
  //     {
  //       duration: 2000,
  //       easing: "cubic-bezier(0.9, 0, 0.1, 1)",
  //       pseudoElement: "::view-transition-new(root)",
  //     }
  //   );
  // };

  const triggerPageTransition = () => {
    document.documentElement.animate(
      [
        {
          transform: "translateY(0)",
          opacity: 1,
          scale: 1,
        },
        {
          transform: "translateY(-100px)",
          opacity: 0.5,
          scale: 0.9,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        pseudoElement: "::view-transition-old(root)",
        fill: "forwards",
      }
    );
    document.documentElement.animate(
      [
        {
          transform: "translateY(100%)",
        },
        {
          transform: "translateY(0)",
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0.76, 0, 0.24, 1)",
        pseudoElement: "::view-transition-new(root)",
        fill: "forwards",
      }
    );
  };

  return (
    <div
      className="project-preview"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
            filter: isHovering ? "none" : "grayscale(100%)",
            transition: "filter 0.5s ease",
          }}
        />
      </Link>
      <div className="project-preview-description">
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
