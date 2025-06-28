import { client } from "@/lib/cms-api"

export default async function preview(req, res) {

    const { draftKey, contentId } = req.query

    const data = await client.get({
        endpoint: 'posts',
        contentId: contentId,
        queries: { draftKey }
    })

    if (!data) return res.status(401).json({ message: 'Invalid slug' })

    res.setHeader('Set-Cookie', [
        `draftKey=${draftKey}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`,
        `draftMode=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`
    ]);
    res.setPreviewData({
        slug: data.id,
        draftKey: req.query.draftKey
    })
    // res.writeHead(307, { Location: `/posts/${data.id}` })
    // res.end('Preview mode enabled')

    res.end(`
        <script>
            window.location.href = "/posts/${data.id}";
        </script>
    `);

}