import styles from '@/styles/header.module.css'
import Container from './container'
import Link from 'next/link'
import { _siteData, logoFontInstance } from './_constant';

const LogoFont = logoFontInstance;

export default function Header() {
    const logoText = _siteData.siteLogo;

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/">
                        <h1 className={`${styles.logo_title} ${LogoFont.className}`}>{logoText}</h1>
                    </Link>
                    <h4>{_siteData.siteTitle}</h4>
                    <p className={styles.subcaption}>{_siteData.siteDesc}</p>
                </div>
            </Container>
        </header>
    )
}