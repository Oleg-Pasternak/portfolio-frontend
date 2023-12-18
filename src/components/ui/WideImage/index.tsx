import React from 'react';
import { ImageProps } from 'src/constants/interfaces';

export const WideImage = (props: ImageProps) => {
    const image = props.image.rendition.url
  
    return (
      <div className={props.notFullWidth ? "wide-image" : "wide-image full-width"}>
        <img src={image} alt="Wide Image" style={{maxHeight: props.maxHeight }}/>
      </div>
    );
  };