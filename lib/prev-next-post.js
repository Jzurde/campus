import { getImageBuffer } from "./getImageBuffer"
import { getPlaiceholder } from "plaiceholder"

export async function prevNextPost(allSlugs, currentSlug) {
    const numberOfPosts = allSlugs.length

    const index = allSlugs.findIndex(
        ({ slug }) => slug === currentSlug,
    )

    const prevPost = index + 1 === numberOfPosts ? { isValid: false } : await parseIntoFormat(allSlugs[index + 1])
    const nextPost = index === 0 ? { isValid: false } : await parseIntoFormat(allSlugs[index - 1])

    return [prevPost, nextPost]
}

async function parseIntoFormat(this_slug) {
    // if(!this_slug.hasOwnProperty('eyecatch')){
    //     this_slug.eyecatch = eyecatchLocal
    // }

    // // if (!this_slug.hasOwnProperty('eyecatch')) {
    // //     let str_categories = ""
    // //     this_slug.categories.map((value) => {
    // //         str_categories += value.name + ','
    // //     })
    // //     this_slug.eyecatch = { url: `${process.env.APP_URL}/api/log?title=${this_slug.title}&categories=${str_categories.slice(0, -1)}` }
    // // }

    // const imageBuffer = await getImageBuffer(this_slug.eyecatch.url)
    // const { base64 } = await getPlaiceholder(imageBuffer)
    // this_slug.eyecatch.blurDataURL = base64

    if (!this_slug.hasOwnProperty('eyecatch')) {
        let str_categories = ""
        this_slug.categories.map((value) => {
            str_categories += value.name + ','
        })
        this_slug.eyecatch = {
            url: `${process.env.APP_URL}/api/log?title=${this_slug.title}&categories=${str_categories.slice(0, -1)}`,
            width: 1200,
            height: 630,
        }
    }
    // const { base64 } = await getPlaiceholder(this_slug.eyecatch.url)
    // this_slug.eyecatch.blurDataURL = base64
    try {
        const imageBuffer = await getImageBuffer(this_slug.eyecatch.url)
        const { base64 } = await getPlaiceholder(imageBuffer)
        this_slug.eyecatch.blurDataURL = base64
    }
    catch (e) {
        console.log('===Plaiceholder===')
        console.log(e)
    }

    return ({
        this_link: { title: this_slug.title, link: "/posts/" + this_slug.slug, },
        link_links: this_slug.categories,
        eyecatch: this_slug.eyecatch,
        isValid: true,
    })
}

// const prevPost = index + 1 === numberOfPosts ? {title: '', slug: ''} : allSlugs[index + 1]
// const nextPost = index === 0 ? {title: '', slug: ''} : allSlugs[index - 1]