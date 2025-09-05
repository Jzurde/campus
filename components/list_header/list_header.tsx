import { getSiteSettings } from '@/lib/cms-api';
import styles from './list_header.module.css'

export default async function ListHeader({
    title, subtitle = ""
}: {
    title: string;
    subtitle?: string;
}) {
    const siteSettigns = await getSiteSettings("siteDesc") || {}
    const siteDesc = siteSettigns.siteDesc ?? "人間の大学生のポートフォリオ"
    const displaySubtitle = (subtitle) ? subtitle : siteDesc
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <p>{displaySubtitle}</p>
        </div>
    )
}