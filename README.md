これはCAMPUSのTypeScript+APP Routerバージョンです。

CAMPUSは人間の大学生のためのポートフォリオサイトとして、軽量かつ高速な動作を実現しています。

# 🔥始める
1. パッケージを準備
```
npm install
```

2. 開発環境を起動
```
npm run dev
```
でサイトを動作させましょう!

# 📚環境変数の設定
ルート直下にある`.env.example`を複製し、名前を`.env`に変更するとともに、記述内容を修正し、情報を入力してください。

```
# microCMSの情報
MICROCMS_API_KEY="XXXXXXXXXXXXXXXX"
MICROCMS_SERVICE_DOMAIN="xxxxxxxxxxxx"

# 公開環境の情報
SELF_HOSTNAME="xxxxxxxx.jp"

# お問合せフォームのメール情報
MAIL_SERVICE="Gmail"
MAIL_USER="xxxxxxx@gmail.com"
MAIL_PASS="xxxxxxxxxxxxx"
```

## microCMSの情報
`MICROCMS_API_KEY`: 
microCMS 管理画面の「サービス設定 > API キー」から確認することができます。

`MICROCMS_SERVICE_DOMAIN`: 
microCMS 管理画面の URL（https://xxx.microcms.io）の xxx の部分です。

## 公開環境の情報
`SELF_HOSTNAME`: デプロイ先の公開URLです。プロトコルを除いたホスト名を入力してください。 

例: https://jzurde.jp → jzurde.jp

## お問い合わせフォームのメール情報
CAMPUSのお問い合わせフォームは、入力された内容をメールで管理者に送信する仕組みになっています。ここで設定するメールアドレスは、そのメールの送信元となる管理用アドレスで、通常は送信専用のメールアドレスになります。

1. Gmail / Yahoo メールを用いる
2. 独自のメールサーバーのメールを用いる(SMTP)

### 1. Gmail / Yahoo メールを用いる
```
MAIL_SERVICE="Gmail"
MAIL_USER="xxxxxxx@gmail.com"
MAIL_PASS="xxxxxxxxxxxxx"
```
`MAIL_SERVICE`: Gmailの場合は`Gmail`、Yahooメールの場合は`Yahoo`とサービス名を入力してください

`MAIL_USER`: メールアドレスです

`MAIL_PASS`: 
- (Gmail)メールサービスにおけるアプリパスワードを入力します。通常の**ログインに用いるパスワードではありません**。
- (Yahooメール): YahooIDのパスワードを入力してください

(参考)
- [Gmailのアプリパスワード](https://support.google.com/mail/answer/185833?hl=ja)
- [Yahooメールにおけるヘルプ](https://support.yahoo-net.jp/PccMail/s/article/H000007321)

### 2. 独自のメールサーバーのメールを用いる(SMTP)
```
MAIL_HOST="xxx.xxxx.xx.jp"
MAIL_PORT="465"
MAIL_SECURE="true"
MAIL_USER="xxxx@xxx.xx"
MAIL_PASS="xxxxxxxxxxxxx"
```

`MAIL_HOST`: メールサーバーのホスト名です

`MAIL_PORT`: メールサーバーのポート番号です

`MAIL_SECURE`: secureオプションが必要な場合は"true"を記述し、必要ない場合はこの項目を記述しないでください。

`MAIL_USER`: メールアドレスです

`MAIL_PASS`: メールのパスワードです

# ❓以前のバージョンを利用していた方へ
CAMPUSは、App Router + Typescriptを用いた全く新しいテンプレートに生まれ変わりました。 microCMSとの連携を強め、よりノーコードでカスタマイザブルなポートフォリオサイトになりました。

## ブランチの扱い
- 以前のmainブランチはjsブランチにリネーム(名前の変更)されました
- 以前のdevelopブランチはjs-developブランチにリネーム(名前の変更)されました
- 以前のtsx_app-routerがデフォルトブランチとなり、一定の移行期間後にmainブランチにリネーム(名前の変更)されました
- tsx_app-router-developブランチがtsx_app-routerブランチの開発用ブランチとして用意され、一定の移行期間後にdevelopブランチにリネーム(名前の変更)されました

開発者の方にはお手数をおかけいたしますが、リポジトリ管理においてご対応いただき、ぜひ新しくなったCAMPUS(App + Type)版への計画的な移行をご検討ください。