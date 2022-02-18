import '../styles/globals.css'
import { useEffect } from 'react';
import ThreeJs from '../threejs/three';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    ThreeJs();
  });

  return <Component {...pageProps} />
}

export default MyApp