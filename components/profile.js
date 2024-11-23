import LinkButton from './link'
import styles from '@/styles/profile.module.css'
import parse from 'html-react-parser'
import { _myProfile, logoFontInstance } from './_constant';

const LogoFont = logoFontInstance;

export default function Profile() {
    return (
        <div className={styles.container}>
            <h2 className={`${styles.profile_name} ${LogoFont.className}`}>{_myProfile.english_name}</h2>
            <h4>{_myProfile.name}</h4>
            <p>{parse(_myProfile.description)}</p>
            <LinkButton title="お問合せ" link='/contact' />
        </div>
    )
}