import { ContactFormDone } from "@/components/contact_form/contact_form";
import Meta from "@/lib/meta";
import { Metadata } from "next";

export const metadata: Metadata = Meta({
    pageTitle: "お問合せ完了",
    pageDescription: "お問合せが完了しました"
})

export default function ContactDone() {
    return <ContactFormDone />
}