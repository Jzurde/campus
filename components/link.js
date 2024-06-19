import styles from '@/styles/link.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faArrowUpRightFromSquare, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function LinkButton({title, type=0, link="", newTab=false}){
    return(
        (type!=3) ? (
        <Link href={link}>
        <div className={
            (type==1) ? styles.gray : 
            (type==0) ? styles.default:
            styles.icon
            }>
            {
            (type==2) ? <FontAwesomeIcon icon={faHashtag}/>: <></>
            }            
            <span>{title}</span>
            <FontAwesomeIcon icon={faArrowRight} size='xs'/>
        </div>
        </Link>        
        ) : (
        <a href={link} className={styles.icon} target={(newTab)&&'_blank'}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>       
            <span>{title}</span>
            <FontAwesomeIcon icon={faArrowRight} size='xs'/>
        </a>)
        
    )
}