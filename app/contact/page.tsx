import { Metadata } from 'next';
import ContactForm from '@/components/contact_form/contact_form';
import Meta from '@/lib/meta';

export const metadata: Metadata = Meta({
    pageTitle: "お問い合わせフォーム",
    pageDescription: "CAMPUSのお問い合わせフォームです"
})

export default function Contact() {
    return <ContactForm />
}