import styles from './pure_link.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function PureLink({
    link, target = "_self", text
}: {
    link: string;
    target?: string;
    text: any;
}) {
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