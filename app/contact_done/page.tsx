import { ContactFormDone } from "@/components/contact_form/contact_form";
import Container from "@/components/container/container";
import ListHeader from "@/components/list_header/list_header";
import { getSiteSettings } from "@/lib/cms-api";
import { getIfContactFormValid } from "@/lib/transporter";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: '...',
    description: '...',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noarchive: true,
        noimageindex: true,
        nosnippet: true,
    },
};

export default async function ContactDone() {
    const settings = (await getSiteSettings("contactPage")).contactPage
    const message_html = settings.hasOwnProperty('done_message') ? settings.done_message : "<p>お問合せが完了しました。<br />お問合せ確認メールを送信しておりますのでご確認ください。</p>"

    if (!(await getIfContactFormValid())) {
        notFound()
    }

    return (
        <Container>
            <ListHeader title="お問合せ" subtitle="お問合せ完了" />
            <ContactFormDone message_html={message_html} />
        </Container>
    )
}