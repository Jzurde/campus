import Container, { SidebarContainer } from "@/components/container/container"
import ConvertBody from "@/components/convert_body/convert_body"
import { Pagenation } from "@/components/pagenation/pagenation"
import PostBody from "@/components/post_body/post_body"
import PostHeader from "@/components/post_header/post_header"
import PreviewBanner from "@/components/preview_banner/preview_banner"
import PrevnextPlacholder from "@/components/prevnext_placeholder/prevnext_placeholder"
import Profile from "@/components/profile/profile"
import ShareMenu from "@/components/share_menu/share_menu"
import SNS from "@/components/sns/sns"
import { LargeTile } from "@/components/tile/tile"
import TileContainer from "@/components/tile_container/tile_container"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two_columns/two_columns"
import { getAllSlugs, getPostByID, getPostBySlug } from "@/lib/cms-api"
import Meta from "@/lib/meta"
import { prevNextPost } from "@/lib/prevnext_post"
import { returnSyntaxHighlight } from "@/lib/setSyntaxHighlight"
import { Metadata } from "next"
import { cookies, draftMode } from "next/headers"

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
    const slug = (await params).slug

    const { isEnabled: isInPreviewMode } = await draftMode()
    const cookieStore = cookies()
    const draftKey = isInPreviewMode ? (await cookieStore).get("draftKey")?.value : undefined

    const post = (!isInPreviewMode)
        ? await getPostBySlug(slug)
        : await getPostByID(slug, { draftKey });
    const seo = post.seo

    const categories = post.categories;
    let str_categories = ""
    categories.map((value: any) => {
        str_categories += encodeURIComponent(value.name) + ','
    })

    const metaTitle = (seo.hasOwnProperty("metaTitle")) ? seo.metaTitle : post.title
    const metaDesc = (seo.hasOwnProperty("metaDesc")) ? seo.metaDesc : `${post.title}に関する発言`

    const ogImage = (!seo.ogpCard || !post.hasOwnProperty('eyecatch')) ? {
        url: `/posts/${slug}/twitter-image`,
        // url: `${url}/api/ogpcard?title=${encodeURIComponent(post.title)}\&categories=${str_categories.slice(0, -1)}`,
        width: 1200,
        height: 630,
    } : post.eyecatch

    return Meta({
        pageTitle: metaTitle,
        pageDescription: metaDesc,
        pageImg: ogImage.url,
        pageImgWidth: ogImage.width,
        pageImgHeight: ogImage.height
    })
}

export async function generateStaticParams() {
    const allSlugs = await getAllSlugs();

    const paths = [];
    for (const { slug } of allSlugs) {
        const post = await getPostBySlug(slug); // 各記事を取得
        const contentArray = post.content.split("<hr>"); // コンテンツを分割
        const itemsPerPage = 1; // 1ページあたりの段落数
        const totalPages = Math.ceil(contentArray.length / itemsPerPage);

        for (let page = 1; page <= totalPages; page++) {
            paths.push({ slug, page: page.toString() });
        }
    }

    return paths;
}

export default async function Post({ params }: {
    params: Promise<{ slug: string; page: string }>;
}) {
    const { slug } = await params
    const page = parseInt((await params).page, 10) || 1

    const { isEnabled: isInPreviewMode } = await draftMode()
    const cookieStore = cookies()
    const draftKey = isInPreviewMode ? (await cookieStore).get("draftKey")?.value : undefined

    const now = new Date();

    const post = (!isInPreviewMode)
        ? await getPostBySlug(slug)
        : await getPostByID(slug, { draftKey });

    if (!post) return { notFound: true };

    let prevPost
    let nextPost

    if (!isInPreviewMode) {
        const allSlugs = await getAllSlugs(true)
        const [c_prevPost, c_nextPost] = await prevNextPost(allSlugs, slug)
        prevPost = c_prevPost
        nextPost = c_nextPost
    }

    const contentArray = post.content.split("<hr>"); // 段落ごとに分割
    const itemsPerPage = 1; // 1ページあたりの段落数
    const totalPages = Math.ceil(contentArray.length / itemsPerPage);

    if (page > totalPages) return { notFound: true };

    let content = contentArray.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    ).join("<hr>");

    const title = post.title;
    const publish = (post.publishedAt) ? post.publishedAt : now.toISOString();
    content = returnSyntaxHighlight(content);
    const categories = post.categories;
    const url = `https://${process.env.SELF_HOSTNAME}`;
    prevPost = (prevPost) ? prevPost : { isValid: false };
    nextPost = (nextPost) ? nextPost : { isValid: false };
    const currentPage = page;

    const shareUrl = `${url}/posts/${slug}`
    const displayTitle = (currentPage == 1) ? title : `${title} [${currentPage}/${totalPages}]`
    return (
        <>
            {(isInPreviewMode) && <PreviewBanner />}
            <Container>
                <PostHeader title={title} displayTitle={displayTitle} publish={publish} categories={categories} url={shareUrl} />
                <TwoColumn>
                    <TwoColumnMain>

                        {(currentPage != 1) && <Pagenation currentPage={currentPage} totalPages={totalPages} slug={slug} />}

                        <PostBody>
                            <ConvertBody contentHTML={content} />
                        </PostBody>

                        {(totalPages > 1) && <Pagenation currentPage={currentPage} totalPages={totalPages} slug={slug} />}

                        <ShareMenu url={shareUrl} title={title} fullSize />

                        {(!isInPreviewMode) && <TileContainer small={true}>
                            {(prevPost.isValid) ? <LargeTile link_data={prevPost} caption="前の記事" /> : <PrevnextPlacholder message="最初の記事です" />}
                            {(nextPost.isValid) ? <LargeTile link_data={nextPost} caption="次の記事" /> : <PrevnextPlacholder message="最新の記事です" />}
                        </TileContainer>}


                    </TwoColumnMain>
                    <TwoColumnSidebar>
                        <SidebarContainer>
                            <Profile />
                            <SNS />
                        </SidebarContainer>
                    </TwoColumnSidebar>
                </TwoColumn>


            </Container>
        </>
    )
}