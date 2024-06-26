import Container from "@/components/container";
import LinkButton from "@/components/link";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";
import { siteData } from "@/lib/constant";
import styles from '@/styles/contact.module.css';
import { faCheck, faPaperPlane, faHourglass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Noto_Sans_JP, Source_Code_Pro } from 'next/font/google'
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const NotoSansJP = Noto_Sans_JP({
  weight: "600",
  subsets: ["latin"]
});

const SourceCodePro = Source_Code_Pro({
  weight: "600",
  subsets: ["latin"]
});

export default function Contact() {

  const router = useRouter();
  const goAfter = () => {
    router.push({
      pathname: '/contact_done',
      query: { display: 'ok' }
    },
      'contact_done'
    )
  }

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const confirmRef = useRef(null)

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
    if (!pattern.test(d_email)) { setEmail(false) } else { setEmail(true) }
  }

  const handleMessage = () => {
    let d_message = messageRef.current?.value
    if (!d_message) { setMessage(false) } else { setMessage(true) }
  }

  const handleConfirm = () => {
    let d_confirm = confirmRef.current?.checked
    if (!d_confirm) { setConfirm(false) } else { setConfirm(true) }
  }

  const handleSubmit = async (e) => {
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

    let data = {
      name: d_name,
      email: d_email,
      message: d_message,
    }

    setSending(true)

    await fetch("api/contact", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        goAfter()
      }
    })
  };
  return (
    <Container>
      <Meta pageTitle="お問合せ" pageDesc="お問合せフォーム"/>
      <ListHeader title="お問合せ" subtitle="お問合せフォーム" />
      <p>お問い合わせは以下のフォームよりお願いいたします。<br />
        内容を確認後、折り返しご連絡させていただきます。</p>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={nameClassname}>
          <label htmlFor="name">お名前</label><span className={styles.warning}>名前を入力してください</span>
          <input type="text" id="name" className={NotoSansJP.className} placeholder={siteData.contactForms.placeHolders.name} ref={nameRef} onInput={() => handleName()} />
        </div>

        <div className={emailClassname}>
          <label htmlFor="email">メールアドレス</label><span className={styles.warning}>メールアドレスを正しく入力してください</span>
          <input type="email" id="email" className={SourceCodePro.className} placeholder={siteData.contactForms.placeHolders.email} ref={emailRef} onInput={() => handleEmail()} />
        </div>

        <div className={messageClassname}>
          <label htmlFor="content">お問合せ内容</label><span className={styles.warning}>お問合せ内容を入力してください</span>
          <textarea id="content" className={NotoSansJP.className} placeholder={siteData.contactForms.placeHolders.message} ref={messageRef} onInput={() => handleMessage()}></textarea>
        </div>

        <div className={confirmClassname}>
          <input type="checkbox" id="terms" className={styles.terms} ref={confirmRef} onInput={() => handleConfirm()} />
          <label htmlFor="terms" className={styles.terms_label}>
            <div className={styles.terms_check}><FontAwesomeIcon icon={faCheck} size="xs" /></div>
            <LinkButton link="/terms/" title="個人情報に関する声明" type="3" newTab />に同意します
          </label>
          <span className={styles.warning}>同意が必要です</span>
        </div>
        <div className={styles.form_submit}>
          <label htmlFor="form_submit">送信する</label>
          <button type="submit" id="form_submit" class="form_submit-deny" disabled={isSending}><FontAwesomeIcon icon={buttonIcon} /></button>
        </div>
      </form>
    </Container>
  )
}