import styles from '@/styles/header.module.css'
import Container from './container'
import Link from 'next/link'
import { siteMeta } from '@/lib/constant'
import { Bungee } from 'next/font/google';

const LogoFont = Bungee({ subsets: ['latin'], weight: '400' });

export default function Header() {
    const logoText = siteMeta.siteLogo;

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/">
                        <h1 className={`${styles.logo_title} ${LogoFont.className}`}>{logoText}</h1>
                    </Link>
                    <h4>{siteMeta.siteTitle}</h4>
                    <p className={styles.subcaption}>{siteMeta.siteDesc}</p>
                </div>
            </Container>
        </header>
    )
}