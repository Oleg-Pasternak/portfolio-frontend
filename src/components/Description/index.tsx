import React, { useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import { Col, Row } from 'react-grid-system';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

interface DescriptionProps {
  title: string;
  text: string;
}

export const Description = (props: DescriptionProps) => {
  const titleRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    const titleElement = titleRef.current;

    // Check if ScrollTrigger is available before using it
    if (titleElement && ScrollTrigger) {
      gsap.to(titleElement, {
        backgroundPositionX: '0%',
        stagger: 1,
        scrollTrigger: {
          trigger: titleElement,
          markers: true,
          scrub: 1,
          start: 'top center',
          end: 'bottom center',
        },
      });
    }
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