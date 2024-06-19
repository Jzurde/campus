import styles from '@/styles/sns.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faGithub, faBluesky } from '@fortawesome/free-brands-svg-icons'
import { siteData } from '@/lib/constant'

export default function SNS({isAlignRight = false}) {
    return (
        <div>
            <ul className={(isAlignRight) ? styles.right : styles.left}>
                <li>
                    <a href={siteData.snsLinks.twitter} target='_blank'>
                        <FontAwesomeIcon icon={faXTwitter} />
                        <span className='sr-only'>X-Twitter</span>
                    </a>
                </li>
                <li>
                    <a href={siteData.snsLinks.bluesky} target='_blank'>
                        <FontAwesomeIcon icon={faBluesky} />
                        <span className='sr-only'>Bluesky</span>
                    </a>
                </li>
                <li>
                    <a href={siteData.snsLinks.github} target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                        <span className='sr-only'>Github</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}