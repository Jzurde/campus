import styles from './list_header.module.css'

export default function ListHeader({
    title, subtitle = "じゅーるでのポートフォリオ"
}: {
    title: string;
    subtitle?: string;
}) {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    )
}