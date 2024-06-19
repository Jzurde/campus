import styles from '@/styles/tile_container.module.css'

export default function TileContainer({ children, small=false }){
    return(
        <div className={(small)? styles.big_container : styles.small_container}>
            {children}
        </div>
    )
}