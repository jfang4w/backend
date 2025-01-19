import {
    updateData,
    getDataById,
    newId,
    newUser,
    getUserBy,
    addData,
    getSessionIndex,
    removeSession,
    appendSession
} from "./data.js";

import {
    isValidEmail,
    isValidPassword,
    isValidUsername
} from "./utils/validations.js";

import {Target} from "./const.js";
import {solve} from "./utils/asyncUtils.js";

/**
 * Register a user with an email, password, and names,
 * then returns their authUserId value.
 *
 * @param {string} email - The new user's Email
 * @param {string} password - The new user's password
 * @param {string} username - The new user's username
 * @returns {number} Return a unique ID for the new user
 * if the registration is successful
 */
export async function userSignup(email, password, username) {

    if (!isValidEmail(email)) {
        throw new Error('Invalid email format.');
    }

    if (!isValidPassword(password)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    if (!isValidUsername(username)) {
        throw new Error("The username is invalid, username must be at least 3 characters long with only letters, numbers and hyphen.");
    }

    const [usernameExists, emailExists, id] = await solve(getUserBy('username', username), getUserBy('email', email), newId(Target.user));

    if (usernameExists) {
        throw new Error("The username already been used.");
    }

    if (emailExists) {
        throw new Error('This email has already being used.');
    }

    await addData(newUser(
        id,
        username,
        email,
        password,
        [],
        "",
        [],
        [],
        [],
        {
            newFollower: false,
            newComment: false,
            newMessage: false,
        },
        "",
        0,
        0,
        [],
        []
    ));
    return id;
}

/**
 * Given a registered user's email and password
 * returns their authUserId value.
 *
 * @param {string} email - The registered user's Email
 * @param {string} password - The registered user's password
 * @returns - Return the registered user's ID
 */
export async function userSignIn(email, password) {
    if (!email) {
        throw new Error('Empty email.');
    }
    else if (!password) {
        throw new Error('Empty password.');
    }
    const user = await getUserBy('email', email);

    if (!user) {
        throw new Error('The email and password combination does not exist.');
    }
    if (user.password !== password){
        throw new Error('The email and password combination does not exist.');
    }

    return { sessionId: appendSession(user), id: user.id };
}

/**
 * Register a user with an email, password, and names,
 * then returns their authUserId value.
 *
 * @param {number} userId
 * @param {number} sessionId - The unique ID for the current session
 * @returns Return a unique ID for the new user
 * if the registration is successful
 */
export async function userSignOut(userId, sessionId) {
    const user = await getDataById(Target.user, userId);

    if (user === null) {
        throw new Error("This user is not signed in.");
    }

    const sessionIndex = getSessionIndex(user, sessionId);

    if (sessionIndex === -1) {
        throw new Error("This session has already been signed out.");
    }

    await removeSession(user, sessionIndex);
    return {};
}

export async function userDetail(id) {
    const user = await getDataById(Target.user, id);
    if (user === null) {
        throw new Error("The user doesn't exist.");
    }
    return user;
}

export async function userDetailUpdate(userId, avatar, username, bio, email, preference) {

    const [user, emailExists, usernameExists] = await solve(getDataById(Target.user, userId), getUserBy('email', email), getUserBy('username', username));

    if (user === null) {
        throw new Error("The user doesn't exist.");
    }

    let errors = "";

    if (usernameExists && username !== user.username) {
        errors += "The username already exists.\n";
    } else {
        user.username = username;
    }

    if (emailExists && email !== user.email) {
        errors += "The email already exists.\n";
    } else {
        user.email = email;
    }

    user.avatar = avatar;
    user.bio = bio;
    user.emailPreference = preference;

    await updateData(user);

    if (errors !== "") {
        throw new Error(errors + "All other fields have been updated");
    }

    return {};
}

// export async function userEmailUpdate(userId, newEmail) {
//     if (!isValidEmail(newEmail)) {
//         throw new Error('Invalid email format.');
//     }
//
//     const [user, email] = await solve(getDataById(Target.user, userId), getUserBy('email', newEmail));
//
//     if (user === null) {
//         throw new Error("The user doesn't exist.");
//     }
//
//     if (email) {
//         throw new Error('This email has already being used.');
//     }
//     user.email = newEmail;
//     await updateData(user);
//     return {};
// }

export async function userPasswordUpdate(userId, oldPassword, newPassword) {
    if (!isValidPassword(newPassword)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    let user = await getDataById(Target.user, userId);

    if (user === null) {
        throw new Error("The user doesn't exist.");
    }

    if (user.password !== oldPassword) {
        throw new Error("The password doesn't match the existing password.");
    }

    if (user.password === newPassword) {
        throw new Error("New password cannot match the old password.");
    }

    user.password = newPassword;
    await updateData(user);
    return {};
}

export async function userDelete(userId, password) {
    let user = await getDataById(Target.user, userId);

    if (user === null) {
        throw new Error("The user doesn't exist.");
    }

    if (user.password !== password) {
        throw new Error("The password doesn't match the existing password.");
    }

    user.username = "This Account Has Been Deleted"; // change in future

    await updateData(user);
    return {};
}

export async function follow(targetId, followerId) {
    const [target, follower] = await solve(getDataById(Target.user, targetId), getDataById(Target.user, followerId));
    if (follower.following.indexOf(targetId) === -1) {
        follower.following.push(targetId);
        target.followers.push(followerId);
    } else {
        follower.following.splice(follower.following.indexOf(targetId), 1);
        target.followers.splice(target.followers.indexOf(followerId), 1);
    }
    await solve(updateData(target), updateData(follower));
    return {};
}

export async function like(articleId, likerId) {
    const article = await getDataById(Target.article, articleId);
    if (article.likes.indexOf(likerId) === -1) {
        article.likes.push(likerId);
    } else {
        article.likes.splice(article.likes.indexOf(likerId), 1);
    }
    await updateData(article);
    return {};
}

// export async function updateEmailPreference(userId, preference) {
//     let user = await getDataById(Target.user, userId);
//
//     if (user === null) {
//         throw new Error("The user doesn't exist.");
//     }
//
//     user.emailPreference = preference;
//
//     await updateData(user);
//     return {};
// }