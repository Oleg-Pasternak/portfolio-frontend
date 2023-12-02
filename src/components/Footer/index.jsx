import { Parser as HtmlToReactParser } from 'html-to-react';
var htmlToReactParser = new HtmlToReactParser()

const Footer = (props) => {
  return (
    <div className="footer">
        <div className="footer-text">
            {htmlToReactParser.parse(props.footerText)}
        </div>
        <div className="footer-inner">
            <span>© 2023</span>
            <div className="footer-links">
                <a href={props.githubLink} target='_blank' rel="noreferrer">
                    <div className="github" />
                </a>
                <a href={props.linkedinLink} target='_blank' rel="noreferrer">
                    <div className="linkedin" />
                </a>
            </div>
        </div>
    </div>
  );
};

export default Footer;