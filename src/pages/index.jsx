import Header from 'src/components/Header';
import { useEffect, useState } from 'react';
import Head from 'src/components/Head';
import { Boiler } from 'src/components/Boiler'
import axios from 'axios'

export default function Home() {

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5001/api/stocks')
      .then((res) => {
        setStocks(res.data)
      })
  }, [])

  return (
    <div id='main-container'>
      <Head page="Main Page" />
      <Header />
      <Boiler />
      {stocks && (
        <ul>
          {stocks.map((stock) => {
            return <li>{stock.title} - {stock.price}</li>
          })}
        </ul>
      )}
      <div id="container" />
    </div>
  )
}
