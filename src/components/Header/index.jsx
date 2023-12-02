import { Logo } from 'src/components/ui/Logo';
import Link from 'next/link';

const Header = (props) => {

    console.log(props)
    return (
        <div className="header">
            <Link href='/'>
                <Logo image={props.logo} />
            </Link>
            <Link href='/'>
                <span>Get in Touch</span>
            </Link>
        </div>
    );
};

export default Header;