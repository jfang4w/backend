import {Status, Target} from './const.js';

// Previously users

export class Users {
    /**
     * Represents a user account.
     *
     * @param {number} id - The unique ID of the user.
     * @param {number} status - The status code of the user.
     * @param {number[]} following - The id of the user's following accounts
     * @param {number[]} followers - The id of the user's followers' accounts
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
     */
    constructor(id, status, following, followers, likesGot, likes, dislikes, username, nameFirst, nameLast, email, password, passwordAttempt, accountCreateDate, publishedArticles, activeSessions) {
        this.id = id;
        this.status = status;
        this.following = following;
        this.followers = followers;
        this.likesGot = likesGot;
        this.likes = likes;
        this.dislikes = dislikes;
        this.username = username;
        this.nameFirst = nameFirst;
        this.nameLast = nameLast;
        this.email = email;
        this.password = password;
        this.passwordAttempt = passwordAttempt;
        this.accountCreateDate = accountCreateDate;
        this.publishedArticles = publishedArticles;
        this.activeSessions = activeSessions;
    }

    addPublishedArticles(publishedArticlesId) {
        this.publishedArticles.push(publishedArticlesId);
    }

    json() {
        return JSON.stringify({
            id: this.id,
            status: this.status,
            following: this.following,
            followers: this.followers,
            likesGot: this.likesGot,
            likes: this.likes,
            dislikes: this.dislikes,
            username: this.username,
            nameFirst: this.nameFirst,
            nameLast: this.nameLast,
            email: this.email,
            password: this.password,
            passwordAttempt: this.passwordAttempt,
            accountCreateDate: this.accountCreateDate,
            publishedArticles: this.publishedArticles,
            activeSessions: this.activeSessions
        });
    }

    clone() {
        return new Users(
            this.id,
            this.status,
            this.following,
            this.followers,
            this.likesGot,
            this.likes,
            this.dislikes,
            this.username,
            this.nameFirst,
            this.nameLast,
            this.email,
            this.password,
            this.passwordAttempt,
            this.accountCreateDate,
            this.publishedArticles,
            this.activeSessions
        );
    }
}

// Previously articles

export class Comments {
    /**
     * Parameters are the same as Replies.
     *
     * @param {number[]} id - [<article id>, <comment id>]
     * @param {string} content - The content of the reply.
     * @param {number} author - The ID of the author.
     * @param {number[]} likes - The id of users who like the reply.
     * @param {number[]} dislikes - The id of users who hate the reply.
     * @param {Date} time - The time the reply was made.
     * @param {Comments[]} reply - The reply.
     */

    constructor(id, content, author, likes, dislikes, time, reply) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.liked = likes;
        this.hate = dislikes;
        this.time = time;
        this.reply = reply;
        this.isAuthor = users[author].id === articles[id[0]].author;     // if the author of this comment/reply is also the author of the article
        this.isCommenter = id.length < 3 ? true : users[author].id === articles[id[0]].comments[id[1]].author;  // if the author of this reply is also the author of the comment.
    }

    json() {
        return JSON.stringify({
            id: this.id,
            content: this.content,
            author: this.author,
            liked: this.liked,
            hate: this.hate,
            time: this.time,
            reply: [this.reply.map(reply => reply.json())],
            isAuthor: this.isAuthor,
            isCommenter: this.isCommenter
        });
    }

    clone() {
        return new Comments(
            this.id,
            this.content,
            this.author,
            this.liked,
            this.hate,
            this.time,
            this.reply.map(reply => reply.clone()),
            this.isAuthor,
            this.isCommenter
        );
    }
}

// this Replies class can be removed as the parents are included as the Comment id.

