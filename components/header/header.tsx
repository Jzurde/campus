import Link from 'next/link';
import styles from './header.module.css';
import Container from '@/components/container/container'
import { Bungee } from 'next/font/google';

const logoFontInstance = Bungee({ subsets: ['latin'], weight: '400' })

export default function Header() {
    const logoText = "CAMPUS";
    const siteTitle = "キャンパス";
    const siteDesc = "人間の大学生のポートフォリオ";

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