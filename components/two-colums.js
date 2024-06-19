import styles from '@/styles/two-colums.module.css'

export function TwoColumn({children}){
    return(
        <div className={styles.container}>
            {children}
        </div>
    )
}

export function TwoColumnMain({children}){
    return(
        <div className={styles.main}>
            {children}
        </div>
    )
}

export function TwoColumnSidebar({children}){
    return(
        <div className={styles.sidebar}>
            {children}
        </div>
    )
}