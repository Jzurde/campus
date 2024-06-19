import styles from '@/styles/icon-listitem.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function IconListItem({icon, title, children}){
    return(
        <div className={styles.container}>
            <div className={styles.titlebar}>
                <FontAwesomeIcon icon={icon}/>
                <p>{title}</p>
            </div>
            {children}
        </div>
    )
}