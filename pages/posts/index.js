import Container from "@/components/container";
import PostList from "@/components/post_list";
import { getAllSlugs } from "@/lib/api";
import { getPlaiceholder } from "plaiceholder";
import { getImageBuffer } from "@/lib/getImageBuffer";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";
import { _myProfile } from "@/components/_constant";

export default function Posts({ posts }) {
    return (
        <Container>
            <Meta pageTitle="全ての発言" pageDesc={`これまでの${_myProfile.name}の発言の一覧`} />
            <ListHeader title="全ての発言" />
            <PostList posts={posts} />
        </Container>
    )
}

export async function getStaticProps() {
    const posts = await getAllSlugs(true)

    for (const post of posts) {

        if (!post.hasOwnProperty('eyecatch')) {
            let str_categories = ""
            post.categories.map((value) => {
                str_categories += value.name + ','
            })
            post.eyecatch = {
                url: `${process.env.APP_URL}/api/log?title=${post.title}&categories=${str_categories.slice(0, -1)}`,
                width: 1200,
                height: 630,
            }
        }

        try {
            const imageBuffer = await getImageBuffer(post.eyecatch.url)
            const { base64 } = await getPlaiceholder(imageBuffer)
            post.eyecatch.blurDataURL = base64
        }
        catch (e) {
            console.log('===Plaiceholder===')
            console.log(e)
        }
    }

    return {
        props: {
            posts: posts,
        },
    }
}