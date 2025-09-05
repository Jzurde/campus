import { getPostBySlug, getSiteSettings } from "@/lib/cms-api"
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

const fetchLogoFont = async () => {
    const googleFontsUrl = 'https://fonts.googleapis.com/css2?family=Bungee&display=swap';
    const css = await (
        await fetch(googleFontsUrl, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
            },
        })
    ).text();

    const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    if (!resource) return null;
    const res = await fetch(resource[1]);
    return res.arrayBuffer();
};

export default async function Image({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug)
    const title = post.title
    const categories = post.categories
    const fontData = await fetchFont();
    const logofontData = await fetchLogoFont();

    const siteSettings = await getSiteSettings("siteLogo,siteTitle,siteDesc") || {}
    const siteLogo = siteSettings.siteLogo ?? "#LOGO"
    const siteTitle = siteSettings.siteTitle ?? "#サイトタイトル"
    const siteDescription = siteSettings.siteDesc ?? "人間の大学生のポートフォリオ"

    if (!fontData || !logofontData) {
        throw new Error("フォントデータの取得に失敗しました");
    }
    try {
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
                        boxShadow: '0px 0px 50px 0px #b0b0b0',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '91px',
                            display: 'flex',
                            padding: '0 75px',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            gap: 22,
                            borderBottom: 'solid 2px #eeecec',
                        }}>
                            <h1 style={{
                                fontFamily: 'LogoFont',
                                fontSize: '35px',
                                marginTop: 25,
                            }}>{siteLogo}</h1>
                            <p style={{
                                fontSize: 20,
                                fontFamily: 'NotoSansJP',
                            }}>{siteTitle}</p>
                            <p style={{
                                fontSize: 15,
                                fontFamily: 'NotoSansJP',
                            }}>{siteDescription}</p>
                        </div>
                        <div style={{
                            width: '100%',
                            padding: '51px 76px',
                            display: 'flex',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: 16,
                                }}>
                                    {
                                        categories.map((value: any) => {
                                            return (
                                                <div style={{
                                                    padding: 16,
                                                    backgroundColor: '#CED8F6',
                                                    fontSize: '32px',
                                                    lineHeight: '32px',
                                                    borderRadius: 16,
                                                    display: 'flex',
                                                    fontFamily: 'NotoSansJP',
                                                }}>
                                                    # {value.name}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <h1 style={{
                                    color: '#393939',
                                    fontSize: '64px',
                                    lineHeight: '72px',
                                    fontFamily: 'NotoSansJP',
                                }}>{title}</h1>
                            </div>
                        </div>
                    </div>
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
                    },
                    {
                        name: 'LogoFont',
                        data: logofontData,
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