export class Replies extends Comments {
    /**
     * Creates a new reply.
     *
     * @param {number[]} id - [<article id>, <parent comments/replies ids>, <this reply id>]
     * @param {string} content - The content of the reply.
     * @param {number} author - The ID of the author.
     * @param {number[]} likes - The id of users who like the reply.
     * @param {number[]} dislikes - The id of user who hate the reply.
     * @param {Date} time - The time the reply was made.
     * @param {Replies[]} replay - An array of replies to this reply.
     * @param {number} parent - The id of parent reply/comment.
     */
    constructor(id, content, author, likes, dislikes, time, replay, parent) {
        super(id, content, author, likes, dislikes, time, replay);
        this.parent = parent;
    }
}

export class Articles {
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
     * @param {Comments[]} comments - An array of comments on the chapter.
     */
    constructor(id, status, title, summary, content, author, initialCreateTime, lastEditTime, nextChap, rating, likes, dislikes, long, price, tags, comments) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.author = author;  // change in future to make it a list of co-authors
        this.initialCreateTime = initialCreateTime;
        this.lastEditTime = lastEditTime;
        this.nextChap = nextChap;
        this.rating = rating;
        this.likes = likes;
        this.dislikes = dislikes;
        this.long = long;
        this.price = price;
        this.tags = tags;
        this.comments = comments;
    }

    json() {
        return JSON.stringify({
            id: this.id,
            status: this.status,
            title: this.title,
            summary: this.summary,
            content: this.content,
            author: this.author,
            initialCreateTime: this.initialCreateTime,
            lastEditTime: this.lastEditTime,
            nextChap: this.nextChap,
            rating: this.rating,
            likes: this.likes,
            dislikes: this.dislikes,
            long: this.long,
            price: this.price,
            tags: this.tags,
            comments: this.comments.map(comment => comment.json())
        });
    }

    clone() {
        return new Articles(
            this.id,
            this.status,
            this.title,
            this.summary,
            this.content,
            this.author,
            this.initialCreateTime,
            this.lastEditTime,
            this.nextChap,
            this.rating,
            this.likes,
            this.dislikes,
            this.long,
            this.price,
            this.tags,
            this.comments.map(comment => comment.clone())
        );
    }
}

// Previously dm

export class Messages {
    /**
     * Sends a message.
     *
     * @param {number} author - The ID of the message sender.
     * @param {Messages} quote - Quoting a previous message.
     * @param {string} message - The content of the message.
     * @param {Date} time - The time the message was sent.
     */
    constructor(author, quote, message, time) {
        this.author = author;
        this.quote = quote;
        this.message = message;
        this.time = time;
    }

    json() {
        return JSON.stringify({
            author: this.author,
            quote: this.quote,
            message: this.message,
            time: this.time
        });
    }

    clone() {
        return new Messages(
            this.author,
            this.quote,
            this.message,
            this.time
        );
    }
}

export class ChatRoom {
    /**
     *
     * @param {number} id room id
     * @param {number[]} uid list of ids of all users in this room
     * @param status
     * @param {Messages[]} message
     */
    constructor(id, uid, status, message) {
        this.id = id;
        this.uid = uid;
        this.status = status;
        this.message = message;
    }

    json() {
        return JSON.stringify({
            id: this.id,
            uid: this.uid,
            status: this.status,
            message: [this.message.map(message => message.json())]
        });
    }

    clone() {
        return new ChatRoom(
            this.id,
            this.uid,
            this.status,
            this.message.map(message => message.clone()));
    }
}

// Example data

let users = [
    new Users(
        0,
        Status.public,
        [],
        [],
        0,
        [],
        [],
        'Ody Zhou',
        'Ody',
        'Zhou',
        'Ody@gmail.com',
        'password123',
        0,
        new Date(),
        [0, 1, 2],
        [1, 2, 3]
    ),
];

let articles = [
    new Articles(
        0,
        Status.public,
        "some title",
        "some summaries",
        "some content",
        0,
        new Date(),
        new Date(),
        1,
        5,
        [0],
        [],
        false,
        0,
        ["Blog"],
        [
            /*
            // The comments need to be added after the declaration of articles.
            new Comments(
                [0, 0],
                "some comments",
                0,
                [0, 1],
                [],
                new Date(),
                [
                    new Comments(
                        [0, 0, 0],
                        "some replies",
                        0,
                        [0],
                        [1],
                        new Date(),
                        []
                    )
                ]
            )
             */
        ]
    ),
];

