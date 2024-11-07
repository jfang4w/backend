import {Target} from './const.js';

/**
 * Creates a deep copy of the target.
 * @param {Object} target - The array (or object) to be copied deeply.
 * @returns {Object} A new array that is a deep copy of the target.
 */
function deepCopy(target) {
    return JSON.parse(JSON.stringify(target));
}

// Previously users

/**
 * Represents a user account.
 *
 * @param {number} id - The unique ID of the user.
 * @param {number} status - The status code of the user.
 * @param {number[]} following - The id of the user's following accounts
 * @param {number[]} followers - The id of the user's followers' accounts
 * @param {{String: String} | {}} nicknames - {id: this user's nickname to the id}
 * @param {number} likesGot - The total number of likes got by the user
 * @param {number[]} likes - The id of articles user liked.
 * @param {number[]} dislikes - The id of articles user disliked.
 * @param {string} username - The user's username
 * @param {string} nameFirst - The user's first name.
 * @param {string} nameLast - The user's last name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {number} passwordAttempt - The number of password attempts made.
 * @param {Date} accountCreateDate - The date the account was created.
 * @param {number[]} publishedArticles - An array of published article IDs.
 * @param {number[]} activeSessions - An array of active session IDs.
 * @param {number} revenue - The writer's revenue from subscription.
 * @param {number} balance - The user's balance.
 * @param {number} coins - The number of coins to redeem access of paid articles.
 * @param {number[]} unlockedArticles - The paid articles that the user has access to.
 * @param {number[]} roomIn - The rooms that the user is in.
 * @param {number[]} roomCreated - The rooms that the user created.
 * @param {number[]} subscription - (if non-negative) The ids of users that this user has subscribed; (if negative) The subscription plans (in the future)
 * @param {number[]} subscribers - The ids of users who subscribed this user.
 */
export function newUser(id, status, following, followers, nicknames, likesGot, 
    likes, dislikes, username, nameFirst, nameLast, email, password,
    passwordAttempt, accountCreateDate, publishedArticles, activeSessions, revenue,
    balance, coins, unlockedArticles, roomIn, roomCreated,
    subscription, subscribers) {
    
    return {
        _type: 'user',
        id: id,
        status: status,
        following: following,
        followers: followers,
        nicknames: nicknames,
        likesGot: likesGot,
        likes: likes,
        dislikes: dislikes,
        username: username,
        nameFirst: nameFirst,
        nameLast: nameLast,
        email: email,
        password: password,
        passwordAttempt: passwordAttempt,
        accountCreateDate: accountCreateDate,
        publishedArticles: publishedArticles,
        activeSessions: activeSessions,
        revenue: revenue,
        balance: balance,
        coins: coins,
        unlockedArticles: unlockedArticles,
        roomIn: roomIn,
        roomCreated: roomCreated,
        subscription: subscription,
        subscribers: subscribers
    };
}

// Previously articles

/**
 * Parameters are the same as Replies.
 *
 * @param {number[]} id - [<article id>, <comment id>]
 * @param {string} content - The content of the reply.
 * @param {number} author - The ID of the author.
 * @param {number[]} likes - The id of users who like the reply.
 * @param {number[]} dislikes - The id of users who hate the reply.
 * @param {Date} time - The time the reply was made.
 * @param {Object[]} reply - The reply.
 */
export function newComment(id, content, author, likes, dislikes, time, reply) {
    return {
        _type: 'comment',
        id: id,
        content: content,
        author: author,
        likes: likes,
        dislikes: dislikes,
        time: time,
        reply: reply,
        isAuthor: users[author].id === articles[id[0]].author,
        isCommenter: id.length < 3 ? true : users[author].id === articles[id[0]].comments[id[1]].author
    };
}

/**
 * Creates a new chapter.
 *
 * @param {number} id - The chapter ID.
 * @param {number} status - The status code.
 * @param {string} title - The title of the chapter.
 * @param {string} summary - A brief summary of the chapter.
 * @param {string} content - The content of the chapter (HTML formatted).
 * @param {number} author - The ID of the author.
 * @param {Date} initialCreateTime - The time when the chapter was initially created.
 * @param {Date} lastEditTime - The time when the chapter was last edited.
 * @param {number} nextChap - The ID of the next chapter.
 * @param {number} rating - The rating of the chapter.
 * @param {number[]} likes - The id of users who like this article.
 * @param {number[]} dislikes - The id of users who dislike this article.
 * @param {boolean} long - Indicates if the chapter is long.
 * @param {number} price - The price of the chapter.
 * @param {string[]} tags - An array of tags associated with the chapter.
 * @param {Object[]} comments - An array of comments on the chapter.
 */
export function newArticle(id, status, title, summary, content, author, 
    initialCreateTime, lastEditTime, nextChap, rating, likes, dislikes,
    long, price, tags, comments) {
    
    return {
        _type: 'article',
        id: id,
        status: status,
        title: title,
        summary: summary,
        content: content,
        author: author,
        initialCreateTime: initialCreateTime,
        lastEditTime: lastEditTime,
        nextChap: nextChap,
        rating: rating,
        likes: likes,
        dislikes: dislikes,
        long: long,
        price: price,
        tags: tags,
        comments: comments
    };
}

// Previously dm

