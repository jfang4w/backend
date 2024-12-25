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
app.post('/v1/signup', async (req, res) => {
    const { email, password, username } = req.body;
    try {
        res.status(SUCCESS).json(await userSignup(email, password, username));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        res.status(SUCCESS).json(await userSignIn(email, password));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/signout', async (req, res) => {
    const userId = parseInt((req.body.userId).toString());
    const sessionId = parseInt((req.body.sessionId).toString());
    try {
        res.status(SUCCESS).json(await userSignOut(userId, sessionId));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.get('/v1/user/:userId', async (req, res) => {
    const userId = parseInt((req.params.userId).toString());
    try {
        res.status(SUCCESS).json(await userDetail(userId));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put("/v1/user/update", async (req, res) => {
    let { username, nameFirst, nameLast, userId } = req.body;
    userId = parseInt(userId);

    try {
        res.status(SUCCESS).json(await userDetailUpdate(userId, username, nameFirst, nameLast));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put("/v1/user/email", async (req, res) => {
    let { newEmail, userId } = req.body;
    userId = parseInt(userId);

    try {
        res.status(SUCCESS).json(await userEmailUpdate(userId, newEmail));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.put("/v1/user/password", async (req, res) => {
    let { oldPassword, newPassword, userId } = req.body;
    userId = parseInt(userId);

    try {
        res.status(SUCCESS).json(await userPasswordUpdate(userId, oldPassword, newPassword));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.delete('/v1/user/:userId/delete', async (req, res) => {
    const userId = parseInt((req.params.userId).toString());
    const { password } = req.body;

    try {
        res.status(SUCCESS).json(await userDelete(userId, password));
    }
    catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.get('/v1/article/:articleId', async (req, res) => {
    const articleId = parseInt(req.params.articleId);

    try {
        const article = await getArticleDetails(articleId);
        res.status(SUCCESS).json(article);
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/article/:articleId/comment', async (req, res) => {
    const articleId = parseInt(req.params.articleId);
    const { userId, content } = req.body;

    try {
        const comment = await addComment([articleId], parseInt(userId), content);
        res.status(SUCCESS).json(comment);
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/comment/reply', async (req, res) => {
    const { parentIds, userId, content } = req.body;

    try {
        const comment = await addComment(parentIds, parseInt(userId), content);
        res.status(SUCCESS).json(comment);
    } catch (error) {
        res.status(BAD).json({ error: error.message });
    }
});

app.post('/v1/article/upload', async (req, res) => {
    const {session, title, summary, content, long, price, tags, preId} = req.body;

    try {
        res.status(SUCCESS).json(await articleUpload(
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

app.put('/v1/article/:articleId/update', async (req, res) => {
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

app.post('/v1/search/:searchTerm', async (req, res) => {
});
