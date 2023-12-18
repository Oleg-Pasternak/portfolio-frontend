import { ReactSVG } from "react-svg";

interface LogoProps {
  image: string;
}

export const Logo = (props: LogoProps) => {
  return (
    <div className="logo">
      <ReactSVG src={props.image} />
    </div>
  );
};
