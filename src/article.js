import {
    updateData,
    newId,
    addPublishedArticles,
    addComments,
    getData,
    Articles,
    addData
} from "./data.js";

import { 
    isValidArticle,
    isValidArticleName,
    isValidContent,
    isValidSession,
    isValidSummary
} from "./utils/validations.js";

import {By, Target} from "./const.js";


function validate(session, name, summary, content) {
    if (!isValidSession(session)) {
        throw new Error('Invalid user session.');
    }

    if (!isValidArticleName(name)) {
        throw new Error('Invalid article name.');
    }

    if (!isValidSummary(summary)) {
        throw new Error("Invalid article summary.");
    }

    if (!isValidContent(content)) {
        throw new Error("Invalid article content.");
    }
    return true;
}

/**
 * Add new article from user to database
 *
 * @param {Session} session - User's session used to add new article
 * @param {string} title - The new article's name
 * @param {string} summary - The new article's summary
 * @param {string} content - The new article's text content
 * @param {boolean} long
 * @param {number} price
 * @param {string[]} tags
 * @param {int} previousArticleId - Previous chapter's article's id
 * @returns return empty object if upload success
 */
export function articleUpload({session, title, summary, content, long, price, tags, previousArticleId}) {
    validate(session, title, summary, content);

    const articleId = newId(Target.article);
    const date = new Date();

    if (isValidArticle(previousArticleId)) {
        let previous = getData(Target.article, By.id, previousArticleId);
        previous.nextChap= articleId;
        updateData(previous);
    }

    function getAuthorName(session) {
        return session;  // to be replaced
    }

    addData(new Articles(
        articleId,
        title,
        summary,
        content,
        getAuthorName(session),
        date,
        date,
        -1,
        0,
        long,
        price,
        tags,
        [] // comments set to an empty array
    ));

    addPublishedArticles(getAuthorName(session), articleId);
    return {};
}

/**
 * Add new article from user to database
 *
 * @param {Session} session - User's session used to add new article
 * @param {string} title - The new article's name
 * @param {string} summary - The new article's summary
 * @param {string} content - The new article's text content
 * @param {number} rating
 * @param {boolean} long
 * @param {number} price
 * @param {string[]} tags
 * @param {number} targetArticleId
 * @param {number} nextArticle - the id of the next article
 */
export function articleUpdate(session, title, summary, content, rating, long, price, tags, targetArticleId, nextArticle) {
    validate(session, title, summary, content);

    if (!isValidArticle(nextArticle) || !isValidArticle(targetArticleId)) {
        throw new Error("Invalid article Id.");
    }

    const article = getData(Target.article, By.id, targetArticleId);

    updateData(new Articles(
        targetArticleId,
        title,
        summary,
        content,
        article.author,
        article.initialCreateTime,
        new Date(),
        nextArticle,
        rating,
        long,
        price,
        tags,
        article.comments
    ));
    return {};
}

export function getArticleDetails(articleId) {
    return getData(Target.article, By.id, articleId);
}


/**
 * 
 * @param {number[]} parentIds the parent ids (i.e. [<article id>, <parent comments/replies ids>])
 * @param {number} userId
 * @param {string} commentContent
 * @returns {{author: *, hate: *, time: *, reply: [*], content: *, liked: *}}
 */
export function addComment(parentIds, userId, commentContent) {
    return addComments(userId, parentIds, commentContent);
}
