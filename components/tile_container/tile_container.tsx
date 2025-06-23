import styles from './tile_container.module.css'

export default function TileContainer({
    children, small = false
}: {
    children: React.ReactNode;
    small?: boolean;
}) {
    return (
        <div className={(small) ? styles.big_container : styles.small_container}>
            {children}
        </div>
    )
}