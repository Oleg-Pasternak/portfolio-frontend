import { ReactNode } from 'react';
import Head from 'next/head';

interface HeadComponentProps {
  children?: ReactNode;
  page?: string;
}

const HeadComponent: React.FC<HeadComponentProps> = (props) => {
  return (
    <Head>
      {props.children}
      <meta charSet="utf-8" />
      <link rel="icon" href="public/assets/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="theme-color" content="#000000" />
      {props.page && (
        <title>{props.page}</title>
      )}
    </Head>
  );
}

export default HeadComponent;
