import styles from '@/styles/pure-link.module.css'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PureLink({ link, target = "_self", text }) {
    return (
        <>
            <a href={link} target={target} className={styles.link}>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </span>
                <span className={styles.text}>{text}</span>
            </a>
        </>
    )
}