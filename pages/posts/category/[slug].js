import Container from "@/components/container";
import PostList from "@/components/post_list";
import { getAllPostsByCategory, getCategories } from "@/lib/api";
import { getPlaiceholder } from "plaiceholder";
import { getImageBuffer } from "@/lib/getImageBuffer";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";

export default function Category({ name, posts }) {
    return (
        <Container>
            <Meta pageTitle={`${name}に関する発言`} pageDesc={`${name}に関する発言一覧`}/>
            <ListHeader title={name} subtitle="発言のカテゴリー" />
            <PostList posts={posts} />
        </Container>
    )
}

export async function getStaticPaths() {
    const allCategories = await getCategories(true)
    return {
        paths: allCategories.map(({ slug }) => `/posts/category/${slug}`),
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const categorySlug = context.params.slug

    const allCategories = await getCategories(true)

    const category = allCategories.find(({ slug }) => slug === categorySlug)

    const posts = await getAllPostsByCategory(category.id)

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
        // if (!post.hasOwnProperty('eyecatch')) {
        //     post.eyecatch = eyecatchLocal
        // }
        // const { base64 } = await getPlaiceholder(post.eyecatch.url)
        // post.eyecatch.blurDataURL = base64

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
            name: category.name,
            posts: posts,
        }
    }

    // for (const post of posts) {
    //     if (!post.hasOwnProperty('eyecatch')) {
    //         post.eyecatch = eyecatchLocal
    //     }
    //     // const { base64 } = await getPlaiceholder(post.eyecatch.url)
    //     // post.eyecatch.blurDataURL = base64

    //     const imageBuffer = await getImageBuffer(post.eyecatch.url)
    //     const { base64 } = await getPlaiceholder(imageBuffer)
    //     post.eyecatch.blurDataURL = base64
    // }

    // return {
    //     props: {
    //         posts: posts,
    //     },
    // }
}