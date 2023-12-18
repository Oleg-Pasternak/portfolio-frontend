import { ReactSVG } from "react-svg";

interface LogoProps {
  image: string;
  alt: string;
}

export const Logo = (props: LogoProps) => {
  return (
    <div className="logo">
      <img src={props.image} alt={props.alt} />
    </div>
  );
};
