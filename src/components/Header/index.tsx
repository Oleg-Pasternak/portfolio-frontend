import { Logo } from 'src/components/ui/Logo';
import Link from 'next/link';
import { Rendition } from 'src/types';

interface HeaderProps {
    logo: {
        rendition: Rendition;
    };
    contactEmail: string;
}

const Header = (props: HeaderProps): React.ReactElement => {
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
}

export default Header;