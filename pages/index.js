import Topics from '@/components/topics'
import Works from '@/components/works'
import Container from '@/components/container'
import { getAllSlugs, getAllWorksSlug, getCategories } from '@/lib/api'
import { getImageBuffer } from '@/lib/getImageBuffer'
import { getPlaiceholder } from 'plaiceholder'
import Meta from '@/components/meta'

export default function Home({ topic_posts, topic_categories, works }) {
  return (
    <Container>
      <Meta />
      <Topics posts={topic_posts} categories={topic_categories} />
      <Works works={works} />
    </Container>
  )
}

export async function getStaticProps() {
  const topic_posts = await getAllSlugs(true, 6)
  const topic_categories = await getCategories()
  const works = await getAllWorksSlug(6)

  for (const post of topic_posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      let str_categories = ""
      post.categories.map((value) => {
        str_categories += value.name + ','
      })
      post.eyecatch = { 
        url: `${process.env.APP_URL}/api/log?title=${post.title}&categories=${str_categories.slice( 0, -1 )}`,
        width: 1200,
        height: 630,
      }
    }
    try{
      const imageBuffer = await getImageBuffer(post.eyecatch.url)
      const { base64 } = await getPlaiceholder(imageBuffer)
      post.eyecatch.blurDataURL = base64
    }
    catch(e){
      console.log('===Plaiceholder===')
      console.log(e)
    }
  }

  return {
    props: {
      topic_posts: topic_posts,
      topic_categories: topic_categories,
      works: works,
    },
  }
}