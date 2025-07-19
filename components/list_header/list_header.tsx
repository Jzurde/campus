import { getSiteSettings } from '@/lib/cms-api';
import styles from './list_header.module.css'

export default async function ListHeader({
    title, subtitle = ""
}: {
    title: string;
    subtitle?: string;
}) {
    const displaySubtitle = (subtitle) ? subtitle : (await getSiteSettings("siteDesc")).siteDesc
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <p>{displaySubtitle}</p>
        </div>
    )
}