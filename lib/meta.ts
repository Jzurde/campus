import { Metadata } from "next";
import { eyecatchLocal } from "./constant";

export default function Meta({
    pageTitle, pageDescription, pageImg, pageImgWidth, pageImgHeight, url
}: {
    pageTitle?: string;
    pageDescription?: string;
    pageImg?: string;
    pageImgWidth?: number;
    pageImgHeight?: number;
    url?: string;
}) {

    const siteTitle = "CAMPUS"
    const siteUrl = process.env.APP_URL
    const metaTitle = (pageTitle && pageTitle != siteTitle) ? `${pageTitle} | ${siteTitle}` : siteTitle
    const metaDesciption = pageDescription ? pageDescription : `${pageTitle}に関する発言`

    const img = pageImg || eyecatchLocal.url
    const imgW = pageImgWidth || eyecatchLocal.width
    const imgH = pageImgHeight || eyecatchLocal.height
    const imgUrl = img.startsWith('https') ? img : `${siteUrl}${img}`

    const metadata: Metadata = {
        title: metaTitle,
        description: metaDesciption,
        openGraph: {
            title: metaTitle,
            description: metaDesciption,
            url: url || siteUrl,
            siteName: siteTitle,
            images: [
                {
                    url: imgUrl,
                    width: imgW,
                    height: imgH,
                },
            ],
            locale: 'ja_JP',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
        },
        icons: {
            icon: '/favicon.ico',
            apple: '/apple-icon.png',
        },
        metadataBase: new URL(siteUrl!),
    }

    return metadata
}