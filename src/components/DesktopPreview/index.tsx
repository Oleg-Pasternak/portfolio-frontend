import React, { useEffect } from 'react';
import { Rendition } from 'src/constants/interfaces';
import { Img } from '../ui/Img';

interface DesktopPreviewProps {
    images: Rendition[];
    color1: string;
    color2: string;
}

export const DesktopPreview = (props: DesktopPreviewProps) => {
    return (
      <div className='desktop-preview full-width' style={{background: (`linear-gradient(150deg, ${props.color1 ? props.color1 : '#FBD460'} 10%, ${props.color2 ? props.color2 : 'EDBA23'} 80%)`)}}>
        <div className="desktop-preview-images">
          {props.images.map((image, index) => (
                <Img key={index} image={image} />
          ))}
        </div>
      </div>
    );
  };