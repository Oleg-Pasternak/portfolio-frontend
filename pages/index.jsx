import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pasternak</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id='three-js' />
      <body>
        <h1>FRONT END DEVELOPER</h1>
      </body>
    </div>
  )
}
