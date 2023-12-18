import { ReactSVG } from "react-svg";
import { Rendition } from "src/constants/interfaces";

interface ImgProps {
  image: Rendition;
  svg?: boolean;
  alt?: string;
  width?: number;
  height?: number;
}

export const Img = (props: ImgProps) => {
  const image = props.image.rendition.url

  return (
    <div className="image">
      {props.svg && (
        <ReactSVG src={image} />
      )}
      {!props.svg && (
        <img 
          src={image} 
          alt={props.alt} 
          width={props.width} 
          height={props.height} 
        />
      )}
    </div>
  );
};
