import { InfoBox } from "@/components/code/code";
import Container, { SidebarContainer } from "@/components/container/container";
import ConvertBody from "@/components/convert_body/convert_body";
import ListHeader from "@/components/list_header/list_header";
import PostBody from "@/components/post_body/post_body";
import Profile from "@/components/profile/profile";
import PureLink from "@/components/pure_link/pure_link";
import SNS from "@/components/sns/sns";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two_columns/two_columns";
import { getSiteSettings } from "@/lib/cms-api";
import Meta from "@/lib/meta";
import { Metadata } from "next";

export async function generateMetadata() {
    return Meta({
        pageTitle: "ご利用規約",
        pageDescription: "当サイトをご覧の皆様へ。本サイトをご利用いただく上でご理解いただきたい事項がございます。"
    })
}

export default async function Terms() {

    const siteSettings = await getSiteSettings("terms")

    return (
        <Container>
            <ListHeader title="ご利用規約" subtitle="当サイトをご覧の皆様へ" />
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                        <ConvertBody contentHTML={siteSettings.terms} />
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