import Link from 'next/link';
import styles from './link_button.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faArrowUpRightFromSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function LinkButton({
    title, type = 0, link = "", newTab = false
}: {
    title: string;
    type?: number;
    link?: string;
    newTab?: boolean;
}) {
    return (
        (type != 3) ? (
            <Link href={link}>
                <div className={
                    (type == 1) ? styles.gray :
                        (type == 0) ? styles.default :
                            styles.icon
                }>
                    {
                        (type == 2) ? <FontAwesomeIcon icon={faHashtag} /> : <></>
                    }
                    <span>{title}</span>
                    <FontAwesomeIcon icon={faArrowRight} size='xs' />
                </div>
            </Link>
        ) : (
            <a href={link} className={styles.icon} target={newTab ? '_blank' : undefined}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                <span>{title}</span>
                <FontAwesomeIcon icon={faArrowRight} size='xs' />
            </a>
        )

    )
}