import styles from './profile.module.css'
import parse from 'html-react-parser'
import LinkButton from '../link_button/link_button';
import { Bungee } from 'next/font/google';

const logoFontInstance = Bungee({ subsets: ['latin'], weight: '400' });
const LogoFont = logoFontInstance;

export default function Profile() {

    const english_name = "YOUR NAME";
    const name = "あなたの名前";
    const description = "あなたのプロフィール。<br>少し長文でもいいかもしれませんね。";

    return (
        <div className={styles.container}>
            <h2 className={`${styles.profile_name} ${LogoFont.className}`}>{english_name}</h2>
            <h4>{name}</h4>
            <p>{parse(description)}</p>
            <LinkButton title="お問合せ" link='/contact' />
        </div>
    )
}