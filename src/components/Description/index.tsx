import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { Col, Row } from 'react-grid-system';
import gsap from 'gsap';

interface DescriptionProps {
  title: string;
  text: string;
}

export const Description = (props: DescriptionProps) => {

  return (
    <div className='description'>
      <Row>
        <Col md={2} />
        <Col md={9} className='description-innert'>
          {props.title && (
            <h2>{props.title}</h2>
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