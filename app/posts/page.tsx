import Container from "@/components/container/container";
import ListHeader from "@/components/list_header/list_header";
import PostList from "@/components/post_list.js/post_list";
import { getAllSlugs } from "@/lib/cms-api";
import Meta from "@/lib/meta";
import { Metadata } from "next";

export async function generateMetadata() {
    return Meta({ pageTitle: "全ての発言", pageDescription: "これまでの発言の一覧" })
}

export default async function Posts() {

    const posts = await getAllSlugs(true)

    for (const post of posts) {

        if (!post.hasOwnProperty('eyecatch')) {
            let str_categories = ""
            post.categories.map((value: any) => {
                str_categories += value.name + ','
            })
            post.eyecatch = {
                url: `/posts/${post.slug}/opengraph-image`,
                // url: `${process.env.APP_URL}/api/log?title=${post.title}&categories=${str_categories.slice(0, -1)}`,
                width: 1200,
                height: 630,
            }
        }
    }

    return (
        <Container>
            <ListHeader title="全ての発言" />
            <PostList posts={posts} />
        </Container>
    )
}