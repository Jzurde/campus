import { getSiteSettings } from '@/lib/cms-api'
import Container from '../container/container'
import LinkButton from '../link_button/link_button'
import Profile from '../profile/profile'
import SNS from '../sns/sns'
import styles from './footer.module.css'

export default async function Footer() {

    const siteSettings = await getSiteSettings("copyright") || {}
    const copyright = siteSettings.copyright ?? "#著作権表示";

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
                <LinkButton title="サイトポリシー" link='/terms/' />
                <small className={styles.copyright}>&copy;{copyright}</small>
            </Container>
        </footer>
    )
}