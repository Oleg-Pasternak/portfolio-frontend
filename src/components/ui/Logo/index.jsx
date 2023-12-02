import { ReactSVG } from "react-svg";

export const Logo = (props) => {
    return (
      <div className="logo">
        <ReactSVG src={props.image} alt="Logo" />
      </div>
    );
  };