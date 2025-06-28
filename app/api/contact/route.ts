import { NextRequest } from "next/server";
import xss from 'xss';
import nodemailer from "nodemailer";
import * as EmailValidator from 'email-validator'
import { getSiteSettings } from "@/lib/cms-api";

export async function POST(req: NextRequest) {
    const requestBody = await req.json()
    const { data } = requestBody
    const { name, email, message } = data
    const siteSettings = await getSiteSettings("email")
    const notifyEmail = siteSettings.email

    const email_trimmed = email.trim()
    if (!EmailValidator.validate(email_trimmed))
        return new Response('Invalid email address.', { status: 400 })

    const validated_email = xss(email_trimmed)
    if (validated_email === '')
        return new Response('Email is required', { status: 400 })

    const validated_name = xss(name)
    if (validated_name === '') return new Response('Name is required', { status: 400 })

    const validated_message = xss(message)
    if (validated_message === '')
        return new Response('Message is required', { status: 400 })

    const transporter = nodemailer.createTransport({
        host: "sv85.star.ne.jp",
        port: 465, //465
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }
    })
    const toHostMailData = {
        from: `じゅーるで通知<${process.env.MAIL_USER}>`,
        to: notifyEmail,
        subject: `【じゅーるで】お問合せがありました`,
        text: `${validated_message} send from ${validated_name}`,
        html: `
        以下のお問合せがありました。
        <h4>名前</h4>
        <p>${validated_name}</p>
        <h4>メールアドレス</h4>
        <p>${validated_email}</p>
        <h4>問合せ内容</h4>
        <p>${validated_message}</p>
        `,
    };
    const toCustomerMailData = {
        from: `じゅーるで自動送信アカウント<${process.env.MAIL_USER}>`,
        to: validated_email,
        subject: `【じゅーるで】お問合せありがとうございます`,
        text: `この度はじゅーるでポートフォリオサイト(https://jzurde.jp)よりお問合せいただきましてありがとうございます。
        以下お問合せをお受けいたしました。
        【お名前】: ${validated_name}【メールアドレス】: ${validated_email}【お問合せ内容】: ${validated_message}
        なお、本メールにお心あたりがございませんでしたら、無視してください。`,
        html: `
        <img src="https://mail.jzurde.jp/logo.png" width="180px">
    <h2 style="color: #444444;">お問合せありがとうございます</h2>
    <p>${validated_name}様</p>
    <p>この度は、<a href="https://jzurde.jp">じゅーるで</a>からお問合せいただきましてありがとうございます。<br>以下お問合せをお受けいたしました。</p>
    <h3 style="color: #444444;">お問合せ内容</h3>
    <h4 style="color: #444444; margin-bottom: 0;">ご氏名</h4>
    <p style="margin-top: 2px;">${validated_name}様 (${validated_email})</p>
    <h4 style="color: #444444; margin-bottom: 0;">お問合せ内容</h4>
    <p style="margin-top: 2px;">${validated_message}</p>
    <small>※1 - なお、本メールにお心あたりがございませんでしたら、破棄していただきますようお願いいたします。<br>
    ※2 - このメールは送信専用です。ご返信いただくことはできませんのでご注意ください。</small>
        `
    }

    try {
        await transporter.sendMail(toHostMailData);
        await transporter.sendMail(toCustomerMailData);
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }
    catch (error: any) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({
            success: false,
            message: error.message || "Unknown error"
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}