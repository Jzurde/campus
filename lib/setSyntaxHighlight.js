import { load } from "cheerio";
import hljs from "highlight.js";

export function returnSyntaxHighlight(content) {
    const $ = load(content, null, false);

    $("div[data-filename]").each((_, elm) => {
        $(elm).prepend(`<span>${$(elm).attr("data-filename")}</span>`);
    });

    $("pre code").each((_, elm) => {
        const language = $(elm).attr("class") || "";
        let result = ""

        if (language == "") {
            result = hljs.highlightAuto($(elm).text());
        } 
        else {
            result = hljs.highlight($(elm).text(), {
                language: language.replace("language-", ""),
            });
        }
        $(elm).html(result.value);
        $(elm).addClass("hljs");
    });

    return $.html();
}