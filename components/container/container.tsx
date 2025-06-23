import React from 'react';
import styles from './container.module.css';

export default function Container({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.default}>
            {children}
        </div>
    )
}

export function SidebarContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.contact}>
            {children}
        </div>
    )
}