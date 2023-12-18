import { Logo } from 'src/components/ui/Logo';
import Link from 'next/link';

interface HeaderProps {
    logo: string;
    contactEmail: string;
    alt: string;
}

const Header = (props: HeaderProps) => {
    return (
        <header className="header">
            <Link href='/' passHref>
                <Logo image={props.logo} alt={props.alt} />
            </Link>
            <a href={`mailto:${props.contactEmail}`}>
                <span>Get in Touch</span>
            </a>
        </header>
    );
};

export default Header;