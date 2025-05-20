import parse from "html-react-parser";
import React, { ReactElement } from "react";

interface FooterProps {
  footerText: string;
  githubLink: string;
  linkedinLink: string;
  style?: React.CSSProperties;
}

const Footer = (props: FooterProps): ReactElement => {
  return (
    <footer className="footer" style={props.style}>
      <div className="footer-text">{parse(props.footerText)}</div>
      <div className="footer-inner">
        <span>© 2025</span>
        <div className="footer-links">
          <a href={props.githubLink} target="_blank" rel="noreferrer">
            <div className="github" />
          </a>
          <a href={props.linkedinLink} target="_blank" rel="noreferrer">
            <div className="linkedin" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
