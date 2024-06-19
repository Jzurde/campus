import styles from '@/styles/post_header.module.css'
import LinkButton from './link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { parseISO, format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export default function PostHeader({ title, publish, categories }) {
    return (
        <section className={styles.container}>
            <div className={styles.tags}>
                {categories.map(({ name, slug }) => (
                    <LinkButton title={name} type="2" link={'/posts/category/'+slug} />
                ))}
            </div>
            <h1>{title}</h1>
            <div className={styles.dates}>
                <FontAwesomeIcon icon={faClock} />
                <time dateTime={publish}>
                    {format(parseISO(publish), 'yyyy年MM月dd日', { locale: ja, })}
                </time>
            </div>
        </section>
    )
}