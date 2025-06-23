import { LargeTile } from "../tile/tile";
import TileContainer from "../tile_container/tile_container"

export default function PostList({ posts }: { posts: any; }) {

    let objectCount = 0

    return (
        <TileContainer>
            {posts.map(({
                title, slug, categories, eyecatch
            }: {
                title: string;
                slug: string;
                categories: any;
                eyecatch: any;
            }) => {
                objectCount++
                const linkData = {
                    this_link: { title: title, link: "/posts/" + slug },
                    link_links: categories,
                    eyecatch: eyecatch
                }
                return <LargeTile link_data={linkData} isLCP={objectCount <= 2} key={objectCount} />
            })}
        </TileContainer>
    )
}