import styles from '@/styles/sns.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { _myProfile } from './_constant'

export default function SNS({ isAlignRight = false }) {
    return (
        <div>
            <ul className={(isAlignRight) ? styles.right : styles.left}>
                <li>
                    <a href={_myProfile.snsLinks.twitter} target='_blank'>
                        <FontAwesomeIcon icon={faXTwitter} />
                        <span className='sr-only'>X-Twitter</span>
                    </a>
                </li>
                <li>
                    <a href={_myProfile.snsLinks.instagram} target='_blank'>
                        <FontAwesomeIcon icon={faInstagram} />
                        <span className='sr-only'>Instagram</span>
                    </a>
                </li>
                <li>
                    <a href={_myProfile.snsLinks.github} target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                        <span className='sr-only'>Github</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}