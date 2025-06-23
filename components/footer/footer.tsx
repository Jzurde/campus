import Container from '../container/container'
import LinkButton from '../link_button/link_button'
import Profile from '../profile/profile'
import SNS from '../sns/sns'
import styles from './footer.module.css'

export default function Footer() {

    const copyright = "2025 Jzurde All right reserved.";

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