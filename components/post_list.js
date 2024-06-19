import TileContainer from './tile_container'
import { LargeTile } from './tile'

export default function PostList({ posts }) {

    let objectCount = 0

    return (
        <TileContainer>
            {posts.map(({ title, slug, categories, eyecatch }) => {
                objectCount++
                const linkData = {
                    this_link: { title: title, link: "/posts/"+slug },
                    link_links: categories,
                    eyecatch: eyecatch
                }
                return <LargeTile link_data={linkData} isLCP={objectCount<=2} />
            })}
        </TileContainer>
    )
}