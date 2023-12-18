import React from 'react';
import { ImageProps } from 'src/constants/interfaces';

export const WideImage = (props: ImageProps) => {
    const image = props.image.rendition.url
  
    return (
      <div className="wide-image full-width">
        <img src={image} alt="Wide Image" />
      </div>
    );
  };