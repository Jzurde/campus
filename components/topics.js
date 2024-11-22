import styles from '@/styles/topics.module.css'
import LinkButton from './link'
import PostList from './post_list'

export default function Topics({ posts, categories }) {
    return (
        <section className={styles.container}>
            <h2>トピックス</h2>
            <div className={styles.inner}>
                <h3>最近の興味</h3>
                <div className={styles.interest}>
                    {categories.map(({ name, slug }) => (
                        <LinkButton title={name} type="2" link={'/posts/category/' + slug} />
                    ))}
                </div>

                <div className={styles.scroll_infinity}>
                    <div className={styles.scroll_infinity_wrap}>
                        <div className={styles.scroll_infinity_list}>
                            {categories.map(({ name, slug }) => (
                                <div className={styles.scroll_infinity_item}>
                                    <LinkButton title={name} type="2" link={'/posts/category/' + slug} />
                                </div>
                            ))}
                        </div>
                        <div className={styles.scroll_infinity_list}>
                            {categories.map(({ name, slug }) => (
                                <div className={styles.scroll_infinity_item}>
                                    <LinkButton title={name} type="2" link={'/posts/category/' + slug} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.inner}>
                <div className={styles.title_flex}>
                    <h3>最近の発言</h3>
                    <LinkButton title="全ての発言" type="1" link="/posts"/>
                </div>
                <PostList posts={posts} />
            </div>
        </section>
    )
}

