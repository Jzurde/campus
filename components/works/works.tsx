import { getSiteSettings } from '@/lib/cms-api'
import LinkButton from '../link_button/link_button'
import WorkList from '../work_list.js/work_list'
import styles from './works.module.css'

export default async function Works({ works }: { works: any }) {
    const settings = (await getSiteSettings("topPage")).topPage
    const section_works = settings?.hasOwnProperty('section_works') ? settings.section_works : 'ワークス'
    const subsection_works = settings?.hasOwnProperty('subsection_works') ? settings.subsection_works : '最近の作品'
    return (
        <section className={styles.container}>
            <h2>{section_works}</h2>
            <div className={styles.inner}>
                <div className={styles.title_flex}>
                    <h3>{subsection_works}</h3>
                    <LinkButton title="全ての作品" type={1} link='/works' />
                </div>
                <WorkList works={works} />
            </div>
            {/* <div className={styles.inner}>
                <div className={styles.title_flex}>
                    <h3>過去に関わったプロジェクト</h3>
                    <LinkButton title="全ての過去に関わったプロジェクト" type="1"/>
                </div>
                <TileContainer>

                </TileContainer>
            </div> */}
        </section>
    )
}