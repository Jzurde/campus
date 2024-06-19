import { SmallTile } from "./tile";
import TileContainer from "./tile_container";

export default function WorkList({works}){

    let objectCount = 0

    return(
        <TileContainer>
            {works.map(({title,slug,catchphrase,eyecatch})=>{
                objectCount++
                const linkData = {
                    this_link: {title: title, link: "/works/"+slug},
                    description: catchphrase,
                    eyecatch: eyecatch,
                }
                return <SmallTile link_data={linkData} isLCP={objectCount<=2} />
            })
            }
        </TileContainer>
    )
}