// app/api/exit-preview/route.ts
import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    // プレビューモードを無効にする
    (await
        // プレビューモードを無効にする
        draftMode()).disable();

    // ルートにリダイレクト
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'), {
        status: 307,
    });
}
