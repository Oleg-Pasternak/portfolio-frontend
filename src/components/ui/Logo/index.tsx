import { ReactSVG } from "react-svg";
import { Rendition } from "src/constants/interfaces";

interface LogoProps {
  image: {
    rendition: Rendition;
  };
}

export const Logo = (props: LogoProps) => {
  const image = props.image.rendition.url

  return (
    <div className="logo">
      <ReactSVG src={image} />
    </div>
  );
};
