import Container from "@/components/container";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two-colums";
import PostBody from "@/components/post-body";
import SidebarContainer from "@/components/sidebar-container";
import Profile from "@/components/profile";
import SNS from "@/components/sns";
import { InfoBox } from "@/components/code";

export default function Terms() {
    return (
        <Container>
            <Meta pageTitle="ご利用規約" pageDesc="当サイトをご覧の皆様へ。本サイトをご利用いただく上でご理解いただきたい事項がございます。" />
            <ListHeader title="ご利用規約" subtitle="当サイトをご覧の皆様へ" />
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
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