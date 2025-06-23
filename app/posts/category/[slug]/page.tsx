import Container from "@/components/container/container";
import ListHeader from "@/components/list_header/list_header";
import PostList from "@/components/post_list.js/post_list";
import { getAllPostsByCategory, getCategories } from "@/lib/cms-api";
import Meta from "@/lib/meta";
import { Metadata } from "next";

export async function generateStaticParams() {
    const allCategories = await getCategories(true);

    return allCategories.map(({ slug }: { slug: string }) => ({
        slug: `/posts/category/${slug}`
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const categorySlug = params.slug;
    const allCategories = await getCategories(true)
    const category = allCategories.find(({ slug }: { slug: string }) => slug === categorySlug)

    return Meta({ pageTitle: `${category.name}`, pageDescription: `${category.name}に関する発言一覧` })
}

export default async function Category({ params }: { params: { slug: string } }) {
    const categorySlug = params.slug;
    const allCategories = await getCategories(true)
    const category = allCategories.find(({ slug }: { slug: string }) => slug === categorySlug)

    const posts = await getAllPostsByCategory(category.id)

    for (const post of posts) {
        if (!post.hasOwnProperty('eyecatch')) {
            let str_categories = ""
            post.categories.map((value: any) => {
                str_categories += value.name + ','
            })
            post.eyecatch = {
                url: `${process.env.APP_URL}/api/log?title=${post.title}&categories=${str_categories.slice(0, -1)}`,
                width: 1200,
                height: 630,
            }
        }
    }

    return (
        <Container>
            <ListHeader title={category.name} subtitle="発言のカテゴリー" />
            <PostList posts={posts} />
        </Container>
    )
}
