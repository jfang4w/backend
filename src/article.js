import {
    updateData,
    newId,
    addComments,
    getDataById,
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

import {Target} from "./const.js";
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

function calculateReadTime(content) {  // STUB!!
    return Math.ceil(content.length / 100)/10;
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
 * @param {number} previousArticleId - Previous chapter's article's id
 * @returns return empty object if upload success
 */
export async function articleUpload(session, title, summary, content, long, price,
    tags, previousArticleId) {

    validate(session, title, summary, content);

    const [validPreArticleId, articleId, authorId] = await solve(isValidArticle(previousArticleId), newId(Target.article), getAuthorId(session));
    const authorPromise = getDataById(Target.user, authorId);
    const date = new Date();

    if (validPreArticleId) {
        let previous = await getDataById(Target.article, previousArticleId);
        previous.next = articleId;
        await updateData(previous);
    }

    await addData(newArticle(
        articleId,
        authorId,
        "",
        title,
        summary,
        content,
        long,
        date,
        date,
        [],
        [],
        calculateReadTime(content),
        [],
        validPreArticleId? previousArticleId : -1,
        -1,
        price,
        tags,
    ));
    const author = await authorPromise;
    author.publications.push(articleId);
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
 * @param {boolean} isSeries
 * @param {number} price
 * @param {string[]} tags
 * @param {number} targetArticleId
 * @param {number} nextArticle - the id of the next article
 */
export async function articleUpdate(session, title, summary, content, isSeries, price, tags, targetArticleId, nextArticle) {
    validate(session, title, summary, content);

    const [validNextArticle, article] = await solve(isValidArticle(nextArticle), getDataById(Target.article, targetArticleId));

    if ((!validNextArticle && nextArticle >= 0) || article === null) {
        throw new Error("Invalid article Id.");
    }

    await updateData(newArticle(
        targetArticleId,
        article.author,
        article.cover,
        title,
        summary,
        content,
        isSeries,
        article.publishTime,
        new Date(),
        article.likes,
        article.dislikes,
        calculateReadTime(content),
        article.comments,
        article.previous,
        nextArticle,
        price,
        tags
    ));
    return {};
}

export async function getArticleDetails(articleId) {
    return await getDataById(Target.article, articleId);
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

export async function bookmark(articleId, userId) {
    const [article, user] = await solve(getDataById(Target.article, articleId), getDataById(Target.user, userId));
    if (!article) {
        throw new Error('Invalid article ID.');
    }
    if (!user) {
        throw new Error('Invalid user ID.');
    }

    const index = user.library.indexOf(articleId);
    if (index > -1) {
        user.library.splice(index, 1);
    } else {
        user.library.push(articleId);
    }
    await updateData(user);
    return {};
}