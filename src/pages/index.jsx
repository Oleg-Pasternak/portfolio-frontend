import Header from 'src/components/Header';
import Hero from 'src/components/Hero';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';
import { Gradient } from 'src/components/Gradient'
import { Boiler } from 'src/components/Boiler'
import ThreeJs from '../../threejs/three';

export default function Home() {
  const [isLoad, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    ThreeJs();
  }, []);

  return (
    <div id='main-container'>
      <Head page="メインページ" />
      <Header />
      <Hero />
      <Boiler />

      <canvas className={isLoad ? 'page-loaded' : ''} id="gradient-canvas" data-transition-in />
      <div id="container" />
    </div>
  )
}
