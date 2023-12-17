import React, { ReactElement } from 'react';
import parse from 'html-react-parser';

interface Rendition {
  url: string;
}


interface StackBlockProps {
  leftSide: {
    title: string;
    content: {
      text: string;
      icons: {
        rendition: Rendition;
      }[];
    }[];
  };
  rightSide: {
    title: string;
    content: {
      text: string;
      icons: {
        rendition: Rendition;
      }[];
    }[];
  };
}

export function StackBlock(props : StackBlockProps): ReactElement {
  const leftSide = props.leftSide;
  const rightSide = props.rightSide;

  const leftIcons = leftSide.content[0].icons;
  const rightIcons = rightSide.content[0].icons;

  return (
    <div className="stack-block">
      <div className="stack-block-left">
        <h2>{leftSide.title}</h2>
        {leftIcons && (
          <div className="stack-block__icons">
            {leftIcons.map((icon, idx) => {
              return <img src={icon.rendition.url} alt="Icon" key={idx} />;
            })}
          </div>
        )}
        {leftSide.content[0].text && (
          <div className="stack-block__text">{parse(leftSide.content[0].text)}</div>
        )}
      </div>
      <div className="stack-block-right">
        <h2>{rightSide.title}</h2>
        {rightIcons && (
          <div className="stack-block__icons">
            {rightIcons.map((icon, idx) => {
              return <img src={icon.rendition.url} alt="Icon" key={idx} />;
            })}
          </div>
        )}
        {rightSide.content[0].text && (
          <div className="stack-block__text">{parse(rightSide.content[0].text)}</div>
        )}
      </div>
    </div>
  );
}

