import Header from 'src/components/Header';
import Hero from 'src/components/Hero';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';
import { Gradient } from 'src/components/Gradient'

export default function Home() {
  const [isLoad, setLoad] = useState(false);

  useEffect(() => {
    // Create your instance
    const gradient = new Gradient()

    // Call `initGradient` with the selector to your canvas
    gradient.initGradient('#gradient-canvas')
  }, []);

  return (
    <body>
      <Head page="メインページ" />
      <Header />
      <canvas id="gradient-canvas" data-transition-in />
      <Hero />
    </body>
  )
}
