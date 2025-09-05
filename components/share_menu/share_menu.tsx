import { getSiteSettings } from '@/lib/cms-api';
import styles from './share_menu.module.css'
import { faBluesky, faFacebook, faLine, faThreads, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default async function ShareMenu({
    url, title, fullSize = false
}: {
    url: string;
    title: string;
    fullSize?: boolean;
}) {

    const siteSettings = await getSiteSettings("siteLogo,siteTitle") || {}
    const siteLogo = siteSettings.siteLogo ?? "#SITE LOGO"
    const siteTitle = siteSettings.siteTitle ?? "#サイトタイトル"
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title + ` | ${siteTitle}(${siteLogo})`);

    return (
        <div className={(fullSize) ? styles.full_container : styles.container}>
            <div className={styles.container_title}>
                <FontAwesomeIcon icon={faExclamation} />
                <h6>この記事をシェアする</h6>
            </div>
            <div className={styles.container_inner}>
                <a href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} />
                </a>
                <a href={`http://www.facebook.com/share.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href={`https://bsky.app/intent/compose?text=${encodedTitle}+${encodedUrl}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faBluesky} />
                </a>
                <a href={`https://www.threads.net/intent/post?text=${encodedTitle} ${encodedUrl}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faThreads} />
                </a>
                <a href={`http://line.me/R/msg/text/?${encodedUrl}%0a${encodedTitle}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLine} />
                </a>
            </div>
        </div>
    );
}