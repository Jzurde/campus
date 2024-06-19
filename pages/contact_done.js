import Container from "@/components/container";
import ListHeader from "@/components/list_header";
import Meta from "@/components/meta";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ContactDone() {
    const router = useRouter();
    const [isDisplay, setIsDisplay] = useState('');
    useEffect(() => {
        if (router.isReady) {
            if (router.query.display === 'ok') { setIsDisplay(router.query.display); }
            else { router.push('/404'); }
        }
    },
        [router.isReady]
    );
    return (<> {isDisplay && (
        <Container>
            <Meta pageTitle="お問合せ完了" pageDesc="お問合せが完了しました"/>
            <ListHeader title="お問合せ" subtitle="お問合せ完了" />
            <p>お問合せが完了しました。<br />お問合せ確認メールを送信しておりますのでご確認ください。</p>
        </Container>
    )} </>);
}