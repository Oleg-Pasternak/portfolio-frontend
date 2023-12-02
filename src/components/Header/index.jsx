import { Logo } from 'src/components/ui/Logo';
import Link from 'next/link';

const Header = (props) => {

    return (
        <div className="header">
            <Link href='/' passHref>
                <Logo image={props.logo} />
            </Link>
            <a href={`mailto:${props.contactEmail}`} passHref>
                <span>Get in Touch</span>
            </a>
        </div>
    );
};

export default Header;