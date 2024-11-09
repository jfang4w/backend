import {
    updateData,
    getData,
    newId,
    newUser,
    exist,
    addData
} from "./data.js";

import {
    getSessionIndex,
    removeSession,
    appendSession
} from "./data.js";  // was ./utils/userUtils

import {
    isValidEmail,
    isValidName,
    isValidPassword, isValidUserId,
    isValidUsername
} from "./utils/validations.js";

import {Status, Target} from "./const.js";

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
export function userSignup(email, password, username) {
    const id = newId(Target.user);

    if (!isValidEmail(email)) {
        throw new Error('Invalid email format.');
    }

    if (!isValidPassword(password)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    if (!isValidUsername(username)) {
        throw new Error("The username is invalid, username must be at least 3 characters long with only letters, numbers and hyphen.");
    }

    if (exist('username', username)) {
        throw new Error("The username already been used.");
    }

    if (exist('email', email)) {
        throw new Error('This email has already being used.');
    }

    addData(newUser(
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
export function userSignIn(email, password) {
    // const data = getData();

    if (!email) {
        throw new Error('Empty email.');
    }
    else if (!password) {
        throw new Error('Empty password.');
    }

    // const user = data.users.find
    const user = exist('email', email);

    if (user === undefined || user.password !== password) {
        throw new Error('The email and password combination does not exist.');
    }

    return { sessionId: appendSession(user.id), id: user.id };
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
export function userSignOut(userId, sessionId) {
    // const userIndex = getIndex(Target.user, userId);

    if (!isValidUserId(userId)) {
        throw new Error("This user is not signed in.");
    }

    const sessionIndex = getSessionIndex(userId, sessionId);

    if (sessionIndex === -1) {
        throw new Error("This session has already been signed out.");
    }

    removeSession(userId, sessionIndex);
    return {};
}

export function userDetail(id) {
    const user = getData(Target.user, id);
    if (user == null) {
        throw new Error("The user doesn't exist.");
    }
    return user;
}

export function userDetailUpdate(userId, username, nameFirst, nameLast) {
    if (!isValidName(nameFirst)) {
        throw new Error('Invalid first name, you must enter at lease 3 characters.');
    }
    if (!isValidName(nameLast)) {
        throw new Error('Invalid last name, you must enter at lease 3 characters');
    }

    // const data = getData();
    // const userIndex = getIndex(Target.user, userId);

    if (userId >= newId(Target.user)) {
        throw new Error("The user doesn't exist.");
    }

    const user = getData(Target.user, userId);

    user.username = username;
    user.nameFirst = nameFirst;
    user.nameLast = nameLast;

    updateData(user);

    // data.users[userIndex].username = username;
    // data.users[userIndex].nameFirst = nameFirst;
    // data.users[userIndex].nameLast = nameLast;
    //
    // setData(data);
    return {};
}

export function userEmailUpdate(userId, newEmail) {
    if (!isValidEmail(newEmail)) {
        throw new Error('Invalid email format.');
    }

    // const data = getData();
    // if (!(!data.users || data.users.length === 0)) {
    //     if (data.users.some(element => element.email === newEmail)) {
    //         throw new Error('This email has already being used.');
    //     }
    // }

    if (exist('email', newEmail)) {
        throw new Error('This email has already being used.');
    }

    // const userIndex = getIndex(Target.user, userId);

    if (!isValidUserId(userId)) {
        throw new Error("The user doesn't exist.");
    }

    let user = getData(Target.user, userId);
    user.email = newEmail;
    updateData(user);

    // data.users[userIndex].email = newEmail;
    // setData(data);
    return {};
}

export function userPasswordUpdate(userId, oldPassword, newPassword) {
    if (!isValidPassword(newPassword)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    // const data = getData();
    // const userIndex = getIndex(Target.user, userId);
    let user = getData(Target.user, userId);

    if (!isValidUserId(userId)) {
        throw new Error("The user doesn't exist.");
    }

    if (user.password !== oldPassword) {
        throw new Error("The password doesn't match the existing password.");
    }

    if (user.password === newPassword) {
        throw new Error("New password cannot match the old password.");
    }

    user.password = newPassword;
    updateData(user);
    // setData(data);
    return {};
}

export function userDelete(userId, password) {
    // const data = getData();
    // const userIndex = getIndex(Target.user, userId);
    let user = getData(Target.user, userId);

    if (!isValidUserId(userId)) {
        throw new Error("The user doesn't exist.");
    }

    if (user.password !== password) {
        throw new Error("The password doesn't match the existing password.");
    }

    user.status = Status.deletedByUser; // change in future to allow more deletion reasons.

    updateData(user);

    // runFunction(0, function (data) {
    //     data.splice(userId, 1);
    // });
    // data.users.splice(userIndex, 1);
    // setData(data);
    return {};
}
