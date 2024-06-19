import styles from'@/styles/works.module.css'
import LinkButton from './link'
import TileContainer from './tile_container'
import WorkList from './work_list'

export default function Works({works}){
    return(
        <section className={styles.container}>
            <h2>ワークス</h2>
            <div className={styles.inner}>
                <div className={styles.title_flex}>
                    <h3>最近の作品</h3>
                    <LinkButton title="全ての作品" type="1" link='/works'/>
                </div>
                <WorkList works={works}/>
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