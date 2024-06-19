import path from "node:path";
import fs from "node:fs/promises";

export async function getImageBuffer(src) {
    // ローカルの画像の場合はパスにpublicを付与
    if (src.startsWith('http')) {
        const res = await fetch(src)
        return await Buffer.from(await res.arrayBuffer())
    } else {
        return await fs.readFile(path.join("./public", src));
    }
};