articles[0].comments = [
    new Comments(
        [0, 0],
        "some comments",
        0,
        [0, 1],
        [],
        new Date(),
        [
            /*
            // this reply has to be added after adding the parent comment
            new Comments(
                [0, 0, 0],
                "some replies",
                0,
                [0],
                [1],
                new Date(),
                []
            )
             */
        ]
    )
];

articles[0].comments[0].reply = [
    new Comments(
        [0, 0, 0],
        "some replies",
        0,
        [0],
        [1],
        new Date(),
        []
    )
];

let rooms = [
    new ChatRoom(
        0,
        [0, 1],
        Status.active,
        [
            new Messages(
                0,
                null,
                "Hello, 1",
                new Date()
            ),
            new Messages(
                1,
                null,
                "Hi, 0",
                new Date()
            )
        ]
    ),
];

/**
 *
 * @param {number|Articles|Users|ChatRoom} type
 * @returns {Articles[]|Users[]|ChatRoom[]}
 */
function getVariable(type) {
    if (type instanceof Users) return users;
    if (type instanceof Articles) return articles;
    if (type instanceof ChatRoom) return rooms;

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
 */
export function getData(target, id) {
    const data = getVariable(target);
    return data[id];
}

// /**
//  *
//  * @param {number} target what data is getting (users/articles/rooms)
//  * @param {number} id the id of this variable
//  */
// export function getIndex(target, id) {
//     const data = getVariable(target);
//     return data.findIndex(element => element.id === id);
// }

/**
 *
 * @param {Users|Articles|ChatRoom} newValue the new value
 */
export function updateData(newValue) {
    getVariable(newValue)[newValue.id] = newValue;
}

export function addData(newValue) {
    getVariable(newValue).splice(newValue.id, 0, newValue);
}

export function newId(target) {
    const data = getVariable(target);

    return data.length;

    /*
    let insert = false;
    let index = 0;

    for (; index < data.length; index++) {
        if (data[index].id !== index) {
            insert = true;
            break;
        }
    }

    return insert? index: data.length;
     */
}

export function addPublishedArticles(userId, articleId) {
    users[userId].addPublishedArticles(articleId);
}

function  newCommentId(parentIds) {
    let comment = getData(Target.article, parentIds[0]).comments;
    for (let i = 1; i < parentIds.length; i++) {
        comment = comment.find(comment => comment.id[comment.id.length-1] === parentIds[i]).reply;
    }

    let insert = false;
    let index = 0;

    for (; index < comment.length; index++) {
        if (comment[index].id[comment[index].id.length-1] !== index) {
            insert = true;
            break;
        }
    }

    return insert? index: comment.length;
}

export function addComments(userId, parentIds, content) {
    const commentId = newCommentId(parentIds);
    const comment = new Comments(
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
        return comment.json();
    }

    parent = parent.comments;  // if this comment is a reply
    for (let i=1; i<parentIds.length; i++) {
        parent = parent[parentIds[i]].reply;  // find the parent of this reply
    }
    parent.push(comment);  // add this reply to the parent
    return comment.json();
}

/**
 *
 * @param {number} target what data will be the parameter for the function
 * @param {function} func
 * @returns {*}
 */
export function runFunction(target, func) {
    const data = getVariable(target);
    return func(data);
}

export function initData(USERS, ARTICLES, ROOMS) {
    users = USERS;
    articles = ARTICLES;
    rooms = ROOMS;
}

// The following function was in ./utils/userUtils.js

export function checkUsername(username) {
    return !users.some(element => element.username === username);
}

export function checkEmail(email) {
    return !users.some(element => element.email === email);
}

export function getUser(id) {
    return users.find(element => element.id === id) || null;
}

// included as a previous function, can be replaced by
// getData(Target.user, By.id, id);
//
// export function getUserIndex(id) {
//     return users.findIndex(element => element.id === id);
// }

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
