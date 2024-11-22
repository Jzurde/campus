import Head from "next/head";
import { eyecatchLocal} from "@/lib/constant";
import { _siteData, _siteSettings } from "./_constant";
import { useRouter } from "next/router";

const { siteTitle, siteDesc } = _siteData;
const { siteUrl, siteLocale, siteType, siteIcon } = _siteSettings;

export default function Meta({ pageTitle, pageDesc, pageImg, pageImgW, pageImgH }) {

    const title = pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle
    const desc = pageDesc ?? siteDesc
    const router = useRouter()
    const url = `${siteUrl}${router.asPath}`

    const img = pageImg || eyecatchLocal.url
    const imgW = pageImgW || eyecatchLocal.width
    const imgH = pageImgH || eyecatchLocal.height
    const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`

    return (
        <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} />
            <meta name="description" content={desc} />
            <meta property="og:description" content={desc} />
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:type" content={siteType} />
            <meta property="og:locale" content={siteLocale} />

            <link rel="icon" href={siteIcon} />
            <link rel="apple-touch-icon" href={siteIcon} />

            <meta property="og:image" content={imgUrl}/>
            <meta property="og:image:width" content={imgW}/>
            <meta property="og:image:height" content={imgH}/>
            <meta name="twitter:card" content="summary_large_image"/>
        </Head>
    )
}