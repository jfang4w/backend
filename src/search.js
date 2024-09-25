import {
    getData
} from "./data.js";

export function search(searchTerm) {
    const data = getData();
    let result = data.article.filter((e) => e.content.includes(searchTerm));
    result = result.foreach((e) => { return { content: e.content, author: e.author, initialCreateTime: e.initialCreateTime }});
    return result;
}
