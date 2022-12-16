import Head from "next/head"


interface SeoProps {
    title: string,
    description: string,
    image?: string,
}

export default function Seo({ title, description, image}:SeoProps) {
    return (
        <Head>
            <title>{`RT discord bot | ${title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    )
}