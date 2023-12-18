import React, { useEffect } from 'react';
import { ImageProps } from 'src/constants/interfaces';
import gsap from 'gsap';

export const WideImage = (props: ImageProps) => {
  const image = props.image.rendition.url

  useEffect(() => {
    gsap.fromTo('.wide-image', {y: 50}, {y: 0, duration: 1})
    gsap.fromTo('.wide-image', {opacity: 0}, {opacity: 1, duration: 2})
  }, []);

  
    return (
      <div className={props.notFullWidth ? "wide-image" : "wide-image full-width"}>
        <img src={image} alt="Wide Image" style={{maxHeight: props.maxHeight, padding: props.padding }}/>
      </div>
    );
  };