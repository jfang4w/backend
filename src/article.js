import {
    getData,
    setData
} from "./data.js";

import { 
    isValidArticle,
    isValidArticleName,
    isValidContent,
    isValidSession,
    isValidSummary
} from "./utils/validations.js";


/**
 * Add new article from user to data base
 *
 * @param {Session} session - User's session used to add new article
 * @param {string} name - The new article's name
 * @param {string} summary - The new article's summary
 * @param {string} content - The new article's text content
 * @param {integer} previousArticleId - Previous chapter's article's id
 * @returns {} return empty object if upload success
 */
export function articleUpload(session, name, summary, content, previousArticleId) {
    const data = getData();
    const id = data.articles.length;
    
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

    if (!isValidArticle(previousArticleId)) {
        throw new Error("Invalid article Id.");
    }
    
    articleId = data.articles.length; //need to change, if article is deleted repeated id will appear

    previousArticle = data.articles.find(article => article.id === previousArticleId);
    previousArticle.nextChap = articleId;
    const date = new Date();
    data.articles.push({
        id: articleId,
        content: content,
        summary: summary,
        author: getAuthorName(session),
        initialCreateTime: `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        lastEditTime: `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        nextChap: -1,
        comments: []
    });

    setData(data);
    return {};
}

/**
 * Add new article from user to data base
 *
 * @param {Session} session - User's session used to add new article
 * @param {string} name - The new article's name
 * @param {string} summary - The new article's summary
 * @param {string} content - The new article's text content
 * @returns {} return empty object if update success
 */
export function articleUpdate(session, name, summary, content, targetArticle, nextArticle) {
    const data = getData();
    const id = data.articles.length;
    
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

    if (!isValidArticle(nextArticle) || !isValidArticle(targetArticle)) {
        throw new Error("Invalid article Id.");
    }

    article = data.articles.find(article => article.id === targetArticle);
    
    article.content = content;
    article.summary = summary;
    article.author = getAuthorName(session);
    article.lastEditTime = `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`;
    article.nextChap = nextArticle;

    setData(data);
    return {};
}

export function getArticleDetails(articleId) {
    const data = getData();
    const article = data.articles.find(element => element.id === articleId);
    if (!article) {
        throw new Error('Article not found');
    }
    return article;
}

export function addComment(articleId, userId, commentContent) {
    const data = getData();
    const articleIndex = data.articles.findIndex(element => element.id === articleId);
    if (articleIndex === -1) {
        throw new Error('Article not found');
    }

    const newComment = {
        content: commentContent,
        author: userId,
        time: new Date().toISOString(),
        reply: []
    };

    data.articles[articleIndex].comments.push(newComment);
    setData(data);
    return newComment;
}
