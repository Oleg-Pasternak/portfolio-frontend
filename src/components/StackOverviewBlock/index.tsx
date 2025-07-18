import React, { ReactElement } from "react";
import parse from "html-react-parser";
import Image from "next/image";
import { StackOverviewBlockProps } from "src/constants/interfaces";
import Link from "next/link";

export function StackOverviewBlock(
  props: StackOverviewBlockProps
): ReactElement {
  const { color1, color2, title, description, icons } = props;

  const renderIcons = (icons: any[]) => {
    return (
      <div className="stack-overview__icons">
        {icons.map((icon, idx) => (
          <Image 
            src={icon.rendition.url} 
            alt="Icon" 
            key={idx}
            width={50} 
            height={50}
            style={{ width: 'auto', height: 'auto' }}
          />
        ))}
      </div>
    );
  };

  const renderText = (text: string) => {
    return <div className="stack-overview__text">{parse(text)}</div>;
  };

  return (
    <div className="stack-overview">
      <div className="stack-overview-head">
        {title && (
          <div className="stack-overview-head__title">
            <h2>{title}</h2>
          </div>
        )}
        {description && (
          <div className="stack-overview-head__description">
            <p>{description}</p>
            <Link
              href="/about"
              as="/services"
              className="stack-overview-head__link"
            >
              Let’s create
              <div className="orange-arrow" />
            </Link>
          </div>
        )}
      </div>
      <div className="stack-overview__scroll-container">
        {icons && renderIcons(icons)}
        {icons && renderIcons(icons)}
      </div>
    </div>
  );
}
