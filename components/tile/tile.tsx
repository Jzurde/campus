import LinkButton from '../link_button/link_button'
import styles from './tile.module.css'
import Link from "next/link"
import Image from 'next/image'

export function LargeTile({
    link_data, caption, isLCP = false
}: {
    link_data: any;
    caption?: string;
    isLCP?: boolean;
}) {
    // console.log("ggggg---->>>")
    // console.log(this_link.this_link)
    // console.log("ggggg---->>>")
    // console.log(this_link.link_links)
    return (
        <Link href={link_data.this_link.link}>
            <div className={styles.large}>
                {(caption != "") && <small>{caption}</small>}
                {(link_data.eyecatch != undefined) && (
                    <figure>
                        <Image
                            src={link_data.eyecatch.url}
                            alt=""
                            fill
                            // width={link_data.eyecatch.width}
                            // height={link_data.eyecatch.height}
                            sizes="(min-width: 1184px) 395px, 100vw"
                            // placeholder="blur"
                            // blurDataURL="{link_data.eyecatch.blurDataURL}"
                            className={styles.eyecatch}
                            priority={isLCP}
                        />
                    </figure>
                )}
                <h3>{link_data.this_link.title}</h3>
                <div className={styles.links}>
                    {link_data.link_links.map(({ name, slug }: { name: string; slug: string }) => (
                        <object key={slug}>
                            <LinkButton title={name} type={2} link={"/posts/category/" + slug} />
                        </object>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export function SmallTile({
    link_data, isLCP = false
}: {
    link_data: any;
    isLCP: boolean;
}) {
    return (
        <Link href={link_data.this_link.link}>
            <div className={styles.small}>
                <figure>
                    <Image
                        src={link_data.eyecatch.url}
                        alt=""
                        fill
                        // width={link_data.eyecatch.width}
                        // height={link_data.eyecatch.height}
                        sizes="(min-width: 1184px) 395px, 100vw"
                        placeholder="blur"
                        blurDataURL="{link_data.eyecatch.blurDataURL}"
                        className={styles.eyecatch}
                        priority={isLCP}
                    />
                </figure>
                <div className={styles.detail}>
                    <h3>{link_data.this_link.title}</h3>
                    <p>{link_data.description}</p>
                </div>
            </div>
        </Link>
    )
}