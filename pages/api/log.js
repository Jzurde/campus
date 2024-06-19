import { siteData } from "@/lib/constant";
import { ImageResponse } from "next/og";

export const config = {
    runtime: "edge",
}

const font = fetchFont()

export async function fetchFont(){

    const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap';

    const css = await (
        await fetch(googleFontsUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
            },
        })
    ).text();

    const resource = css.match(
        /src: url\((.+)\) format\('(opentype|truetype)'\)/
    );

    if (!resource) return null;
    const res = await fetch(resource[1]);
    return res.arrayBuffer();
}

export default async function OGImageHandler(req) {
    try {
        const { searchParams } = new URL(req.url)
        const fontData = await font;

        const hasTitle = searchParams.has('title')
        const hasCategories = searchParams.has('categories')
        const title = hasTitle ? searchParams.get('title').slice(0, 100) : siteData.shortDescription
        const category = hasCategories ? searchParams.get('categories') : ""

        const categories = category.split(',')
        


        return new ImageResponse(
            (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{
                        width: '100%',
                        height: '622px',
                        backgroundColor: 'whitesmoke',
                        padding: '100px 133px 0 133px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: 16,
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <h1 style={{
                                color: '#393939',
                                fontSize: '64px',
                                lineHeight: '72px'
                            }}>{title}</h1>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                gap: 16
                            }}>
                                {
                                    categories.map((value) => {
                                        return (
                                            <div style={{
                                                padding: 16,
                                                backgroundColor: '#EEECEC',
                                                fontSize: '32px',
                                                lineHeight: '32px',
                                                borderRadius: 16,
                                                display: 'flex'
                                            }}>
                                                # {value}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/* <div style={{
                            width: '293px',
                            height: '54px',
                            marginBottom: '36px',
                            backgroundImage: `url(${`data:image/svg+xml,${encodeURIComponent(`<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147.44 27.12">
                            <g>
                                <g>
                                    <path class="cls-1" fill="#393939" d="m14.52,16.04c0,4.16-2.16,5.96-5.24,5.96-1.96,0-3.88-.64-5.4-3.44l-3.88,3.08c1.8,3.8,5.48,5.48,9.36,5.48,6.24,0,10.76-3.44,10.76-11.2V.77h-5.6v15.28Z"/>
                                    <polygon class="cls-1" fill="#393939" points="45.03 10.43 45.03 7.14 28.79 7.14 28.79 11.34 38.14 11.34 28.54 22.68 28.54 25.97 45.35 25.97 45.35 21.77 35.44 21.77 45.03 10.43"/>
                                    <path class="cls-1" fill="#393939" d="m66.56,16.45c0,3.47-1.82,5.08-4.34,5.08s-3.82-1.4-3.82-4.55V7.14h-5.46v10.64c0,5.81,3.33,8.47,8.05,8.47,2.31,0,4.41-.88,5.85-2.52v2.24h5.18V7.14h-5.46v9.31Z"/>
                                    <path class="cls-1" fill="#393939" d="m86.51,9.63v-2.49h-5.22v18.83h5.46v-8.89c0-3.6,2-5.25,5.01-5.25.42,0,.77.04,1.23.07v-5.04c-2.91,0-5.15.94-6.48,2.77Z"/>
                                    <path class="cls-1" fill="#393939" d="m114.3,9.14c-1.37-1.54-3.33-2.27-5.64-2.27-5.32,0-9.42,3.78-9.42,9.7s4.1,9.7,9.42,9.7c2.52,0,4.52-.8,5.88-2.45v2.17h5.22V0h-5.46v9.14Zm-4.69,12.64c-2.73,0-4.83-1.96-4.83-5.22s2.1-5.22,4.83-5.22,4.8,1.96,4.8,5.22-2.1,5.22-4.8,5.22Z"/>
                                    <path class="cls-1" fill="#393939" d="m147.44,16.63c0-6.06-4.27-9.77-9.8-9.77s-10.05,4.06-10.05,9.7,4.24,9.7,10.75,9.7c3.4,0,6.02-1.05,7.77-3.04l-2.91-3.15c-1.3,1.23-2.73,1.82-4.73,1.82-2.87,0-4.87-1.44-5.39-3.78h14.25c.03-.46.1-1.05.1-1.47Zm-14.42-1.71c.38-2.42,2.17-3.92,4.66-3.92s4.24,1.54,4.62,3.92h-9.28Z"/>
                                </g>
                            </g>
                            </svg>`)}`})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '293px 54px',
                        }}></div>  */}
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#393939',
                    }}></div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'NotoSansJP',
                        data: fontData,
                        style: "normal",
                    }
                ],
            }
        )

    }
    catch (e) {
        console.log('===OGImageHandler===')
        console.log(e)
    }
}