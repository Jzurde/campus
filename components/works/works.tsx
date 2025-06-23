import LinkButton from '../link_button/link_button'
import WorkList from '../work_list.js/work_list'
import styles from './works.module.css'

export default function Works({ works }: { works: any }) {
    return (
        <section className={styles.container}>
            <h2>ワークス</h2>
            <div className={styles.inner}>
                <div className={styles.title_flex}>
                    <h3>最近の作品</h3>
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