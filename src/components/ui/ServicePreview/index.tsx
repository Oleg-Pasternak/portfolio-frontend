import Link from "next/link";
import Image from "next/image";
import React, { ReactElement, useRef, useState } from "react";
import { ServiceItem } from "src/constants/interfaces";

export function ServicePreview(props: ServiceItem): ReactElement {
  const [open, setOpen] = useState(props.isOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!contentRef.current) return;
    setOpen(!open);
  };

  return (
    <div className="service-preview">
      <div className="service-preview-heading" onClick={handleToggle}>
        <p>{props.page.title}</p>
        <button
          className="service-preview-arrow"
          aria-label="Open service details"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <div
            className="arrow"
            style={{
              transition: "transform 0.3s",
              transform: open ? "rotate(40deg)" : "rotate(180deg)",
              filter: open ? "grayscale(0)" : "grayscale(1)",
            }}
          />
        </button>
      </div>
      <div
        className={open ? "service-preview-inner service-preview-open" : "service-preview-inner"}
        ref={contentRef}
      >
        <Link href={`/service/${props.page.slug}`} as={`/service/${props.page.slug}`}>
          {props.videoPreview ? (
            <video
              src={props.videoPreview.url}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image 
              src={props.previewImage.rendition.url} 
              alt="Service Image" 
              width={400}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </Link>
        <div className="service-preview-inner__description">
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}
