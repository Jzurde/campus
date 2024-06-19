import { siteData } from '@/lib/constant'
import styles from '@/styles/list_header.module.css'

export default function ListHeader({ title, subtitle = siteData.shortDescription }) {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    )
}