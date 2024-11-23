import { _myProfile } from "@/components/_constant";
import Container from "@/components/container";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";
import WorkList from "@/components/work_list";
import { getAllWorksSlug } from "@/lib/api";

export default function AllWorks({ works }){
    return(
        <Container>
            <Meta pageTitle="全ての作品" pageDesc={`これまでの${_myProfile.name}のすべての作品の一覧`}/>
            <ListHeader title="全ての作品"/>
            <WorkList works={works}/>
        </Container>
    )
}

export async function getStaticProps(){
    const works = await getAllWorksSlug()

    return{
        props: {
            works: works,
        },
    }
}