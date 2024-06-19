import styles from '@/styles/sidebar-container.module.css'

export default function SidebarContainer({ children }){
    return (
        <div className={styles.contact}>
            {children}
        </div>
    )
}