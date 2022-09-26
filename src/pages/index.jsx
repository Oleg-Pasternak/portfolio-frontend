import Header from 'src/components/Header';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';

export default function Home() {
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <body>
      <Head page="メインページ" />
      <Header />
      <div className={isLoad ? 'page-loaded' : ''} id='three-js' />
      <h1>Hello!
        I'm Oleg Pasternak
      </h1>
    </body>
  )
}
