import Footer from '@/components/footer'
import Header from '@/components/header'
import {Noto_Sans_JP} from 'next/font/google'
import styles from '@/styles/layout.module.css'

const NotoSansJP = Noto_Sans_JP({ 
    weight: ["800", "500"],
    subsets: ["latin"] 
});

export default function Layout({ children }) {
    return (
        <div className={`${NotoSansJP.className} ${styles.non_flow}`}>
            <Header/>
            <main className={styles.main}>{children}</main>
            <Footer/>
        </div>
    )
}