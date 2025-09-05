import { getSiteSettings } from '@/lib/cms-api';
import LinkButton from '../link_button/link_button'
import PostList from '../post_list.js/post_list';
import styles from './topic.module.css'

export default async function Topics({
    posts, categories
}: {
    posts: any;
    categories: { name: string; slug: string }[];
}) {
    const siteSettigns = await getSiteSettings("topPage") || {}
    const toppageSettings = siteSettigns.topPage ?? {}

    const section_topics = toppageSettings.section_topics ?? 'トピックス'
    const subsection_interests = toppageSettings.subsection_interests ?? '最近の興味'
    const subsection_articles = toppageSettings.subsection_articles ?? '最近の発言'
    return (
        <section className={styles.container}>
            <h2>{section_topics}</h2>
            <div className={styles.inner}>
                <h3>{subsection_interests}</h3>
                <div className={styles.interest}>
                    {categories.map(({ name, slug }) => (
                        <LinkButton title={name} type={2} link={'/posts/category/' + slug} key={slug} />
                    ))}
                </div>

                <div className={styles.scroll_infinity}>
                    <div className={styles.scroll_infinity_wrap}>
                        <div className={styles.scroll_infinity_list}>
                            {categories.map(({ name, slug }) => (
                                <div className={styles.scroll_infinity_item} key={slug}>
                                    <LinkButton title={name} type={2} link={'/posts/category/' + slug} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.scroll_infinity_list}>
                            {categories.map(({ name, slug }) => (
                                <div className={styles.scroll_infinity_item} key={slug}>
                                    <LinkButton title={name} type={2} link={'/posts/category/' + slug} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.inner}>
                <div className={styles.title_flex}>
                    <h3>{subsection_articles}</h3>
                    <LinkButton title="全ての発言" type={1} link="/posts" />
                </div>
                <PostList posts={posts} />
            </div>
        </section>
    )
}