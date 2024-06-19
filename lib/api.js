import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN,
    apiKey: process.env.API_KEY
})

export async function getPostBySlug(slug) {
    try {
        const post = await client.get({
            endpoint: 'posts',
            queries: {filters: `slug[equals]${slug}`},
        })
        return post.contents[0]
    }
    catch (e) {
        console.log('--getPostBySlug--')
        console.log(e)
    }
}

export async function getPostByID(contentId, draftKey){
    try{
        const post = await client.get({
            endpoint: 'posts',
            contentId: contentId,
            queries: draftKey
        })
        console.log('====================================0000000000000000000==============')
        console.log(post)
        return post
    }
    catch (e){
        console.log('--getPostById--')
        console.log(e)
    }
}

export async function getWorkBySlug(slug) {
    try {
        const work = await client.get({
            endpoint: 'works',
            queries: { filters: `slug[equals]${slug}` },
        })
        return work.contents[0]
    }
    catch (e) {
        console.log('--getWorkBySlug--')
        console.log(e)
    }
}

export async function getAllSlugs(needDetail = false, limit = 100) {
    try {
        const fieldType = (needDetail) ? "title,slug,categories,eyecatch" : "title,slug"
        const slugs = await client.get({
            endpoint: 'posts',
            queries: { fields: fieldType, orders: '-publishDate', limit: limit },
        })
        return slugs.contents
    }
    catch (e) {
        console.log('--getAllSlugs---')
        console.log(e)
    }
}

export async function getAllWorksSlug(limit = 100) {
    try {
        const fieldType = "title,slug,catchphrase,eyecatch"
        const slugs = await client.get({
            endpoint: 'works',
            queries: { fields: fieldType, orders: '-publishDate', limit: limit },
        })
        return slugs.contents
    }
    catch (e) {
        console.log('--getAllWorksSlug---')
        console.log(e)
    }
}

export async function getCategories(all = false, limit = 100) {
    try {
        const filters = (all) ? "" : 'is_current[equals]true'
        const categories = await client.get({
            endpoint: 'post_categories',
            queries: {
                fields: ('name,id,slug'),
                limit: limit,
                filters: filters,
            },
        })
        return categories.contents
    }
    catch(e){
        console.log('===getCategories===')
        console.log(e)
    }
}

export async function getAllPostsByCategory(categoryID, limit=100){
    try{
        const posts = await client.get({
            endpoint: 'posts',
            queries: {
                filters: `categories[contains]${categoryID}`,
                fields: 'title,slug,categories,eyecatch',
                orders: '-publishDate',
                limit, limit,
            },
        })
        return posts.contents
    }
    catch(e){
        console.log('==getAllPostsByCategory==')
        console.log(e)
    }
}