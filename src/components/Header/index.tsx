import { Img } from "src/components/ui/Img";
import Link from "next/link";
import { Rendition } from "src/constants/interfaces";
import { useTransitionRouter } from "next-view-transitions";
import { triggerPageTransition } from "src/constants/triggerPageTransition";

interface HeaderProps {
  logo: {
    rendition: Rendition;
    svg?: boolean;
  };
  contactEmail: string;
}

const Header = (props: HeaderProps) => {
  const router = useTransitionRouter();
  return (
    <header className="header">
      <Link
        href="/"
        passHref
        onClick={(e) => {
          e.preventDefault();
          router.push(`/`, {
            onTransitionReady: triggerPageTransition,
          });
        }}
      >
        <Img image={props.logo} svg={true} />
      </Link>
      <a href={`mailto:${props.contactEmail}`}>
        <span>MENU</span>
      </a>
    </header>
  );
};

export default Header;
