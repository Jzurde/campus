import Image from "next/image";
import styles from './profile_hero.module.css'
import { Bungee } from 'next/font/google';
import { getSiteSettings } from "@/lib/cms-api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faBluesky, faThreads, faGithub } from "@fortawesome/free-brands-svg-icons";

const logoFontInstance = Bungee({ subsets: ['latin'], weight: '400' });
const LogoFont = logoFontInstance;

export default async function ProfileHero() {

    const siteSettings = await getSiteSettings("profile") || {}
    const profile = siteSettings.profile ?? {}
    const english_name = profile.english_name ?? "#ENGLISH NAME";
    const name = profile.name ?? "#日本語ペンネーム";
    const imagename = Array.isArray(profile.toppageHero) ? profile.toppageHero[0] : "person5";

    return (
        <div className={styles.profile_hero}>
            {(imagename != "表示しない") && <Image
                className={styles.faceimg}
                src={`/profile-human_image/${imagename}.png`}
                alt="profile-image"
                width={150}
                height={150} />}
            <div className={styles.profile_wrapper}>
                <h1 className={`${styles.profile_name} ${LogoFont.className}`}>
                    Hi,<br /> I'm <span className={styles.username}>{english_name}</span>
                </h1>
                <h3>こんにちは、<span className={styles.username}>{name}</span>です。</h3>
                <ul className={styles.sns_link}>
                    {(profile.hasOwnProperty('twitter')) && <li>
                        <a href={profile.twitter} target='_blank'>
                            <FontAwesomeIcon icon={faXTwitter} size="lg" />
                            <span>X - Twitter</span>
                        </a>
                    </li>}
                    {(profile.hasOwnProperty('bluesky')) && <li>
                        <a href={profile.bluesky} target='_blank'>
                            <FontAwesomeIcon icon={faBluesky} size="lg" />
                            <span>Bluesky</span>
                        </a>
                    </li>}
                    {(profile.hasOwnProperty('threads')) && <li>
                        <a href={profile.threads} target='_blank'>
                            <FontAwesomeIcon icon={faThreads} size="lg" />
                            <span>Threads</span>
                        </a>
                    </li>}
                    {(profile.hasOwnProperty('github')) && <li>
                        <a href={profile.github} target='_blank'>
                            <FontAwesomeIcon icon={faGithub} size="lg" />
                            <span>Github</span>
                        </a>
                    </li>}
                </ul>
            </div>
        </div>
    )
}