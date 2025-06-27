import Container from "@/components/container";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two-colums";
import PostBody from "@/components/post-body";
import SidebarContainer from "@/components/sidebar-container";
import Profile from "@/components/profile";
import SNS from "@/components/sns";
import { Term_Text } from "@/components/_constant";

export default function Terms() {
    return (
        <Container>
            <Meta pageTitle="ご利用規約" pageDesc="当サイトをご覧の皆様へ。本サイトをご利用いただく上でご理解いただきたい事項がございます。" />
            <ListHeader title="ご利用規約" subtitle="当サイトをご覧の皆様へ" />
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                        <Term_Text />
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