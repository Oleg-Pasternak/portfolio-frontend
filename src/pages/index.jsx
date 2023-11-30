import Header from 'src/components/Header';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';
import { Boiler } from 'src/components/Boiler'
import Hero from 'src/components/Hero'
import Footer from 'src/components/Footer'
import axios from 'axios'

export default function Home() {

  const [stocks, setStocks] = useState([]);

  return (
    <div id='main-container'>
      <Head page="Main Page" />
      <Header />
      <Hero />
      <Boiler />
      <Footer />
    </div>
  )
}
