import Head from 'next/head'

export default function Layout(props) {
    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/icon.png" sizes="32x32" />
                <link rel="icon" href="/icon.png" sizes="192x192" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icon.png"></link>
            </Head>
            {props.children}
        </div>
    )
}