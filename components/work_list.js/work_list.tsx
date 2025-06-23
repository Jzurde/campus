import { SmallTile } from "../tile/tile"
import TileContainer from "../tile_container/tile_container"

export default function WorkList({ works }: { works: any }) {

    let objectCount = 0

    return (
        <TileContainer>
            {works.map(({
                title, slug, catchphrase, eyecatch
            }: {
                title: string;
                slug: string;
                catchphrase: string;
                eyecatch: any;
            }) => {
                objectCount++
                const linkData = {
                    this_link: { title: title, link: "/works/" + slug },
                    description: catchphrase,
                    eyecatch: eyecatch,
                }
                return <SmallTile link_data={linkData} isLCP={objectCount <= 2} key={objectCount} />
            })
            }
        </TileContainer>
    )
}