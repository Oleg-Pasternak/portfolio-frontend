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
  console.log(image)

  return (
    <div className="image">
      {props.svg && (
        <ReactSVG src={image} />
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
