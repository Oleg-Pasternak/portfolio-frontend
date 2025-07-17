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
  darkMode?: boolean;
}

const Header = (props: HeaderProps) => {
  const router = useTransitionRouter();
  return (
    <header className={props.darkMode ? "header header-dark" : "header"}>
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
      <Link href='/about' onClick={(e) => {
          e.preventDefault();
          router.push(`/about`, {
            onTransitionReady: triggerPageTransition,
          });
        }}>
        <span>ABOUT</span>
      </Link>
    </header>
  );
};

export default Header;
