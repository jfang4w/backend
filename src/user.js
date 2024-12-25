import {
    updateData,
    getData,
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
    isValidName,
    isValidPassword,
    isValidUsername
} from "./utils/validations.js";

import {Status, Target} from "./const.js";
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
        Status.public,
        [],
        [],
        {},  // to be added in future
        0,
        [],
        [],
        username,
        'firstname', // missing firstname
        'lastname', // missing lastname
        email,
        password,
        0,
        new Date(),
        [],
        [],  // missing session id
        0,
        0,
        0,
        [],
        [],
        [],
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
    const user = await getData(Target.user, userId);

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
    const user = await getData(Target.user, id);
    if (user === null) {
        throw new Error("The user doesn't exist.");
    }
    return user;
}

export async function userDetailUpdate(userId, username, nameFirst, nameLast) {
    if (!isValidName(nameFirst)) {
        throw new Error('Invalid first name, you must enter at lease 3 characters.');
    }
    if (!isValidName(nameLast)) {
        throw new Error('Invalid last name, you must enter at lease 3 characters');
    }

    const user = await getData(Target.user, userId);

    if (user === null) {
        throw new Error("The user doesn't exist.");
    }

    user.username = username;
    user.nameFirst = nameFirst;
    user.nameLast = nameLast;

    await updateData(user);
    return {};
}

export async function userEmailUpdate(userId, newEmail) {
    if (!isValidEmail(newEmail)) {
        throw new Error('Invalid email format.');
    }

    const [user, email] = await solve(getData(Target.user, userId), getUserBy('email', newEmail));

    if (user === null) {
        throw new Error("The user doesn't exist.");
    }

    if (email) {
        throw new Error('This email has already being used.');
    }
    user.email = newEmail;
    await updateData(user);
    return {};
}

export async function userPasswordUpdate(userId, oldPassword, newPassword) {
    if (!isValidPassword(newPassword)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    let user = await getData(Target.user, userId);

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
    let user = await getData(Target.user, userId);

    if (user === null) {
        throw new Error("The user doesn't exist.");
    }

    if (user.password !== password) {
        throw new Error("The password doesn't match the existing password.");
    }

    user.status = Status.deletedByUser; // change in future to allow more deletion reasons.

    await updateData(user);
    return {};
}
