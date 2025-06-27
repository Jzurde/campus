import { getPostBySlug } from "@/lib/cms-api"
import { ImageResponse } from "next/og";

export const contentType = 'image/png'

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

export default async function Image({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    const title = post.title
    const categories = post.categories
    const fontData = await fetchFont();
    if (!fontData) {
        throw new Error("フォントデータの取得に失敗しました");
    }
    try {
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
                                    categories.map((value: any) => {
                                        return (
                                            <div style={{
                                                padding: 16,
                                                backgroundColor: '#EEECEC',
                                                fontSize: '32px',
                                                lineHeight: '32px',
                                                borderRadius: 16,
                                                display: 'flex'
                                            }}>
                                                # {value.name}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
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
                headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'public, max-age=86400',
                },
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