import LinkButton from '../link_button/link_button'
import PostList from '../post_list.js/post_list';
import styles from './topic.module.css'

export default function Topics({
    posts, categories
}: {
    posts: any;
    categories: { name: string; slug: string }[];
}) {
    return (
        <section className={styles.container}>
            <h2>トピックス</h2>
            <div className={styles.inner}>
                <h3>最近の興味</h3>
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
                    <h3>最近の発言</h3>
                    <LinkButton title="全ての発言" type={1} link="/posts" />
                </div>
                <PostList posts={posts} />
            </div>
        </section>
    )
}