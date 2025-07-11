import nodemailer from "nodemailer";

export default async function sendMail(req, res){
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT, //465
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        }
    })

    const toHostMailData = {
        from: `ブログサイト通知<${process.env.MAIL_USER}>`,
        to: process.env.NOTIFY_EMAIL,
        subject: `【ブログサイト】お問合せがありました`,
        text: `${req.body.message} send from ${req.body.name}`,
        html: `
        以下のお問合せがありました。
        <h4>名前</h4>
        <p>${req.body.name}</p>
        <h4>メールアドレス</h4>
        <p>${req.body.email}</p>
        <h4>問合せ内容</h4>
        <p>${req.body.message}</p>
        `,
    };

    const toCustomerMailData = {
        from: `ブログサイト自動送信アカウント<${process.env.MAIL_USER}>`,
        to: req.body.email,
        subject: `【ブログサイト】お問合せありがとうございます`,
        text: `この度はお問合せいただきましてありがとうございます。
        以下お問合せをお受けいたしました。
        【お名前】: ${req.body.name}【メールアドレス】: ${req.body.email}【お問合せ内容】: ${req.body.message}
        なお、本メールにお心あたりがございませんでしたら、無視してください。`,
        html: `
    <h2 style="color: #444444;">お問合せありがとうございます</h2>
    <p>${req.body.name}様</p>
    <p>この度は、<a href="https://xxxx.xx">ブログサイト</a>からお問合せいただきましてありがとうございます。<br>以下お問合せをお受けいたしました。</p>
    <h3 style="color: #444444;">お問合せ内容</h3>
    <h4 style="color: #444444; margin-bottom: 0;">ご氏名</h4>
    <p style="margin-top: 2px;">${req.body.name}様 (${req.body.email})</p>
    <h4 style="color: #444444; margin-bottom: 0;">お問合せ内容</h4>
    <p style="margin-top: 2px;">${req.body.message}</p>
    <small>※1 - 本メールにお心あたりがございませんでしたら、破棄していただきますようお願いいたします。<br>
    ※2 - このメールは送信専用です。ご返信いただくことはできませんのでご注意ください。</small>
        `
    }

    await transporter.sendMail(toHostMailData);
    await transporter.sendMail(toCustomerMailData);

    res.send("mail-send_successful")
}