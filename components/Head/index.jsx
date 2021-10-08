import Head from 'next/head'
import 'styles/main.scss'

export default (props) => {
    return (
        <Head>
            {props.children}
            <meta charSet="utf-8" />
            <link rel="icon" href="/assets/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <meta name="theme-color" content="#000000" />
            <title>Pasternak | {props.page}</title>
        </Head>
    )
}