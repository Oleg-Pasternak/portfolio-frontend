import { Img } from 'src/components/ui/Img';
import Link from 'next/link';
import { Rendition } from 'src/constants/interfaces';
interface HeaderProps {
    logo: {
        rendition: Rendition;
        svg?: boolean;
    };
    contactEmail: string;
}

const Header = (props: HeaderProps) => {
    return (
        <header className="header">
            <Link href='/' passHref>
                <Img image={props.logo} svg={true} />
            </Link>
            <a href={`mailto:${props.contactEmail}`}>
                <span>Get in Touch</span>
            </a>
        </header>
    );
};

export default Header;