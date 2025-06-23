import Container, { SidebarContainer } from "@/components/container/container";
import ConvertBody from "@/components/convert_body/convert_body";
import IconListItem from "@/components/icon_listitem/icon_listitem";
import LinkButton from "@/components/link_button/link_button";
import PostBody from "@/components/post_body/post_body";
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two_columns/two_columns";
import { WorksCatchphrase, WorksEyecatch, WorksTopbar } from "@/components/works_topbar/works_topbar";
import { getAllWorksSlug, getWorkBySlug } from "@/lib/cms-api";
import Meta from "@/lib/meta";
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faHashtag, faLink, faTag } from "@fortawesome/free-solid-svg-icons"
import { parseISO, format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const allSlugs = await getAllWorksSlug();

    return allSlugs.map(({ slug }: { slug: string }) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const work = await getWorkBySlug(params.slug);

    return Meta({
        pageTitle: `${work.title}`,
        pageDescription: `${work.title}の紹介ページ`,
        pageImg: work.eyecatch.url,
        pageImgWidth: work.eyecatch.width,
        pageImgHeight: work.eyecatch.height,
    })
}

export default async function WorksPage({ params }: { params: { slug: string } }) {
    const work = await getWorkBySlug(params.slug);

    if (!work) {
        notFound();
    }

    return (
        <Container>
            <WorksTopbar title={work.title} link={work.link} link_name={work.link_name} />
            <WorksCatchphrase catchphrase={work.catchphrase} />
            <WorksEyecatch eyecatch={work.eyecatch} title={work.title} />
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                        <ConvertBody contentHTML={work.description} />
                    </PostBody>
                </TwoColumnMain>
                <TwoColumnSidebar>
                    <SidebarContainer>
                        <IconListItem icon={faTag} title="作品名">
                            <h3>{work.title}</h3>
                        </IconListItem>
                        <IconListItem icon={faHashtag} title="作品種別">
                            <h3>{work.classification}</h3>
                        </IconListItem>
                        <IconListItem icon={faClock} title="公開日">
                            <h3>{format(parseISO(work.when_published), 'yyyy年MM月dd日', { locale: ja, })}</h3>
                        </IconListItem>
                        {(work.link) && (
                            <IconListItem icon={faLink} title="公開ウェブサイト">
                                <LinkButton link={work.link} title={work.link_name} type={3} newTab />
                            </IconListItem>)}
                    </SidebarContainer>
                </TwoColumnSidebar>
            </TwoColumn>
        </Container>
    )
}