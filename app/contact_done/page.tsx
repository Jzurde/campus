"use client"

import Container from "@/components/container/container";
import ListHeader from "@/components/list_header/list_header";
import Meta from "@/lib/meta";
import { Metadata } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const metadata: Metadata = Meta({
    pageTitle: "お問合せ完了",
    pageDescription: "お問合せが完了しました"
})

export default function ContactDone() {
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