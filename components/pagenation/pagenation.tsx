import Link from "next/link"
import styles from './pagenation.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"
import React from "react"

export function Pagenation({
    currentPage = 0,
    totalPages = 0,
    slug = ""
}) {
    let arr = Array(totalPages).fill(0).map((v, i) => i + 1)
    {
        return (currentPage && totalPages && slug != "") &&
            <div className={styles.pagenation}>
                {currentPage > 1 && (
                    <PagenationArrows link={`/posts/${slug}/${currentPage - 1}`} />
                )}
                {
                    arr.map((index) =>
                        <PagenationButtons
                            link={`/posts/${slug}/${index}`}
                            isNow={index == currentPage}
                            key={index}
                        >{index}</PagenationButtons>)
                }
                {currentPage < totalPages && (
                    <PagenationArrows link={`/posts/${slug}/${currentPage + 1}`} isToNext />
                )}
            </div>
    }
}

export function PagenationButtons({
    children, link, isNow = false
}: {
    children: React.ReactNode;
    link: string;
    isNow?: boolean;
}) {
    return (
        (isNow) ?
            <div className={`${styles.button_now} ${styles.button_container}`}>
                {children}
            </div>
            : (
                <Link href={link}>
                    <div className={styles.button_container}>
                        {children}
                    </div>
                </Link>)
    )
}

export function PagenationArrows({
    isToNext = false, link
}: {
    isToNext?: boolean;
    link: string;
}) {
    return (
        <Link href={link}>
            <div className={(isToNext) ? styles.arrow_container_right : styles.arrow_container_left}>
                {(isToNext) ? (
                    <>
                        <span>次のページ</span>
                        <FontAwesomeIcon icon={faAnglesRight} />
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faAnglesLeft} />
                        <span>前のページ</span>
                    </>
                )}
            </div>
        </Link>
    )
}

