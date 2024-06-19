import styles from '@/styles/footer.module.css'
import Profile from './profile'
import SNS from './sns'
import Container from './container'
import LinkButton from './link'
import { siteData } from '@/lib/constant'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.container}>
                    <div className={styles.profile}>
                        <Profile />
                    </div>
                    <div className={styles.sns}>
                        <SNS isAlignRight />
                    </div>
                </div>
                <LinkButton title="サイトポリシー" link='/terms/'/>
                <small className={styles.copyright}>&copy;{siteData.copyright}</small>
            </Container>
        </footer>
    )
}