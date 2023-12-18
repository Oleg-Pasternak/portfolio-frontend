import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import ScrollMovingAnimation from 'src/components/ui/ScrollMovingAnimation';
import { components } from 'src/components';

interface BoilerProps {
  pageData: any;
  color1: string;
  color2: string;
}

const Boiler: React.FC<BoilerProps> = (props) => {
  const pageData = props.pageData.content;

  return (
    <div className="boiler">
      <ScrollMovingAnimation color1={props.color1} color2={props.color2} />
      {pageData.map((section: any, index: number) => {
        if (section.__typename) {
          let Component = components[section.__typename];
          return (
            <ErrorBoundary key={index}>
              <div className="section">
                {Component && <Component {...section} id={index} />}
              </div>
            </ErrorBoundary>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Boiler;
