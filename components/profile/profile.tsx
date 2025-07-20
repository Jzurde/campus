import styles from './profile.module.css'
import parse from 'html-react-parser'
import LinkButton from '../link_button/link_button';
import { Bungee } from 'next/font/google';
import { getSiteSettings } from '@/lib/cms-api';
import { getIfContactFormValid } from '@/lib/transporter';

const logoFontInstance = Bungee({ subsets: ['latin'], weight: '400' });
const LogoFont = logoFontInstance;

export default async function Profile() {

    const siteSettings = await getSiteSettings("profile")
    const english_name = siteSettings.profile.english_name;
    const name = siteSettings.profile.name;
    const description = siteSettings.profile.description;

    return (
        <div className={styles.container}>
            <h2 className={`${styles.profile_name} ${LogoFont.className}`}>{english_name}</h2>
            <h4>{name}</h4>
            <p>{parse(description)}</p>
            {(await getIfContactFormValid()) && <LinkButton title="お問合せ" link='/contact' />}
        </div>
    )
}