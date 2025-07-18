import { ReactSVG } from "react-svg";

interface Rendition {
  rendition: {
    url: string;
  };
}

interface ImgProps {
  image: string | Rendition;
  svg?: boolean;
  alt?: string;
  width?: number;
  height?: number;
}

export const Img = (props: ImgProps) => {
  const image = (props.svg ? props.image : (props.image as Rendition).rendition.url);
  
  return (
    <div className="image">
      {props.svg && image && (
        <ReactSVG src={image.toString()} />
      )}
      {!props.svg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={image.toString()} 
          alt={props.alt} 
          width={props.width} 
          height={props.height} 
        />
      )}
    </div>
  );
};
