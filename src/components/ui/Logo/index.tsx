import { ReactSVG } from "react-svg";
import { ImageProps } from "src/constants/interfaces";


export const Logo = (props: ImageProps) => {
  const image = props.image.rendition.url

  return (
    <div className="logo">
      <ReactSVG src={image} />
    </div>
  );
};
