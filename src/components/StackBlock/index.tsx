import React, { ReactElement } from 'react';
import parse from 'html-react-parser';
import { StackBlockProps } from 'src/constants/interfaces';

export function StackBlock(props: StackBlockProps): ReactElement {
  const { color1, color2, leftSide, rightSide, darkMode } = props;

  const renderIcons = (icons: any[]) => {
    return (
      <div className="stack-block__icons">
        {icons.map((icon, idx) => (
          <img src={icon.rendition.url} alt="Icon" key={idx} />
        ))}
      </div>
    );
  };

  const renderText = (text: string) => {
    return <div className="stack-block__text">{parse(text)}</div>;
  };

  return (
    <div className={darkMode ? "stack-block stack-block-gradient" : "stack-block"}>
      <div className="stack-block-left">
        <div className="stack-block-left__inner">
          {leftSide.title && (
            <div className="stack-block-left__title">
              <h2>{leftSide.title}</h2>
            </div>
          )}
          {leftSide.content[0].icons && renderIcons(leftSide.content[0].icons)}
          {leftSide.content[0].text && renderText(leftSide.content[0].text)}
        </div>
      </div>
      <div className="stack-block-right">
        {rightSide.title && (
          <div className="stack-block-right__title">
            <h2>{rightSide.title}</h2>
          </div>
        )}
        {rightSide.content[0].icons && renderIcons(rightSide.content[0].icons)}
        {rightSide.content[0].text && renderText(rightSide.content[0].text)}
      </div>
    </div>
  );
}

