import React from 'react'
import styles from './post_body.module.css'

export default function PostBody({ 
    children,
    ignoreMarginBottom = false
}: { 
    children: React.ReactNode,
    ignoreMarginBottom?: boolean
}) {
    return (
        <div className={(!ignoreMarginBottom) ? styles.stack : `${styles.stack} ${styles.ignore_margin_bottom}`}>
            {children}
        </div>
    )
}