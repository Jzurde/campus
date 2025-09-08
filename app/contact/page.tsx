import ContactForm from '@/components/contact_form/contact_form';
import Meta from '@/lib/meta';
import { getSiteSettings } from '@/lib/cms-api';
import { getIfContactFormValid } from '@/lib/transporter';
import { notFound } from 'next/navigation';
import Container from '@/components/container/container';
import ConvertBody from '@/components/convert_body/convert_body';
import ListHeader from '@/components/list_header/list_header';
import PostBody from '@/components/post_body/post_body';
import { Suspense } from 'react';

export async function generateMetadata() {
    const siteSettings = await getSiteSettings("siteTitle") || {}
    const siteTitle = siteSettings.siteTitle ?? "#サイトタイトル"
    return Meta({
        pageTitle: "お問い合わせフォーム",
        pageDescription: `${siteTitle}のお問い合わせフォームです`
    })
}

export default async function Contact() {

    const siteSettings = await getSiteSettings("contactPage") || {}
    const contactSettings = siteSettings.contactPage || {}

    const description_html = contactSettings.description ?? "<p>お問合せフォームは以下です。<br>内容を確認の上、担当者より折り返しご連絡させていただきます。</p>"
    const name_plaiceholder = contactSettings.name_plaiceholder ?? "お名前"
    const email_plaiceholder = contactSettings.email_plaiceholder ?? "address@email.com"
    const message_plaiceholder = contactSettings.message_plaiceholder ?? "お問い合わせ内容"

    if (!(await getIfContactFormValid())) {
        notFound()
    }

    return (
        <Container>
            {/* <Meta pageTitle="お問合せ" pageDesc="お問合せフォーム" /> */}
            <ListHeader title="お問合せ" subtitle="お問合せフォーム" />
            <PostBody ignoreMarginBottom={true}>
                <ConvertBody contentHTML={description_html} />
            </PostBody>
            <Suspense fallback={<p>読み込み中...</p>}>
                <ContactForm
                    name_plaiceholder={name_plaiceholder}
                    email_plaiceholder={email_plaiceholder}
                    message_plaiceholder={message_plaiceholder}
                />
            </Suspense>
        </Container>
    )
}