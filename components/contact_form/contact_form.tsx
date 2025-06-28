'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from './contact_form.module.css';
import { faCheck, faPaperPlane, faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../container/container";
import ListHeader from "../list_header/list_header";
import LinkButton from "../link_button/link_button";
import { Noto_Sans_JP, Source_Code_Pro } from 'next/font/google'

const NotoSansJP = Noto_Sans_JP({
    weight: "600",
    subsets: ["latin"]
});

const SourceCodePro = Source_Code_Pro({
    weight: "600",
    subsets: ["latin"]
});

export default function ContactForm() {
    const router = useRouter();
    const goAfter = () => {
        router.push('/contact_done?display=ok')
    }

    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const messageRef = useRef<HTMLTextAreaElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)

    const [isName, setName] = useState(true) //trueでOK
    const [isEmail, setEmail] = useState(true)
    const [isMessage, setMessage] = useState(true)
    const [isConfirm, setConfirm] = useState(true)
    const [isSending, setSending] = useState(false)

    const nameClassname = isName ? `${styles.form_cell} ${styles.form_ok}` : `${styles.form_cell} ${styles.form_ng}`
    const emailClassname = isEmail ? `${styles.form_cell} ${styles.form_ok}` : `${styles.form_cell} ${styles.form_ng}`
    const messageClassname = isMessage ? `${styles.form_cell} ${styles.form_ok}` : `${styles.form_cell} ${styles.form_ng}`
    const confirmClassname = isConfirm ? `${styles.confirm} ${styles.confirm_ok}` : `${styles.confirm} ${styles.confirm_ng}`

    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const buttonIcon = isSending ? faHourglass : faPaperPlane

    const handleName = () => {
        let d_name = nameRef.current?.value
        if (!d_name) { setName(false) } else { setName(true) }
    }

    const handleEmail = () => {
        let d_email = emailRef.current?.value
        if (d_email && !pattern.test(d_email)) { setEmail(false) } else { setEmail(true) }
    }

    const handleMessage = () => {
        let d_message = messageRef.current?.value
        if (!d_message) { setMessage(false) } else { setMessage(true) }
    }

    const handleConfirm = () => {
        let d_confirm = confirmRef.current?.checked
        if (!d_confirm) { setConfirm(false) } else { setConfirm(true) }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleName()
        handleEmail()
        handleMessage()
        handleConfirm()

        let d_name = nameRef.current?.value
        let d_email = emailRef.current?.value
        let d_message = messageRef.current?.value
        let d_confirm = confirmRef.current?.checked

        if (!(d_name && d_email && d_message && d_confirm)) return

        let sendData = {
            data: {
                name: d_name,
                email: d_email,
                message: d_message,
            }
        }

        setSending(true)

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData)
        })

        if (response.ok) {
            goAfter()
        }
        else {
            const errorMessage = await response.text()
            alert(`Mail Sending Error. (${response.status}) ${errorMessage}`)
        }
    };
    return (
        <Container>
            {/* <Meta pageTitle="お問合せ" pageDesc="お問合せフォーム" /> */}
            <ListHeader title="お問合せ" subtitle="お問合せフォーム" />
            <p>お問い合わせは以下のフォームよりお願いいたします。<br />
                内容を確認後、折り返しご連絡させていただきます。</p>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={nameClassname}>
                    <label htmlFor="name">お名前</label><span className={styles.warning}>名前を入力してください</span>
                    <input type="text" id="name" className={NotoSansJP.className} placeholder="じゅーるで 太郎" ref={nameRef} onInput={() => handleName()} />
                </div>

                <div className={emailClassname}>
                    <label htmlFor="email">メールアドレス</label><span className={styles.warning}>メールアドレスを正しく入力してください</span>
                    <input type="email" id="email" className={SourceCodePro.className} placeholder="contact@jzurde.jp" ref={emailRef} onInput={() => handleEmail()} />
                </div>

                <div className={messageClassname}>
                    <label htmlFor="content">お問合せ内容</label><span className={styles.warning}>お問合せ内容を入力してください</span>
                    <textarea id="content" className={NotoSansJP.className} placeholder="お問い合わせ内容は何を書けばいいのかをお問合せします" ref={messageRef} onInput={() => handleMessage()}></textarea>
                </div>

                <div className={confirmClassname}>
                    <input type="checkbox" id="terms" className={styles.terms} ref={confirmRef} onInput={() => handleConfirm()} />
                    <label htmlFor="terms" className={styles.terms_label}>
                        <div className={styles.terms_check}><FontAwesomeIcon icon={faCheck} size="xs" /></div>
                        <LinkButton link="../terms" title="個人情報に関する声明" type={3} newTab />に同意します
                    </label>
                    <span className={styles.warning}>同意が必要です</span>
                </div>
                <div className={styles.form_submit}>
                    <label htmlFor="form_submit">送信する</label>
                    <button type="submit" id="form_submit" className="form_submit-deny" disabled={isSending}><FontAwesomeIcon icon={buttonIcon} /></button>
                </div>
            </form>
        </Container>
    )
}

export function ContactFormDone() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [isDisplay, setIsDisplay] = useState('');

    useEffect(() => {
        const display = searchParams?.get('display')
        if (display === 'ok') {
            setIsDisplay(display)
        } else {
            router.push('/404')
        }
    }, [searchParams, router])

    return (<> {isDisplay && (
        <Container>
            <ListHeader title="お問合せ" subtitle="お問合せ完了" />
            <p>お問合せが完了しました。<br />お問合せ確認メールを送信しておりますのでご確認ください。</p>
        </Container>
    )} </>);
}