import { By, Target } from './const.js';

// Previously users

export class Users {
    /**
     * Represents a user account.
     *
     * @param {number} id - The unique ID of the user.
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
    constructor(id, username, nameFirst, nameLast, email, password, passwordAttempt, accountCreateDate, publishedArticles, activeSessions) {
        this.id = id;
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
        return {
            id: this.id,
            username: this.username,
            nameFirst: this.nameFirst,
            nameLast: this.nameLast,
            email: this.email,
            password: this.password,
            passwordAttempt: this.passwordAttempt,
            accountCreateDate: this.accountCreateDate,
            publishedArticles: this.publishedArticles,
            activeSessions: this.activeSessions
        };
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
     * @param {number} liked - The number of likes for the reply.
     * @param {number} hate - The number of dislikes for the reply.
     * @param {Date} time - The time the reply was made.
     * @param {Replies[]} reply - The reply.
     */

    constructor(id, content, author, liked, hate, time, reply) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.liked = liked;
        this.hate = hate;
        this.time = time;
        this.reply = reply;
    }

    json() {
        return {
            content: this.content,
            author: this.author,
            liked: this.liked,
            hate: this.hate,
            time: this.time,
            reply: [this.reply.map(reply => reply.json())]
        };
    }
}

export class Replies extends Comments {
    /**
     * Creates a new reply.
     *
     * @param {number[]} id - [<article id>, <parent comments/replies ids>, <this reply id>]
     * @param {string} content - The content of the reply.
     * @param {number} author - The ID of the author.
     * @param {number} liked - The number of likes for the reply.
     * @param {number} hate - The number of dislikes for the reply.
     * @param {Date} time - The time the reply was made.
     * @param {Replies[]} replay - An array of replies to this reply.
     * @param {(Comments|Replies)[]} parents - An array of parent replies or comments.
     */
    constructor(id, content, author, liked, hate, time, replay, parents) {
        super(id, content, author, liked, hate, time, replay);
        this.parents = parents;
    }
}

export class Articles {
    /**
     * Creates a new chapter.
     *
     * @param {number} id - The chapter ID.
     * @param {string} title - The title of the chapter.
     * @param {string} summary - A brief summary of the chapter.
     * @param {string} content - The content of the chapter (HTML formatted).
     * @param {number} author - The ID of the author.
     * @param {Date} initialCreateTime - The time when the chapter was initially created.
     * @param {Date} lastEditTime - The time when the chapter was last edited.
     * @param {number} nextChap - The ID of the next chapter.
     * @param {number} rating - The rating of the chapter.
     * @param {boolean} long - Indicates if the chapter is long.
     * @param {number} price - The price of the chapter.
     * @param {string[]} tags - An array of tags associated with the chapter.
     * @param {Comments[]} comments - An array of comments on the chapter.
     */
    constructor(id, title, summary, content, author, initialCreateTime, lastEditTime, nextChap, rating, long, price, tags, comments) {
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.author = author;
        this.initialCreateTime = initialCreateTime;
        this.lastEditTime = lastEditTime;
        this.nextChap = nextChap;
        this.rating = rating;
        this.long = long;
        this.price = price;
        this.tags = tags;
        this.comments = comments;
    }

    json() {
        return {
            id: this.id,
            title: this.title,
            summary: this.summary,
            content: this.content,
            author: this.author,
            initialCreateTime: this.initialCreateTime,
            lastEditTime: this.lastEditTime,
            nextChap: this.nextChap,
            rating: this.rating,
            long: this.long,
            price: this.price,
            tags: this.tags,
            comments: this.comments.map(comment => comment.json())
        };
    }

    update(title, summary, content, lastEditTime, nextChap, rating, long, price, tags) {
        this.title = title;
        this.summary = summary;
        this.content = content;
        this.lastEditTime = lastEditTime;
        this.nextChap = nextChap;
        this.rating = rating;
        this.long = long;
        this.price = price;
        this.tags = tags;
    }
}

// Previously dm

export class Messages {
    /**
     * Sends a message.
     *
     * @param {number} author - The ID of the message sender.
     * @param {string} message - The content of the message.
     * @param {Date} time - The time the message was sent.
     */
    constructor(author, message, time) {
        this.author = author;
        this.message = message;
        this.time = time;
    }

    json() {
        return {
            author: this.author,
            message: this.message,
            time: this.time
        };
    }
}

export class ChatRoom {
    /**
     *
     * @param {number} id room id
     * @param {number[]} uid list of ids of all users in this room
     * @param {Messages[]} message
     */
    constructor(id, uid, message) {
        this.id = id;
        this.uid = uid;
        this.message = message;
    }

    json() {
        return {
            id: this.id,
            uid: this.uid,
            message: [this.message.map(message => message.json())]
        };
    }
}

// Example data

let users = [
    new Users(
        0,
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
        "some title",
        "some summaries",
        "some content",
        0,
        new Date(),
        new Date(),
        1,
        5,
        false,
        0,
        ["Blog"],
        [
            new Comments(
                [0, 0],
                "some comments",
                1,
                10,
                10,
                new Date(),
                [
                    new Replies(
                        [0, 0, 0],
                        "some replies",
                        2,
                        5,
                        5,
                        new Date(),
                        [],
                        [
                            // the "some comments" above
                        ]
                    )
                ]
            )
        ]
    ),
];

let rooms = [
    new ChatRoom(
        0,
        [0, 1],
        [
            new Messages(
                0,
                "Hello, 1",
                new Date()
            ),
            new Messages(
                1,
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
 * @param {boolean} by (id (true)/index (false))
 * @param {number} value the value of id/index
 */
export function getData(target, by, value) {
    const data = getVariable(target);
    return by === By.index? data[value] : data.find(element => element.id === value);
}

/**
 *
 * @param {number} target what data is getting (users/articles/rooms)
 * @param {number} id the id of this variable
 */
export function getIndex(target, id) {
    const data = getVariable(target);
    return data.findIndex(element => element.id === id);
}

/**
 *
 * @param {Users|Articles|ChatRoom} newValue the new value
 */
export function updateData(newValue) {
    getVariable(newValue)[getIndex(Target.article, newValue.id)] = newValue;
}

export function addData(newValue) {
    getVariable(newValue).splice(newValue.id, 0, newValue);
}

export function newId(target) {
    let data = target;
    if (typeof target === 'number') {
        data = getVariable(target);
    }

    let insert = false;
    let index = 0;

    for (; index < data.length; index++) {
        if (data[index].id !== index) {
            insert = true;
            break;
        }
    }

    return insert? index: data.length;
}

export function addPublishedArticles(userId, articleId) {
    users[getIndex(Target.user, userId)].addPublishedArticles(articleId);
}

function  newCommentId(parentIds) {
    let comment = getData(Target.article, By.id, parentIds[0]).comments;
    for (let i = 1; i < parentIds.length; i++) {
        comment = comment.find(comment => comment.id === parentIds[i]).comments;
    }

    const thisId = newId(comment);
    return parentIds.concat(thisId);
}

export function addComments(userId, parentIds, content) {
    const comment = new Comments(
        parentIds.concat(newCommentId(parentIds)),
        content,
        userId,
        0,
        0,
        new Date(),
        []
    );
    articles[getIndex(Target.article, parentIds[0])].comments.push(comment);
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
