"use client"

import styles from './preview_banner.module.css'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import Container from '../container/container'

export default function PreviewBanner() {

    const router = useRouter()

    const exitPreviewMode = async () => {
        const res = await fetch('/api/exit-preview')
        if (res.ok) router.push('/')
    }

    return (
        <div className={styles.container}>
            <Container>
                <div className={styles.inner}>
                    <p>プレビューモードです</p>
                    <button className={styles.exit} onClick={() => exitPreviewMode()}>
                        <FontAwesomeIcon icon={faClose} />
                        <span>プレビューモードを閉じる</span>
                    </button>
                </div>
            </Container>
        </div>
    )
}