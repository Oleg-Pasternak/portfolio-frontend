import { ReactNode } from "react";
import Head from "next/head";

export interface PreloadAsset {
  href: string;
  as: 'video' | 'image' | 'font' | 'style' | 'script';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

interface HeadComponentProps {
  children?: ReactNode;
  page?: string;
  pageIcon?: any;
}

const HeadComponent: React.FC<HeadComponentProps> = (props) => {
  
  const defaultPreloads: PreloadAsset[] = [
    { href: "/videos/mobius.mp4", as: "video", type: "video/mp4" },
    { href: "/videos/shopify.mp4", as: "video", type: "video/mp4" },

    { href: "/svg/badge.svg", as: "image", type: "image/svg+xml" },
    { href: "/images/react-next.png", as: "image", type: "image/png" },
    { href: "/images/static-site.png", as: "image", type: "image/png" },
    { href: "/images/wordpress.png", as: "image", type: "image/png" },
    { href: "/images/perfomance.png", as: "image", type: "image/png" },
    { href: "/images/maintenance.png", as: "image", type: "image/png" },
    { href: "/fonts/ClashDisplay/ClashDisplay-Medium.otf", as: "font", crossOrigin: "anonymous" },
    { href: "/fonts/ClashDisplay/ClashDisplay-Bold.otf", as: "font", crossOrigin: "anonymous" },
    { href: "/fonts/THICCCBOI/THICCCBOI-Regular.ttf", as: "font", crossOrigin: "anonymous" },
    { href: "/fonts/THICCCBOI/THICCCBOI-Medium.ttf", as: "font", crossOrigin: "anonymous" },
  ];

  return (
    <Head>
      {props.children}
      <meta charSet="utf-8" />
      <link rel="icon" href={props.pageIcon} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="theme-color" content="#000000" />
      {props.page && <title>{props.page}</title>}
      
      {defaultPreloads.map((asset, index) => (
        <link
          key={`preload-${index}`}
          rel="preload"
          href={asset.href}
          as={asset.as}
          {...(asset.type && { type: asset.type })}
          {...(asset.crossOrigin && { crossOrigin: asset.crossOrigin })}
        />
      ))}
    </Head>
  );
};

export default HeadComponent;
