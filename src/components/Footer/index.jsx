import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-text">
            <span>
                Looking for a skilled developer to turn your ideas into reality? 
                <Link href='#' passHref>Get in touch </Link> 
                to explore the possibilities.
            </span>
        </div>
        <div className="footer-inner">
            <span>© 2023</span>
            <div className="footer-links">
                <Link href='/' passHref>
                    <div className="github" />
                </Link>
                <Link href='/' passHref>
                    <div className="linkedin" />
                </Link>
            </div>
        </div>
    </div>
  );
};

export default Footer;