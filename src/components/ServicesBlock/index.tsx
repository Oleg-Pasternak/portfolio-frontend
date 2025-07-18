import React, { useState, useEffect, useRef } from "react";
import { ServicePreview } from "src/components/ui/ServicePreview";
import { ServiceItem } from "src/constants/interfaces";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollPosition } from "src/hooks/useScrollPosition";

gsap.registerPlugin(ScrollTrigger);

interface ServicesBlockProps {
  services: ServiceItem[];
  color1?: string;
  color2?: string;
}

export const ServicesBlock: React.FC<ServicesBlockProps> = ({ services }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const lastScrollY = useRef(0);
  const [currentDescription, setCurrentDescription] = useState(
    services[0]?.description || ""
  );
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const scrollY = useScrollPosition();

  useEffect(() => {
    const serviceElements = document.querySelectorAll(
      ".services_inner .service-preview"
    );
    if (serviceElements.length) {
      const scrollPosition = scrollY + window.innerHeight / 2;
      const currentScrollY = scrollY;
      lastScrollY.current = currentScrollY;
      serviceElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const topOffset = rect.top + window.scrollY;
        const bottomOffset = topOffset + rect.height;
        if (scrollPosition >= topOffset && scrollPosition <= bottomOffset) {
          setActiveIndex(index);
        }
      });
    }
  }, [scrollY]);

  useEffect(() => {
    if (descriptionRef.current && services[activeIndex]?.description) {
      gsap.to(descriptionRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentDescription(services[activeIndex]?.description || "");
          gsap.fromTo(
            descriptionRef.current,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
          );
        },
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    const services = servicesRef.current;
    const heading = headingRef.current;
    const inner = innerRef.current;
    if (!services || !heading || !inner) return;
    gsap.set([heading, inner], { opacity: 0, y: 50 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: services,
        start: "top center+=200",
        end: "bottom top",
        toggleActions: "play none none reverse",
        onEnter: () => {
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
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      className="services"
      id="services"
      ref={servicesRef}
    >
      <div className="services_heading" ref={headingRef}>
        <h2 ref={titleRef}>Services</h2>
        <div className="services_heading-description">
          <p ref={descriptionRef}>{currentDescription}</p>
        </div>
      </div>
      <div className="services_inner" ref={innerRef}>
        {services.map((service, index) => {
            return (
            <ServicePreview
              {...service}
              key={index}
              isOpen={index === 0}
            />
            );
        })}
      </div>
    </div>
  );
};

export default ServicesBlock;
