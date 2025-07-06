import { NextRequest } from "next/server";
import xss from 'xss';
import nodemailer from "nodemailer";
import * as EmailValidator from 'email-validator'
import { getSiteSettings } from "@/lib/cms-api";

export async function POST(req: NextRequest) {
    const requestBody = await req.json()
    const { data } = requestBody
    const { name, email, message } = data

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

    const siteSettings = (await getSiteSettings("contactForm")).contactForm
    const notifyEmail = siteSettings.notifyEmail
    const notifyFrom = siteSettings.hasOwnProperty('notifyFrom') ? siteSettings.notifyFrom : 'CAMPUSお問合せフォーム'
    const notifySubject = siteSettings.hasOwnProperty('notifySubject') ? siteSettings.notifySubject : '【CAMPUS】問合せがありました'
    const notifyDefaultMessage = `
        以下のお問合せがありました。
        <h4>名前</h4>
        <p>${validated_name}</p>
        <h4>メールアドレス</h4>
        <p>${validated_email}</p>
        <h4>問合せ内容</h4>
        <p>${validated_message}</p>
        `
    const notifyMessage = siteSettings.hasOwnProperty('notifyMessage') ? 
        siteSettings.notifyMessage.replaceAll("#name", validated_name)
        .replaceAll("#email", validated_email)
        .replaceAll("#message", validated_message)
        : notifyDefaultMessage

    const toHostMailData = {
        from: `${notifyFrom}<${process.env.MAIL_USER}>`,
        to: notifyEmail,
        subject: notifySubject,
        html: notifyMessage,
    };

    const confirmFrom = siteSettings.hasOwnProperty('confirmFrom') ? siteSettings.confirmFrom : 'CAMPUS | 人間の大学生のポートフォリオ'
    const confirmSubject = siteSettings.hasOwnProperty('confirmSubject') ? siteSettings.confirmSubject : '【CAMPUS】お問合せありがとうございます'
    const confirmDefaultMessage = `
    <h2 style="color: #444444;">お問合せありがとうございます</h2>
    <p>${validated_name}様</p>
    <p>この度は、お問合せいただきましてありがとうございます。<br>以下お問合せをお受けいたしました。</p>
    <h3 style="color: #444444;">お問合せ内容</h3>
    <h4 style="color: #444444; margin-bottom: 0;">ご氏名</h4>
    <p style="margin-top: 2px;">${validated_name}様 (${validated_email})</p>
    <h4 style="color: #444444; margin-bottom: 0;">お問合せ内容</h4>
    <p style="margin-top: 2px;">${validated_message}</p>
    <small>※1 - 本メールにお心あたりがございませんでしたら、破棄していただきますようお願いいたします。<br>
    ※2 - このメールは送信専用です。ご返信いただくことはできませんのでご注意ください。</small>
        `
    const confirmMessage = siteSettings.hasOwnProperty('confirmMessage') ? 
        siteSettings.confirmMessage.replaceAll("#name", validated_name)
        .replaceAll("#email", validated_email)
        .replaceAll("#message", validated_message)
        : confirmDefaultMessage

    const toCustomerMailData = {
        from: `${confirmFrom}<${process.env.MAIL_USER}>`,
        to: validated_email,
        subject: confirmSubject,
        html: confirmMessage
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