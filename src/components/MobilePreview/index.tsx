import React, { useEffect } from 'react';
import { Rendition } from 'src/constants/interfaces';
import { Img } from '../ui/Img';

interface MobilePreviewProps {
    images: Rendition[];
    color: string;
}

export const MobilePreview = (props: MobilePreviewProps) => {
    return (
      <div className='mobile-preview full-width' style={{backgroundColor: (props.color ? props.color : '#FBD460')}}>
        <div className="mobile-preview-images">
            {props.images.map((image, index) => (
                <Img key={index} image={image} />
            ))}
        </div>
      </div>
    );
};