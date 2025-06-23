import React from 'react';
import styles from './icon_listitem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconListItem({
    icon, title, children
}: {
    icon: any;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className={styles.container}>
            <div className={styles.titlebar}>
                <FontAwesomeIcon icon={icon} />
                <p>{title}</p>
            </div>
            {children}
        </div>
    )
}