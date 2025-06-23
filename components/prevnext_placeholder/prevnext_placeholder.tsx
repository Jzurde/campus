import styles from './prevnext_placeholder.module.css'

export default function PrevnextPlacholder({ message }: { message: string }) {
    return (
        <div className={styles.placeholder}>{message}</div>
    )
}