import LinkButton from './link'
import styles from'@/styles/profile.module.css'
import { siteData } from '@/lib/constant'
import parse from 'html-react-parser'
import { Bungee } from 'next/font/google';

const LogoFont = Bungee({ subsets: ['latin'], weight: '400' });

export default function Profile(){
    return(
        <div className={styles.container}>
            <h2 className={`${styles.profile_name} ${LogoFont.className}`}>YOUR NAME</h2>
            <h4>あなたの名前</h4>
            <p>{parse(siteData.profile.description)}</p>
            <LinkButton title="お問合せ" link='/contact'/>
        </div>
    )
}