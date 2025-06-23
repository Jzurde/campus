import styles from './post_header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { parseISO, format } from 'date-fns'
import { ja } from 'date-fns/locale/ja'
import LinkButton from '../link_button/link_button'
import ShareMenu from '../share_menu/share_menu'

export default function PostHeader({
    title, displayTitle, publish, categories, url
}: {
    title: string;
    displayTitle: string;
    publish: string;
    categories: any;
    url: string;
}) {
    return (
        <section className={styles.container}>
            <div className={styles.tags}>
                {categories.map(({
                    name, slug
                }: {
                    name: string;
                    slug: string;
                }) => (
                    <LinkButton title={name} type={2} link={'/posts/category/' + slug} key={name} />
                ))}
            </div>
            <h1>{displayTitle}</h1>
            <div className={styles.detail_container}>
                <div className={styles.dates}>
                    <FontAwesomeIcon icon={faClock} />
                    <time dateTime={publish}>
                        {format(parseISO(publish), 'yyyy年MM月dd日', { locale: ja, })}
                    </time>
                </div>
                <div className={styles.share_container}>
                    <ShareMenu url={url} title={title} />
                </div>
            </div>
        </section>
    )
}