import Header from 'src/components/Header';
import Hero from 'src/components/Hero';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';
import { Gradient } from 'src/components/Gradient'
import { Boiler } from 'src/components/Boiler'

export default function Home() {
  const [isLoad, setIsLoaded] = useState(false);

  useEffect(() => {
    const gradient = new Gradient()
    gradient.initGradient('#gradient-canvas')
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <Head page="メインページ" />
      <Header />
      <canvas className={isLoad ? 'page-loaded' : ''} id="gradient-canvas" data-transition-in />
      <div  id="three-js" />
      <Hero />
      <Boiler />
    </div>
  )
}
