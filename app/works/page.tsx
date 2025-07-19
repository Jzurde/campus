import Container from "@/components/container/container"
import ListHeader from "@/components/list_header/list_header"
import WorkList from "@/components/work_list.js/work_list"
import { getAllWorksSlug } from "@/lib/cms-api"
import Meta from "@/lib/meta"

export async function generateMetadata() {
    return Meta({
        pageTitle: "全ての作品",
        pageDescription: "これまでのすべての作品一覧"
    })
}


export default async function AllWorks() {

    const works = await getAllWorksSlug()

    return (
        <Container>
            <ListHeader title="全ての作品" />
            <WorkList works={works} />
        </Container>
    )
}