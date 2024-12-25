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
import {solve} from "./utils/asyncUtils.js";


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

async function getAuthorId(session) {  // to be replaced in future
    return parseInt(session);  // STUB!
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
export async function articleUpload(session, title, summary, content, long, price,
    tags, previousArticleId) {

    validate(session, title, summary, content);

    const [validPreArticleId, articleId, authorId] = await solve(isValidArticle(previousArticleId), newId(Target.article), getAuthorId(session));
    const authorPromise = getData(Target.user, authorId);
    const date = new Date();

    if (validPreArticleId) {
        let previous = await getData(Target.article, previousArticleId);
        previous.nextChap = articleId;
        await updateData(previous);
    }

    await addData(newArticle(
        articleId,
        Status.public,  // change in future to allow the author to set the visibility when uploading the article
        title,
        summary,
        content,
        authorId,
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
    const author = await authorPromise;
    author.publishedArticles.push(articleId);
    await updateData(author);
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
export async function articleUpdate(session, title, summary, content, rating, long, price, tags, targetArticleId, nextArticle) {
    validate(session, title, summary, content);

    const [validNextArticle, article] = await solve(isValidArticle(nextArticle), getData(Target.article, targetArticleId));

    if ((!validNextArticle && nextArticle >= 0) || article === null) {
        throw new Error("Invalid article Id.");
    }

    await updateData(newArticle(
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

export async function getArticleDetails(articleId) {
    return await getData(Target.article, articleId);
}

/**
 *
 * @param {number[]} articleId the parent ids
 * @param {number} userId
 * @param {string} commentContent
 * @returns {Object} the comment
 */
export async function addComment(articleId, userId, commentContent) {
    return await addComments(articleId, userId, commentContent);
}
