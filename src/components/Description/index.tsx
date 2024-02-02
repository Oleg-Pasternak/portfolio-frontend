import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { Col, Row } from 'react-grid-system';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type'

interface DescriptionProps {
  title: string;
  text: string;
}

export const Description = (props: DescriptionProps) => {
  const titleRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    const titleElement: any = titleRef.current;

    const split = new SplitType(titleElement, { types: 'lines' });
    
    console.log(split)
    
    if (split.lines) {
      split.lines.forEach((target) => {
        gsap.to(target, {
          backgroundPositionX: '0%',
          ease: "none",
          scrollTrigger: {
            trigger: target,
            scrub: 1,
            start: "top center",
            end: "bottom center"
          }
        });
      });
    };
  }, []);

  return (
    <div className='description'>
      <Row>
        <Col md={2} />
        <Col md={9} className='description-innert'>
          {props.title && (
            <h2 ref={titleRef}>{props.title}</h2>
          )}
          {props.text && (
            <div className="description__content">
              {parse(props.text)}
            </div>
          )}
        </Col>
        <Col md={1} />
      </Row>
    </div>
  );
};