import React from 'react'
import styles from './post_body.module.css'

export default function PostBody({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.stack}>
            {children}
        </div>
    )
}