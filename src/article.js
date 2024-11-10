import {
    updateData,
    newId,
    addComments,
    getData,
    newArticle,
    addData
} from "./data.js";

import {
    isValidArticle,
    isValidArticleName,
    isValidContent,
    isValidSession,
    isValidSummary
} from "./utils/validations.js";

import {Status, Target} from "./const.js";


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

function getAuthorName(session) {  // to be replaced in future
    return parseInt(session);
}

/**
 * Add new article from user to database
 *
 * @param {Session} session - User's session used to add new article
 * @param {string} title - The new article's name
 * @param {string} summary - The new article's summary
 * @param {string} content - The new article's text content
 * @param {boolean} long - If this article is long
 * @param {number} price
 * @param {string[]} tags
 * @param {int} previousArticleId - Previous chapter's article's id
 * @returns return empty object if upload success
 */
export function articleUpload(session, title, summary, content, long, price,
    tags, previousArticleId) {

    validate(session, title, summary, content);

    if (isValidArticle(previousArticleId)) {
        let previous = getData(Target.article, previousArticleId);
        previous.nextChap = articleId;
        updateData(previous);
    }

    const articleId = newId(Target.article);
    const date = new Date();

    addData(newArticle(
        articleId,
        Status.public,  // change in future to allow the author to set the visibility when uploading the article
        title,
        summary,
        content,
        getAuthorName(session),
        date,
        date,
        -1,
        0,
        [],
        [],
        long,
        price,
        tags,
        [], // comments set to an empty array
        []
    ));

    const author = getData(Target.user, getAuthorName(session));
    author.publishedArticles.push(articleId);
    updateData(author);
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

    if ((!isValidArticle(nextArticle) && nextArticle >= 0) || !isValidArticle(targetArticleId)) {
        throw new Error("Invalid article Id.");
    }

    const article = getData(Target.article, targetArticleId);

    updateData(newArticle(
        targetArticleId,
        article.status,  // change in future to enable status change (e.g. from public to private or delete it)
        title,
        summary,
        content,
        article.author,
        article.initialCreateTime,
        new Date(),
        nextArticle,
        rating,
        [],
        [],
        long,
        price,
        tags,
        article.comments,
        article.annotations
    ));
    return {};
}

export function getArticleDetails(articleId) {
    return getData(Target.article, articleId);
}

/**
 *
 * @param {number[]} articleId the parent ids
 * @param {number} userId
 * @param {string} commentContent
 * @returns {Object} the comment
 */
export function addComment(articleId, userId, commentContent) {
    return addComments(articleId, userId, commentContent);
}
