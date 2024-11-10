import express from "express";

import {
    SUCCESS,
    BAD,
    UNAUTHORIZED,
    FORBIDDEN
} from "./utils/statusCode.js";

import {
    userSignup,
    userSignIn,
    userSignOut,
    userDetail,
    userDetailUpdate,
    userPasswordUpdate,
    userEmailUpdate,
    userDelete
} from "./user.js";

import {
    articleUpdate,
    articleUpload,
    addComment,
    getArticleDetails
} from "./article.js";

import cors from "cors";

export const app = express();

// Use middleware that allows us to access the JSON body of requests
app.use(express.json());
app.use(cors()); // use cors to allow cross-origin

// API for all the features
app.post('/v1/signup', (req, res) => {
    const { email, password, username } = req.body;
    try {
        res.status(SUCCESS).json(userSignup(email, password, username));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/signin', (req, res) => {
    const { email, password } = req.body;
    try {
        res.status(SUCCESS).json(userSignIn(email, password));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/signout', (req, res) => {
    const userId = parseInt((req.body.userId).toString());
    const sessionId = parseInt((req.body.sessionId).toString());
    try {
        res.status(SUCCESS).json(userSignOut(userId, sessionId));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.get('/v1/user/:userId', (req, res) => {
    const userId = parseInt((req.params.userId).toString());
    try {
        res.status(SUCCESS).json(userDetail(userId));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put("/v1/user/update", (req, res) => {
    let { username, nameFirst, nameLast, userId } = req.body;
    userId = parseInt(userId);

    try {
        res.status(SUCCESS).json(userDetailUpdate(userId, username, nameFirst, nameLast));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put("/v1/user/email", (req, res) => {
    let { newEmail, userId } = req.body;
    userId = parseInt(userId);

    try {
        res.status(SUCCESS).json(userEmailUpdate(userId, newEmail));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put("/v1/user/password", (req, res) => {
    let { oldPassword, newPassword, userId } = req.body;
    userId = parseInt(userId);

    try {
        res.status(SUCCESS).json(userPasswordUpdate(userId, oldPassword, newPassword));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.delete('/v1/user/:userId/delete', (req, res) => {
    const userId = parseInt((req.params.userId).toString());
    const { password } = req.body;

    try {
        res.status(SUCCESS).json(userDelete(userId, password));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.get('/v1/article/:articleId', (req, res) => {
    const articleId = parseInt(req.params.articleId);

    try {
        const article = getArticleDetails(articleId);
        res.status(SUCCESS).json(article);
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/article/:articleId/comment', (req, res) => {
    const articleId = parseInt(req.params.articleId);
    const { userId, content } = req.body;

    try {
        const comment = addComment([articleId], parseInt(userId), content);
        res.status(SUCCESS).json(comment);
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/comment/reply', (req, res) => {
    const { parentIds, userId, content } = req.body;

    try {
        const comment = addComment(parentIds, parseInt(userId), content);
        res.status(SUCCESS).json(comment);
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/article/upload', (req, res) => {
    const {session, title, summary, content, long, price, tags, preId} = req.body;

    try {
        res.status(SUCCESS).json(articleUpload(
            session,
            title,
            summary,
            content,
            JSON.parse(long),
            parseFloat(price),
            tags,
            parseInt(preId)));
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put('/v1/article/:articleId/update', (req, res) => {
    const {session, title, summary, content, rating, long, price, tags, preId} = req.body;
    const articleId = parseInt(req.params.articleId);

    try {
        res.status(SUCCESS).json(articleUpdate(
            session,
            title,
            summary,
            content,
            parseFloat(rating),
            JSON.parse(long),
            parseFloat(price),
            tags,
            articleId,
            parseInt(preId)));
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/search/:searchTerm', (req, res) => {
});
