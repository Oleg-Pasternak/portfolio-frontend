import Head from 'next/head'

export default function HeadComponent (props) {
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
    )
}