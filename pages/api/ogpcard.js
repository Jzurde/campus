import { siteData, siteMeta } from "@/lib/constant";
import { ImageResponse } from "next/og";

export const config = {
    runtime: "edge",
}

const font = fetchFont()

export async function fetchFont() {

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
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    padding: '76px 103px 0 103px',
                    backgroundColor: '#f2f2f2',
                }}>
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#fafafa',
                        borderRadius: '32px 32px 0 0',
                        flexDirection: 'column',
                        display: 'flex',
                        boxShadow: '0px 0px 50px 0px #b0b0b0'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '91px',
                            display: 'flex',
                            padding: '0 75px',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 22,
                            borderBottom: 'solid 2px #eeecec'
                        }}>
                            <div style={{
                                width: `${siteData.siteLogoSVGData.width}px`,
                                height: `${siteData.siteLogoSVGData.height}px`,
                                backgroundImage: `url(${`data:image/svg+xml,${encodeURIComponent(siteData.siteLogoSVGData.pure)}`})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: `${siteData.siteLogoSVGData.width}px ${siteData.siteLogoSVGData.height}px`,
                            }}></div>
                            <p style={{
                                fontSize: 20
                            }}>{siteMeta.siteTitle}</p>
                            <p style={{
                                fontSize: 15
                            }}>{siteMeta.siteDesc}</p>
                        </div>
                        <div style={{
                            width: '100%',
                            padding: '51px 76px',
                            display: 'flex'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%'
                            }}>
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
                                                    backgroundColor: '#CED8F6',
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
                                <h1 style={{
                                    color: '#393939',
                                    fontSize: '64px',
                                    lineHeight: '72px'
                                }}>{title}</h1>
                            </div>
                        </div>
                    </div>
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