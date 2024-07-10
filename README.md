こんにちは。
このブログテンプレートは、[じゅーるでのポートフォリオ](https://www.jzurde.jp)で使用されているブログテンプレートを配布用に再構成したものです。

# はじめに
## 構成
このブログサイトは以下の構成で動かすことを想定しています。
- Next.js
- microCMS
- Vercel

以上の構成と異なる使用する際は、適時必要なコード改変が必要になります。

## 始め方
このテンプレートでは、以下の点を変更する必要があります。
- constant.js( - lib内)
- contact.js( - pages/api)
- public内の画像
- .env
- next.config.js

それぞれについて説明します。

### constant.js
constant.jsは/lib内にあり、サイト上の固有文字列を管理しています。それぞれ初期値を参考に、ご自身のサイトに合わせて変更してください。

### contact.js
contact.jsはプロジェクト内に2つありますが、特にpages/apiの方は、改変が必要です。
ご自身が使用されるメールサーバーやメール文面に合わせて変更してください。

### public内の画像
public内の画像は、ページのロゴやプロフィールロゴ、SNSカードなどに用いられる画像です。初期で入っているものと同じ名前のファイルで全てを揃えてください。
なお、初期ファイルと画像の比率が異なる場合は、対応するconstant.jsのwidth, heightを合わせて変更する必要があります。

### .env
環境変数を設定する必要があります。.env.exampleファイルでは、その記述例と必要な定義を示しています。
全ての項目について適当な値を入力してください。以下でそれぞれの項目について説明を与えます。
- API_KEY: microCMSのコンテンツAPIのAPIキーです。GET権限がある必要があります。
- SERVICE_DOMAIN: microCMSのサービスドメインです。通常、ご利用のmicroCMSのダッシュボードのurlのxxx.microcms.io/...のxxx部分になります。
- MAIL_USER: お問合せメールを転送する際に使用するメールアドレスになります。
- MAIL_PASSWORD: 上述のメールアドレスのパスワードになります。メールアドレスと合わせて、メールサーバーの提供元から取得してください。
- NOTIFY_EMAIL: お問合せがあった時に、お問い合わせ内容を転送する先のメールアドレスです。普段使っているものやスマートフォンのメールアドレスなどをしてすればよいでしょう。
- APP_URL: ウェブサイトがホストされるURLをhttps:// から最後まで書いてください。

### next.config.js
nextConfig.images.domainsにホストURLに変更する必要があります。例えばウェブサイトのURLがhttps://www.jzurde.jp になる場合は、xxx.xxをwww.jzurde.jpに変更します。

## microCMS
この、ブログサイトではコンテンツマネジメントに[microCMS](https://microcms.io/)を用いることを想定しています。

また、microCMSには以下の設定とAPIの作成を行ってください。
コンテンツAPIを+マークから作成し、API名とエンドポイントを設定した後に、APIスキーマを定義のページで、ファイルインポートする場合はこちらを選択し、対応する設定ファイルをインポートしてください。

### 発言のカテゴリ
- API名: 発言のカテゴリ
- エンドポイント: post_categories
- APIスキーマ: post_categories-schema.jsonとして同梱

### 発言
- API名: 発言
- エンドポイント: posts
- APIスキーマ: posts-schema.jsonとして同梱
- 画面プレビュー遷移先URL: {ホストURL}/api/preview?contentId={CONTENT_ID}&draftKey={DRAFT_KEY}

### ワークス
- API名: ワークス
- エンドポイント: works
- APIスキーマ: works-schema.jsonとして同梱

# 問合せ他
配布テンプレート・コード・プログラム等に関する問い合わせ・バグの報告・使用方法に関するご質問やそのほかのご連絡は[お問合せフォーム](https://www.jzurde.jp/contact)からお願いいたします。
