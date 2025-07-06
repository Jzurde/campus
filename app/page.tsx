import Container from "@/components/container/container";
import Topics from "@/components/topics/topics";
import Works from "@/components/works/works";
import { getAllSlugs, getAllWorksSlug, getCategories, getSiteSettings } from "@/lib/cms-api";
import Meta from "@/lib/meta";
import { Metadata } from "next";

export async function generateMetadata() {
  const settings = await getSiteSettings("siteLogo,siteDesc")
  console.log(settings)
  return Meta({
    pageTitle: settings.siteLogo,
    pageDescription: settings.siteDesc
  })
}

export default async function Home() {

  const topic_posts = await getAllSlugs(true, 6);
  const topic_categories = await getCategories()
  const works = await getAllWorksSlug(6)

  for (const post of topic_posts) {
    // if (!post.hasOwnProperty('eyecatch')) {
    //   post.eyecatch = eyecatchLocal
    // }
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
      <Topics posts={topic_posts} categories={topic_categories} />
      <Works works={works} />
    </Container>
  )
}