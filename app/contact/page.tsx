import ContactForm from '@/components/contact_form/contact_form';
import Meta from '@/lib/meta';
import { getSiteSettings } from '@/lib/cms-api';
import { getIfContactFormValid } from '@/lib/transporter';
import { notFound } from 'next/navigation';

export async function generateMetadata() {
    return Meta({
        pageTitle: "お問い合わせフォーム",
        pageDescription: "CAMPUSのお問い合わせフォームです"
    })
}

export default async function Contact() {

    const settings = (await getSiteSettings("contactPage")).contactPage
    const description_html = settings.hasOwnProperty('description') ? settings.description : "<p>お問合せフォームは以下です。<br>内容を確認の上、担当者より折り返しご連絡させていただきます。</p>"
    const name_plaiceholder = settings.hasOwnProperty('name_plaiceholder') ? settings.name_plaiceholder : "お名前"
    const email_plaiceholder = settings.hasOwnProperty('email_plaiceholder') ? settings.email_plaiceholder : "address@email.com"
    const message_plaiceholder = settings.hasOwnProperty('message_plaiceholder') ? settings.message_plaiceholder : "お問い合わせ内容"

    if (!getIfContactFormValid()) {
        notFound()
    }

    return (
        <ContactForm
            description_html={description_html}
            name_plaiceholder={name_plaiceholder}
            email_plaiceholder={email_plaiceholder}
            message_plaiceholder={message_plaiceholder}
        />
    )
}