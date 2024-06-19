import Container from "@/components/container"
import ConvertBody from "@/components/convert-body"
import IconListItem from "@/components/icon-listitem"
import LinkButton from "@/components/link"
import PostBody from "@/components/post-body"
import SidebarContainer from "@/components/sidebar-container"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "@/components/two-colums"
import { getAllWorksSlug, getWorkBySlug } from "@/lib/api"
import styles from '@/styles/works_page.module.css'
import { faClock } from "@fortawesome/free-regular-svg-icons"
import { faHashtag, faLink, faTag } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import Meta from "@/components/meta"

// "title,slug,link,link_name,catchphrase,classification,when_published,description"
export default function WorksPage({
    title,
    eyecatch,
    link,
    link_name,
    catchphrase,
    classification,
    when_published,
    description
}) {
    return (
        <Container>
            <Meta 
                pageTitle={title}
                pageDesc={`${title}の紹介ページ`}
                pageImg={eyecatch.url}
                pageImgW={eyecatch.width}
                pageImgH={eyecatch.height}
                />
            <div className={styles.top_bar}>
                <h4>{title}</h4>
                {(link != "") && <LinkButton link={link} title={link_name} type="3" newTab/>}
            </div>
            <h1 className={styles.catchphrase}>{catchphrase}</h1>
            <Image
                src={eyecatch.url}
                alt={title}
                width={eyecatch.width}
                height={eyecatch.height}
                placeholder="blur"
                blurDataURL="{eyecatch.blurDataURL}"
                className={styles.eyecatch}
                priority
            />
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                        <ConvertBody contentHTML={description} />
                    </PostBody>
                </TwoColumnMain>
                <TwoColumnSidebar>
                    <SidebarContainer>
                        <IconListItem icon={faTag} title="作品名">
                            <h3>{title}</h3>
                        </IconListItem>
                        <IconListItem icon={faHashtag} title="作品種別">
                            <h3>{classification}</h3>
                        </IconListItem>
                        <IconListItem icon={faClock} title="公開日">
                            <h3>{format(parseISO(when_published), 'yyyy年MM月dd日', { locale: ja, })}</h3>
                        </IconListItem>
                        {(link != "") && (
                            <IconListItem icon={faLink} title="公開ウェブサイト">
                                <LinkButton link={link} title={link_name} type="3" newTab/>
                            </IconListItem>)}
                    </SidebarContainer>
                </TwoColumnSidebar>
            </TwoColumn>
        </Container>
    )
}

export async function getStaticPaths() {
    const allSlugs = await getAllWorksSlug()

    return {
        paths: allSlugs.map(({ slug }) => `/works/${slug}`),
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const slug = context.params.slug

    const work = await getWorkBySlug(slug)

    // const eyecatch = post.eyecatch ?? eyecatchLocal

    // const imageBuffer = await getImageBuffer(eyecatch.url)
    // const { base64 } = await getPlaiceholder(imageBuffer)
    // eyecatch.blurDataURL = base64

    return {
        props: {
            title: work.title,
            eyecatch: work.eyecatch,
            link: (work.hasOwnProperty('link')) ? work.link : "",
            link_name: (work.hasOwnProperty('link_name')) ? work.link_name : "",
            catchphrase: work.catchphrase,
            classification: work.classification,
            when_published: work.when_published,
            description: work.description
        }
    }
}