/**
 * Sends a message.
 *
 * @param {number} author - The ID of the message sender.
 * @param {Object|null} quote - Quoting a previous message.
 * @param {string} message - The content of the message.
 * @param {Date} time - The time the message was sent.
 */
export function newMessage(author, quote, message, time) {
    return {
        _type: 'message',
        author: author,
        quote: quote,
        message: message,
        time: time
    };
}

/**
 *
 * @param {number} id room id
 * @param {number[]} uid list of ids of all users in this room
 * @param {Object} nicknames Key: the id of a user; Value: the nickname in this room
 * @param {string} roomName
 * @param {number} status
 * @param {Object[]} message
 */
export function newRoom(id, uid, nicknames, roomName, status, message) {
    return {
        _type: 'room',
        id: id,
        uid: uid,
        nicknames: nicknames,
        roomName: roomName,
        status: status,
        message: message
    };
}

/**
 *
 * @param {number} id - the image id
 * @param {number} author - the id of image uploader
 * @param {string} url - the url of the image
 * @param {string} alt - Alt text
 * @param status
 */
export function newImage(id, author, url, alt, status) {
    return {
        _type: 'image',
        id: id,
        author: author,
        url: url,
        alt: alt,
        status: status
    };
}

/**
 *
 * @param {number} id - the annotation's id
 * @param {number} articleId - the article's id
 * @param {number} userId - the annotator's id
 * @param {number} start - the position of the start character of annotation
 * @param {number} end - the position of the last character of annotation
 * @param {string} annotation - the annotation text
 * @param {number[]} likes - the ids of users who likes this annotation
 * @param {number} status - the status of the annotation (e.g. public, private, deleted)
 */
export function newAnnotation(id, articleId, userId, start, end, annotation, likes, status) {
    return {
        _type: 'annotation',
        id: id,
        articleId: articleId,
        userId: userId,
        start: start,
        end: end,
        annotation: annotation,
        likes: likes,
        status: status
    };
}

let users = [], articles = [], rooms = [];

/**
 *
 * @param {number|Object} type
 * @returns {Object[]}
 */
function getVariable(type) {
    if (typeof type === 'object') {
        switch (type._type) {
            case 'user':
                return users;
            case 'article':
                return articles;
            case 'room':
                return rooms;
            default:
                throw new Error("Unknown type " + type._type);
        }
    }

    switch (type) {
        case Target.user:
            return users;
        case Target.article:
            return articles;
        case Target.room:
            return rooms;
        default:
            throw new Error(`Unknown type ${type}`);
    }
}

/**
 *
 * @param {number} target what data is getting (users/articles/rooms)
 * @param {number} id the value of id
 * @return {Object}
 */
export function getData(target, id) {
    const data = getVariable(target);
    return deepCopy(data[id]);  // clone to avoid direct change in the database
}

/**
 *
 * @param {number} target what data is getting (users/articles/rooms)
 * @param {number} id the value of id
 * @param {...string} elements the elements required
 * @returns {{}}
 */
export function getPartialData(target, id, ...elements) {
    let obj = {};
    const variable = getData(target, id);
    elements.forEach(param => obj[param] = variable[param]);
    return obj;
}

/**
 *
 * @param {Object} newValue the new value
 */
export function updateData(newValue) {
    getVariable(newValue)[newValue.id] = newValue;
}

export function addData(newValue) {
    getVariable(newValue).push(newValue);
}

export function newId(target) {
    return getVariable(target).length;
}

export function addPublishedArticles(userId, articleId) {
    users[userId].publishedArticles.push(articleId);
}

function  newCommentId(parentIds) {
    let comment = getData(Target.article, parentIds[0]).comments;
    for (let i = 1; i < parentIds.length; i++) {
        // comment = comment.find(comment => comment.id[comment.id.length-1] === parentIds[i]).reply;
        comment = comment[parentIds[i]].reply;
    }
    return comment.length;
}

export function addComments(userId, parentIds, content) {
    const commentId = newCommentId(parentIds);
    const comment = newComment(
        parentIds.concat(commentId),
        content,
        userId,
        [],
        [],
        new Date(),
        []
    );  // create the comment object

    let parent = articles[parentIds[0]];  // set the parent comment to the article itself.
    if (parentIds.length === 1) {  // if the article is the only parent
        parent.comments.push(comment);  // push this comment to the article's comment list
        return comment;
    }

    parent = parent.comments;  // if this comment is a reply
    for (let i=1; i<parentIds.length; i++) {
        parent = parent[parentIds[i]].reply;  // find the parent of this reply
    }
    parent.push(comment);  // add this reply to the parent
    return comment;
}

export function initData(USERS = [], ARTICLES = [], ROOMS = []) {
    users = USERS;
    articles = ARTICLES;
    rooms = ROOMS;
}

export function exist(type, value) {
    return users.find(user => user[type] === value);
}

// The following function was in ./utils/userUtils.js

export function getSessionIndex(userIndex, sessionId) {
    return users[userIndex].activeSessions.findIndex(element => element === sessionId);
}

export function appendSession(userIndex) {
    const sessionId = users[userIndex].activeSessions.length;
    users[userIndex].activeSessions.push(sessionId);
    return sessionId;
}

export function removeSession(userIndex, sessionIndex) {
    users[userIndex].activeSessions.splice(sessionIndex, 1);
}
