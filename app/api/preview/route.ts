// app/api/preview/route.ts
import { client } from "@/lib/cms-api";
import { NextResponse } from "next/server";
import { cookies, draftMode } from "next/headers";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const draftKey = searchParams.get("draftKey");
    const contentId = searchParams.get("contentId");

    if (!draftKey || !contentId) {
        return NextResponse.json({ message: "Missing query parameters" }, { status: 400 });
    }

    let data;
    try {
        data = await client.get({
            endpoint: "posts",
            contentId,
            queries: { draftKey }
        });
    } catch (e) {
        return NextResponse.json({ message: "Invalid slug" }, { status: 401 });
    }

    (await draftMode()).enable();

    (await cookies()).set("draftKey", draftKey, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    const response = NextResponse.redirect(new URL(`/posts/${data.id}`, req.url), {
        status: 307,
    });

    return response;
}
