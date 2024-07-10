import Container from "@/components/container"
import PostHeader from "@/components/post_header"
import { getAllSlugs, getPostByID, getPostBySlug } from "@/lib/api"
import styles from '@/styles/posts.module.css'
import Profile from "@/components/profile"
import SNS from "@/components/sns"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two-colums"
import ConvertBody from "@/components/convert-body"
import PostBody from "@/components/post-body"
import { prevNextPost } from "@/lib/prev-next-post"
import TileContainer from "@/components/tile_container"
import { LargeTile } from "@/components/tile"
import SidebarContainer from "@/components/sidebar-container"
import Meta from "@/components/meta"
import Head from "next/head";
import PreviewBanner from "@/components/preview_banner"
import { returnSyntaxHighlight } from "@/lib/setSyntaxHighlight"
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { siteData } from "@/lib/constant"

export default function Post({
    title,
    publish,
    content,
    // eyecatch,
    categories = null,
    // iseyecatch,
    prevPost = null,
    nextPost = null,
    url,
    isInPreviewMode = false
}) {
    let str_categories = ""
    categories.map((value) => {
        str_categories += value.name + ','
    })
    const ogImage = {
        url: `${url}/api/ogpcard?title=${title}\&categories=${str_categories.slice(0, -1)}`,
        width: 1200,
        height: 630,
    }
    return (
        <>
            {(isInPreviewMode) && <PreviewBanner />}
            <Container>
                <Meta
                    pageTitle={title}
                    pageDesc={`${siteData.profile.name}の${title}に関する発言`}
                    pageImg={ogImage.url}
                    pageImgW={ogImage.width}
                    pageImgH={ogImage.height}
                />

                {/* {iseyecatch && (
                <Image
                    src={eyecatch.url}
                    alt=""
                    layout="responsive"
                    width={eyecatch.width}
                    height={eyecatch.height}
                    placeholder="blur"
                    blurDataURL="{eyecatch.blurDataURL}"
                />
            )} */}
                <PostHeader title={title} publish={publish} categories={categories} />
                <TwoColumn>
                    <TwoColumnMain>
                        <PostBody>
                            <ConvertBody contentHTML={content} />
                        </PostBody>

                        {(!isInPreviewMode) &&
                            <TileContainer small={true}>
                                {(prevPost.isValid) ? <LargeTile link_data={prevPost} caption="前の記事" /> : <div className={styles.placeholder}>最初の記事です</div>}
                                {(nextPost.isValid) ? <LargeTile link_data={nextPost} caption="次の記事" /> : <div className={styles.placeholder}>最新の記事です</div>}
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

export async function getStaticPaths() {
    const allSlugs = await getAllSlugs()

    return {
        paths: allSlugs.map(({ slug }) => `/posts/${slug}`),
        fallback: "blocking",
    }
}

export async function getStaticProps(context) {

    const { params, previewData } = context

    if (!context.draftMode) {
        const slug = params.slug
        const post = await getPostBySlug(slug)

        if (!post) return { notFound: true }
        else {
            const allSlugs = await getAllSlugs(true)
            const [prevPost, nextPost] = await prevNextPost(allSlugs, slug)

            return {
                props: {
                    title: post.title,
                    publish: post.publishedAt,
                    content: returnSyntaxHighlight(post.content),
                    // eyecatch: eyecatch,
                    categories: post.categories,
                    // iseyecatch: (post.eyecatch != undefined),
                    url: process.env.APP_URL,
                    prevPost: prevPost,
                    nextPost: nextPost,
                }
            }
        }

    }
    else {

        const contentID = params.slug
        const draftKey = { draftKey: previewData.draftKey }
        const post = await getPostByID(contentID, draftKey)

        if (!post) return { notFound: true }
        else {
            return {
                props: {
                    title: post.title,
                    publish: post.createdAt,
                    content: returnSyntaxHighlight(post.content),
                    // eyecatch: eyecatch,
                    categories: post.categories,
                    // iseyecatch: (post.eyecatch != undefined),
                    url: process.env.APP_URL,
                    isInPreviewMode: true,
                }
            }
        }
    }


}