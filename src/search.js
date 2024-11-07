import {
    // getData,
    runFunction
} from "./data.js";
import {Target} from "./const.js";

export function search(searchTerm) {
    // const data = getData();
    // let result = data.article.filter((e) => e.content.includes(searchTerm));
    let result = runFunction(Target.article, function (articles) {
        articles.filter((e) => e.content.includes(searchTerm));
    });
    result = result.foreach((e) => { return { content: e.content, author: e.author, initialCreateTime: e.initialCreateTime }});
    return result;
}
