import LinkButton from './link'
import styles from'@/styles/profile.module.css'
import { siteData } from '@/lib/constant'
import parse from 'html-react-parser'
import Image from 'next/image'

export default function Profile(){
    const profile_logo = siteData.profile.logo
    return(
        <div className={styles.container}>
            <Image src={profile_logo.url} width={profile_logo.width} height={profile_logo.height}/>
            <h4>{siteData.profile.name}</h4>
            <p>{parse(siteData.profile.description)}</p>
            <LinkButton title="お問合せ" link='/contact'/>
        </div>
    )
}