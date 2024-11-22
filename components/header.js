import styles from '@/styles/header.module.css'
import Container from './container'
import Link from 'next/link'
import { siteMeta } from '@/lib/constant'
import { Bungee } from 'next/font/google';

const BungeeFont = Bungee({ subsets: ['latin'], weight: '400' });

export default function Header() {
    const logoText = siteMeta.siteLogo;
    const isEnglish = /^[A-Za-z\s]+$/.test(logoText);

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/">
                        <h1 className={`${styles.logo_title} ${isEnglish ? BungeeFont.className : ''}`}>Campus</h1>
                    </Link>
                    <h4>{siteMeta.siteTitle}</h4>
                    <p className={styles.subcaption}>{siteMeta.siteDesc}</p>
                </div>
            </Container>
        </header>
    )
}