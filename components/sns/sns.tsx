import styles from './sns.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faGithub, faBluesky, faThreads } from '@fortawesome/free-brands-svg-icons'

export default function SNS({
    isAlignRight = false,
}: {
    isAlignRight?: boolean;
}) {
    return (
        <div>
            <ul className={(isAlignRight) ? styles.right : styles.left}>
                <li>
                    <a href="https://twitter.com/Jzurde_" target='_blank'>
                        <FontAwesomeIcon icon={faXTwitter} />
                        <span className='sr-only'>X-Twitter</span>
                    </a>
                </li>
                <li>
                    <a href="https://bsky.app/profile/jzurde.bsky.social" target='_blank'>
                        <FontAwesomeIcon icon={faBluesky} size="xs" />
                        <span className='sr-only'>Bluesky</span>
                    </a>
                </li>
                <li>
                    <a href="https://www.threads.com/@jzurde_" target='_blank'>
                        <FontAwesomeIcon icon={faThreads} size="xs" />
                        <span className='sr-only'>Threads</span>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/Jzurde" target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                        <span className='sr-only'>Github</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}