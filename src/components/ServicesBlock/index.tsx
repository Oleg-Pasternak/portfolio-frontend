import React, { useState, useEffect, useRef } from "react";
import { ServicePreview } from "src/components/ui/ServicePreview";
import { ServiceItem } from "src/constants/interfaces";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ServicesBlockProps {
  services: ServiceItem[];
  color1?: string;
  color2?: string;
}

export const ServicesBlock: React.FC<ServicesBlockProps> = ({
  services,
  color1,
  color2,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(
    services[0]?.description || ""
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const serviceElements = document.querySelectorAll(
        ".services_inner .service-preview"
      );

      if (serviceElements.length) {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const currentScrollY = window.scrollY;

        // Determine scroll direction
        const isScrollingDown = currentScrollY > lastScrollY;
        setLastScrollY(currentScrollY);

        // Find which service is currently in view
        serviceElements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const topOffset = rect.top + window.scrollY;
          const bottomOffset = topOffset + rect.height;

          if (scrollPosition >= topOffset && scrollPosition <= bottomOffset) {
            setActiveIndex(index);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount to set initial active service
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [services, lastScrollY]);

  // Track scroll progress for the entire services section
  useEffect(() => {
    const updateProgressColor = () => {
      if (!servicesRef.current || !titleRef.current) return;

      const rect = servicesRef.current.getBoundingClientRect();
      const sectionHeight = servicesRef.current.offsetHeight;
      const scrollableDistance = sectionHeight - window.innerHeight;

      let progress = 0;

      if (rect.top <= 0) {
        progress = Math.min(Math.abs(rect.top) / scrollableDistance, 1);
      }

      setScrollProgress(progress);

      // Apply the color gradient to the title
      if (titleRef.current) {
        const targetColor = "#ff6620";

        // Create gradient from left to right based on progress
        titleRef.current.style.backgroundImage = `
          linear-gradient(
            to right,
            ${targetColor} ${progress * 90}%,
            currentColor ${progress * 90}%
          )
        `;
        titleRef.current.style.webkitBackgroundClip = "text";
        titleRef.current.style.backgroundClip = "text";
        titleRef.current.style.webkitTextFillColor = "transparent";
        titleRef.current.style.color = "inherit";
      }
    };

    window.addEventListener("scroll", updateProgressColor);
    // Initialize
    updateProgressColor();

    return () => {
      window.removeEventListener("scroll", updateProgressColor);
    };
  }, []);

  // Animation for description changes
  useEffect(() => {
    if (descriptionRef.current && services[activeIndex]?.description) {
      // Animate current description out
      gsap.to(descriptionRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Change the text content
          setCurrentDescription(services[activeIndex]?.description || "");

          // Animate new description in
          gsap.fromTo(
            descriptionRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }
  }, [activeIndex, services]);

  useEffect(() => {
    const services = servicesRef.current;
    const heading = headingRef.current;
    const inner = innerRef.current;

    if (!services || !heading || !inner) return;

    // Initialize with opacity 0
    gsap.set([heading, inner], { opacity: 0, y: 50 });

    // Create the scroll trigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: services,
        start: "top center+=200",
        end: "bottom top",
        toggleActions: "play none none reverse",
        onEnter: () => {
          // Animate in when scrolling down
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          });

          gsap.to(inner, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          // Animate out when scrolling back up
          gsap.to([heading, inner], {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: "power2.in",
          });
        },
      },
    });

    return () => {
      // Clean up the ScrollTrigger on unmount
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="services"
      id="services"
      ref={servicesRef}
      style={{ marginTop: "1500px" }}
    >
      <div className="services_heading" ref={headingRef}>
        <h2 ref={titleRef}>Services</h2>
        <div className="services_heading-description">
          <p ref={descriptionRef}>{currentDescription}</p>
        </div>
      </div>
      <div className="services_inner" ref={innerRef}>
        {services.map((service, index) => {
          return <ServicePreview {...service} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ServicesBlock;
