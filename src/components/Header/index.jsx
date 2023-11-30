import Logo from 'public/assets/logo.jsx';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="header">
      <Link href='/'>
        <Logo />
      </Link>
      <Link href='/'>
        <span>Get in Touch</span>
      </Link>
    </div>
  );
};

export default Header;