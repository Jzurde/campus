import styles from './sns.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faGithub, faBluesky, faThreads } from '@fortawesome/free-brands-svg-icons'
import { getSiteSettings } from '@/lib/cms-api';

export default async function SNS({
    isAlignRight = false,
}: {
    isAlignRight?: boolean;
}) {

    const siteSettings = await getSiteSettings("profile") || {}
    const profile = siteSettings.profile ?? {}

    return (
        <div>
            <ul className={(isAlignRight) ? styles.right : styles.left}>
                {(profile.hasOwnProperty('twitter')) && <li>
                    <a href={profile.twitter} target='_blank'>
                        <FontAwesomeIcon icon={faXTwitter} />
                        <span className='sr-only'>X-Twitter</span>
                    </a>
                </li>}
                {(profile.hasOwnProperty('bluesky')) && <li>
                    <a href={profile.bluesky} target='_blank'>
                        <FontAwesomeIcon icon={faBluesky} size="xs" />
                        <span className='sr-only'>Bluesky</span>
                    </a>
                </li>}
                {(profile.hasOwnProperty('threads')) && <li>
                    <a href={profile.threads} target='_blank'>
                        <FontAwesomeIcon icon={faThreads} size="xs" />
                        <span className='sr-only'>Threads</span>
                    </a>
                </li>}
                {(profile.hasOwnProperty('github')) && <li>
                    <a href={profile.github} target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                        <span className='sr-only'>Github</span>
                    </a>
                </li>}
            </ul>
        </div>
    )
}