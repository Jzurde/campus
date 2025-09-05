import Container from "@/components/container/container";
import ProfileHero from "@/components/profile_hero/profile_hero";
import Topics from "@/components/topics/topics";
import Works from "@/components/works/works";
import { getAllSlugs, getAllWorksSlug, getCategories, getSiteSettings } from "@/lib/cms-api";
import Meta from "@/lib/meta";

export async function generateMetadata() {
  const siteSettings = await getSiteSettings("siteDesc") || {}
  return Meta({
    pageDescription: siteSettings.siteDesc ?? "人間の大学生のポートフォリオ"
  })
}

export default async function Home() {

  const topic_posts = await getAllSlugs(true, 6);
  const topic_categories = await getCategories()
  const works = await getAllWorksSlug(6)
  const siteSettings = await getSiteSettings("profile") || {}
  const heroSettings = siteSettings.profile?.toppageHero ?? [];
  const showHero = Array.isArray(heroSettings) && heroSettings[0] !== "person5";

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
      {(showHero) && <ProfileHero />}
      {(topic_posts.length > 0) && <Topics posts={topic_posts} categories={topic_categories} />}
      {(works.length > 0) && <Works works={works} />}
    </Container>
  )
}