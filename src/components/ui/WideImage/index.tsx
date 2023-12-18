import React from 'react';

interface WideImageProps {
    src: string;
    alt: string;
}

const WideImage: React.FC<WideImageProps> = ({ src, alt }) => {
    return (
        <div className="wide-image">
            <img src={src} alt={alt} />
        </div>
    );
};

export default WideImage;
