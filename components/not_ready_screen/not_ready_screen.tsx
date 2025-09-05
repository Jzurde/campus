"use client"

import Image from 'next/image'
import styles from './note_ready_screen.module.css'
import { Bungee } from 'next/font/google';
import { FunctionButton } from '../link_button/link_button';
import { useEffect, useState } from 'react';

const logoFontInstance = Bungee({ subsets: ['latin'], weight: '400' })

export default function NotReadyScreen() {

    const [visibility, visibilityChange] = useState(true)
    const closeWindow = () => {
        visibilityChange(false)
    }

    useEffect(() => {
        if (visibility) {
            document.body.style.position = "fixed";
            document.body.style.top = "0";
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.overflow = "hidden";

            return () => {
                // スタイルを戻す
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.overflow = "";
            };
        }
    }, [visibility]);

    return (
        <>
            {
                (visibility) && <div className={styles.wrapper}>
                    < div className={styles.container} >
                        <div className={styles.eyecatch}>
                            <Image
                                src="/profile-human_image/person1.png"
                                alt='people'
                                width="50"
                                height="50" />
                            <Image
                                src="/profile-human_image/person2.png"
                                alt='people'
                                width="50"
                                height="50" />
                            <Image
                                src="/profile-human_image/person5.png"
                                alt='people'
                                width="50"
                                height="50" />
                            <Image
                                src="/profile-human_image/person3.png"
                                alt='people'
                                width="50"
                                height="50" />
                        </div>
                        <h1 className={`${logoFontInstance.className} ${styles.header}`}>Hi, but...<br />We are not ready!</h1>
                        <h3>このサイトは準備中です</h3>
                        <p>サイトを公開するための初期設定を待っています。</p>
                        <div className={styles.message_box}>
                            <p>あなたがサイトの持ち主ですか?<br />
                                プレビューからサイトの現状を確認しましょう。</p>
                            <FunctionButton title="サイトを表示する" onClick={closeWindow} />
                        </div>
                    </div >
                </div>
            }

        </>

    )
}