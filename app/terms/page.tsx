import { InfoBox } from "@/components/code/code";
import Container, { SidebarContainer } from "@/components/container/container";
import ListHeader from "@/components/list_header/list_header";
import PostBody from "@/components/post_body/post_body";
import Profile from "@/components/profile/profile";
import PureLink from "@/components/pure_link/pure_link";
import SNS from "@/components/sns/sns";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two_columns/two_columns";
import Meta from "@/lib/meta";
import { Metadata } from "next";

export const metadata: Metadata = Meta({
    pageTitle: "ご利用規約",
    pageDescription: "当サイトをご覧の皆様へ。本サイトをご利用いただく上でご理解いただきたい事項がございます。"
})

export default function Terms() {
    return (
        <Container>
            <ListHeader title="ご利用規約" subtitle="当サイトをご覧の皆様へ" />
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                        <p>じゅーるでのポートフォリオサイト(以下: 本サイトとします)をご覧いただきありがとうございます。以下は皆様にご承知いただきたい事項です。本サイトをご利用の際はあらかじめご同意いただきますようお願いいたします。</p>


                        <h2>プライバシーに関する声明</h2>
                        <p>サイト運営者は個人情報を極力保持したくありません。<br />これは、本サイトの目的が個人情報を収集し付加価値を付けるビジネスを行うことではないからです。</p>
                        <h3>個人情報を収集する手段・方法</h3>
                        <p>本サイトが利用者・閲覧者(以下: ユーザーとします)の個人情報を収集するのは以下の場合のみです。</p>
                        <h4>お問合せフォーム</h4>
                        <p>ユーザーが本サイトの<PureLink link="/contact" text="お問合せフォーム" />から自らお問合せに必要な以下の個人情報を入力し、送信したとき、その内容はサイト運営者によって保存されます。</p>
                        <ul>
                            <li>ユーザーの氏名</li>
                            <li>ユーザーのメールアドレス</li>
                        </ul>
                        <h3>個人情報を収集する目的</h3>
                        <p>当サイトでは、上で挙げた手段・方法によって収集した個人情報を、以下の目的にのみ使用します。</p>
                        <h4>お問合せフォーム</h4>
                        <p><PureLink link="/contact" text="お問合せフォーム" />から収集した個人情報については、ユーザーからのお問合せにサイト運営者が対応することに使用します。より具体的にはユーザーのお問合せに返答を返すために、ユーザーが入力した個人情報を用いて、ユーザーに連絡をしたり試みたりすることがあります。<br />
                            なお、これには本人確認を行うことも含まれます。</p>
                        <p>なお、上項の定めに依らず、以下の場合には個人情報を第三者に共有し用いることがあります。</p>
                        <ul>
                            <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                            <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                        </ul>
                        <h3>アクセス解析ツールによる情報収集</h3>
                        <p>当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。<br />
                            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は<PureLink link="https://marketingplatform.google.com/about/analytics/terms/jp/" text="Googleアナリティクスサービス利用規約" target="_blank" />のページや<PureLink text="Googleポリシーと規約ページ" link="https://policies.google.com/technologies/ads?hl=ja" target="_blank" />をご覧ください。</p>


                        <h2>権利関係に関して</h2>
                        <h3>著作権について</h3>
                        <p>本サイトのコンテンツ(具体的には、文章、イラスト、ロゴ、写真、ソフトウェア、その他の情報)の著作権は、サイト運営者または第三者に属します。そのため、事前にサイト運営者の文書または電子メールによる許諾を得ない限り、私的使用やその他の法律によって明示的に認められる範囲を超えて、これらの情報を使用（複製、改変、アップロード、掲示、送信、頒布、ライセンス、販売、出版等を含む）をすることは一切禁止します。</p>

                        <h3>リンク</h3>
                        <p>本サイトへのリンクは原則自由に行えますが、以下の点にご留意ください。</p>
                        <ul>
                            <li>リンクはページに対してのみ行え、例えばページ内の画像やロゴ、動画などへの直接的なリンクはできません。</li>
                            <li>本サイトのURLは事前の予告なく変更される場合があります。その際はリンクが無効となる場合があります。</li>
                            <li>極端に狭いフレーム内で本サイトを表示することによって、本サイトの画像を使用したり、情報を意図的に抜き出して表示するなどの目的ではリンクできません。</li>
                            <li>リンク元のページ・コンテンツの内容によりましては、サイト運営者からリンクの掲載取り下げを要求することがあります。</li>
                        </ul>

                        <h2>免責事項</h2>
                        <ul>
                            <li>サイト運営者は本サイト上の情報の内容について、その妥当性や正確性について保証するものではなく、一切の責任を負いません。</li>
                            <li>サイト運営者は予告なしに本サイト上の情報を変更することがあります。また本サイトの提供を中断ないしは中止する場合がありますので、あらかじめご了承下さい。</li>
                            <li>サイト運営者は理由の如何に関わらず、ユーザーが本サイト上の情報を使用されたこと、ないしは使用できなかったこと、また本サイトを使用されたことによって生じたいかなる直接的な損害、間接的な損害などについても一切責任を負いません。</li>
                            <li>サイト運営者は理由の如何に関わらず、本サイトの情報の変更及びその運用の中断または中止によって生じたいかなる直接的な損害、間接的な損害などについても一切責任を負いません。</li>
                        </ul>
                        <h2>規約に関する相談窓口</h2>
                        <p>プライバシーに関する声明についてのご相談や、その他ご利用規約に関するお問い合わせは、下記窓口までお問合せください。</p>
                        <InfoBox><h4>じゅーるで代表アドレス</h4>contact@jzurde.jp</InfoBox>
                    </PostBody>
                </TwoColumnMain>
                <TwoColumnSidebar>
                    <SidebarContainer>
                        <Profile />
                        <SNS />
                    </SidebarContainer>
                </TwoColumnSidebar>
            </TwoColumn>
        </Container>
    )

}