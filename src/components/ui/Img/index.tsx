import { ReactSVG } from "react-svg";
import { Rendition } from "src/constants/interfaces";

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
      {props.svg && (
        <ReactSVG src={image.toString()} />
      )}
      {!props.svg && (
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
