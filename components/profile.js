import ProfileLogo from '@/public/profile.svg'
import LinkButton from './link'
import styles from'@/styles/profile.module.css'
import { siteData } from '@/lib/constant'
import parse from 'html-react-parser'

export default function Profile(){
    return(
        <div className={styles.container}>
            <ProfileLogo width={175} />
            <h4>{siteData.profile.name}</h4>
            <p>{parse(siteData.profile.description)}</p>
            <LinkButton title="お問合せ" link='/contact'/>
        </div>
    )
}