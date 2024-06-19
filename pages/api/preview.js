import { client } from "@/lib/api"

export default async function preview(req, res){

    const {draftKey, contentId} = req.query

    const data = await client.get({
        endpoint: 'posts',
        contentId: contentId,
        queries: {draftKey}
    })

    if(!data) return res.status(401).json({message: 'Invalid slug'})

    res.setPreviewData({
        slug: data.id,
        draftKey: req.query.draftKey
    })
    res.writeHead(307, {Location: `/posts/${data.id}`})
    res.end('Preview mode enabled')
    
}