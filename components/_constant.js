import { InfoBox } from "@/components/code";

export const _siteData = {
    siteLogo: 'Campus',
    siteTitle: 'キャンパス',
    siteDesc: '使いやすいブログサイトのテンプレート',
    shortDescription: 'キャンパスブログサイト',
    copyright: '2024 Jzurde All right reserved.'
}

export const _siteSettings = {
    siteUrl: 'https://www.jzurde.jp',
    siteLang: 'ja',
    siteLocale: 'ja_JP',
    siteType: 'website',
    siteIcon: '/favicon.png',
    googleAnalytics: {
        key: "X-XXXXXXXXXX"
    },
    contactForms: {
        placeHolders: {
            name: "名前 太郎",
            email: "contact@xxxx.xx",
            message: "お問い合わせ内容は何を書けばいいのかをお問合せします"
        }
    }

}

export const _myProfile = {
    name: 'あなたの名前',
    english_name: 'YOUR NAME',
    affiliation: '東京都内の大学生',
    description: 'あなたのプロフィール。<br>少し長文でもいいかもしれませんね。',
    snsLinks: {
        twitter: 'https://twitter.com/xxxx',
        instagram: 'https://bsky.app/profile/xxx.xxx.xxx',
        github: 'https://github.com/xxxxx'
    }
}

export function Term_Text() {
    return (
        <>
            <p>Campus - 使いやすいブログサイトのテンプレート(以下: 本サイトとします)をご覧いただきありがとうございます。以下は皆様にご承知いただきたい事項です。本サイトをご利用の際はあらかじめご同意いただきますようお願いいたします。</p>

            <h2>プライバシーに関する声明</h2>
            <p>この部分にプライバシーポリシーを追加しましょう</p>

            <h2>権利関係に関して</h2>
            <h3>著作権について</h3>
            <p>この部分に著作権に関する説明を追加しましょう</p>

            <h3>リンク</h3>
            <p>この部分にリンクに関する説明を追加しましょう</p>

            <h2>免責事項</h2>
            <p>この部分に免責事項に関する説明を追加しましょう</p>

            <h2>規約に関する相談窓口</h2>
            <p>プライバシーに関する声明についてのご相談や、その他ご利用規約に関するお問い合わせは、下記窓口までお問合せください。</p>
            <InfoBox><h4>個人情報に関するお問合せ</h4>xxxx@xxx.xx</InfoBox>
        </>
    )
}