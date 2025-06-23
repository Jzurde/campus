import LinkButton from "../link_button/link_button";
import styles from './works_topbar.module.css'
import Image from "next/image";

export function WorksTopbar({
    title, link, link_name
}: {
    title: string;
    link?: string;
    link_name?: string;
}) {
    return (
        <div className={styles.top_bar}>
            <h4>{title}</h4>
            {(link && link_name) && <LinkButton link={link} title={link_name} type={3} newTab />}
        </div>
    )
}

export function WorksCatchphrase({ catchphrase }: { catchphrase: string; }) {
    return (
        <h1 className={styles.catchphrase}>{catchphrase}</h1>
    )
}

export function WorksEyecatch({
    eyecatch, title
}: {
    eyecatch: any;
    title: string;
}) {
    return (
        <Image
            src={eyecatch.url}
            alt={title}
            width={eyecatch.width}
            height={eyecatch.height}
            placeholder="blur"
            blurDataURL="{eyecatch.blurDataURL}"
            className={styles.eyecatch}
            priority
        />
    )
}