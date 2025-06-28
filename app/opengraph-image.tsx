import { ImageResponse } from "next/og";

export const contentType = 'image/png'

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

export default async function Image() {
    const siteLogo = "CAMPUS"
    const logofontData = await fetchLogoFont();
    if (!logofontData) {
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
                        height: '614px',
                        backgroundColor: 'whitesmoke',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <h1 style={{
                            fontFamily: 'LogoFont',
                            color: '#4369DB',
                            fontSize: '128px',
                            lineHeight: '72px',
                        }}>{siteLogo}</h1>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '16px',
                        backgroundColor: '#4369DB',
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