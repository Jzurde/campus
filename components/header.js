import Logo from '../public/logo.svg'
import styles from '@/styles/header.module.css'
import Container from './container'
import Link from 'next/link'
import { siteMeta } from '@/lib/constant'

export default function Header() {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <Link href="/">
                        <Logo width={180} />
                    </Link>
                    <h4>{siteMeta.siteTitle}</h4>
                    <p className={styles.subcaption}>{siteMeta.siteDesc}</p>
                </div>
            </Container>
        </header>
    )
}