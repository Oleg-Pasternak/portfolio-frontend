import { Logo } from 'src/components/ui/Logo';
import Link from 'next/link';

interface HeaderProps {
    logo: string;
    contactEmail: string;
  }

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header className="header">
            <Link href='/' passHref>
                <Logo image={props.logo} />
            </Link>
            <a href={`mailto:${props.contactEmail}`}>
                <span>Get in Touch</span>
            </a>
        </header>
    );
};

export default Header;