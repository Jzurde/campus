import React from 'react'
import styles from './two_columns.module.css'

export function TwoColumn({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}

export function TwoColumnMain({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.main}>
            {children}
        </div>
    )
}

export function TwoColumnSidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.sidebar}>
            {children}
        </div>
    )
}