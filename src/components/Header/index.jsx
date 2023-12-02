import { Logo } from 'src/components/ui/Logo';
import Link from 'next/link';

const Header = (props) => {

    console.log(props)
    return (
        <div className="header">
            <Link href='/' passHref>
                <Logo image={props.logo} />
            </Link>
            <Link href='/' passHref>
                <span>Get in Touch</span>
            </Link>
        </div>
    );
};

export default Header;