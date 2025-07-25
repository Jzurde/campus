import Link from 'next/link';
import styles from './header.module.css';
import Container from '@/components/container/container'
import { Bungee } from 'next/font/google';
import { getSiteSettings } from '@/lib/cms-api';

const logoFontInstance = Bungee({ subsets: ['latin'], weight: '400' })

export default async function Header() {
    const settings = await getSiteSettings("siteLogo,siteTitle,siteDesc")
    const logoText = settings.siteLogo;
    const siteTitle = settings.siteTitle;
    const siteDesc = settings.hasOwnProperty('siteDesc') ? settings.siteDesc : "人間の大学生のポートフォリオ";

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/">
                        <h1 className={`${styles.logo_title} ${logoFontInstance.className}`}>{logoText}</h1>
                    </Link>
                    <h4>{siteTitle}</h4>
                    <p className={styles.subcaption}>{siteDesc}</p>
                </div>
            </Container>
        </header>
    )
}