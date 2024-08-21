import {
    getData,
    setData
} from "./data.js";

import {
    getUser,
    getUserIndex,
    getSessionIndex,
    removeSession,
    appendSession,
    checkUsername,
    checkEmail
} from "./utils/userUtils.js"

import {
    isValidEmail,
    isValidName,
    isValidPassword,
    isValidUsername
} from "./utils/validations.js"

/**
 * Register a user with an email, password, and names,
 * then returns their authUserId value.
 *
 * @param {string} email - The new user's Email
 * @param {string} password - The new user's passowrd
 * @param {string} nameFirst - The new user's first name
 * @param {string} nameLast - The new user's last name
 * @returns {number} Return an unique ID for the new user
 * if the registration is successful
 */
export function userSignup(email, password, username) {
    const data = getData();
    const id = data.users.length;
    
    if (!isValidEmail(email)) {
        throw new Error('Invalid email format.');
    }

    if (!isValidPassword(password)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    if (!isValidUsername(username)) {
        throw new Error("The username is invalid, username must be at least 3 characters long with only letters, numbers and hyphen.");
    }

    if (!checkUsername(username)) {
        throw new Error("The username already been used.");
    }
    
    if (!checkEmail(email)) {
        throw new Error('This email has already being used.');
    }
    const date = new Date();
    data.users.push({
        id: id,
        username: username,
        email: email,
        password: password,
        nameFirst: "",
        nameLast: "",
        accountCreateDate: `${date.getFullYear()}-${(date.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}-${date.getDate().toLocaleString('en-US', { minimumIntegerDigits: 2 })}`,
        passwordAttempt: 0,
        activeSessions: []
    });

    setData(data);
    return {};
}

/**
 * Given a registered user's email and password
 * returns their authUserId value.
 *
 * @param {string} email - The registered user's Email
 * @param {string} password - The registered user's passowrd
 * @returns {number} - Return the registered user's ID
 */
export function userSignin(email, password) {
    const data = getData();

    if (!email) {
        throw new Error('Empty email.');
    }
    else if (!password) {
        throw new Error('Empty password.');
    }

    const user = data.users.find(element => element.email === email);

    if (user === undefined || user.password !== password) {
        throw new Error('The email and password combination does not exist.');
    }
    const userIndex = getUserIndex(user.id);
    return { sessionId: appendSession(userIndex) };
}

/**
 * Register a user with an email, password, and names,
 * then returns their authUserId value.
 *
 * @param {string} sessionId - The unique Id for the current session
 * @returns {} Return an unique ID for the new user
 * if the registration is successful
 */
export function userSignout(userId, sessionId) {
    const userIndex = getUserIndex(userId);

    if (userIndex === -1) {
        throw new Error("This user is not signed in.");
    }

    const sessionIndex = getSessionIndex(userIndex, sessionId);

    if (sessionIndex === -1) {
        throw new Error("This session has already been signed out.");
    }

    removeSession(userIndex, sessionIndex);
    return {};
}

export function userDetail(id) {
    const user = getUser(id);
    if (user == null) {
        throw new Error("The user doesn't exist.");
    }
    return {
        user: {
            username: user.username,
            nameFirst: user.nameFirst,
            nameLast: user.nameLast,
            accountCreateDate: user.accountCreateDate
        }
    };
}

export function userDetailUpdate(userId, username, nameFirst, nameLast) {
    if (!isValidName(nameFirst)) {
        throw new Error('Invalid first name, you must enter at lease 3 characters.');
    }
    if (!isValidName(nameLast)) {
        throw new Error('Invalid last name, you must enter at lease 3 characters');
    }

    const data = getData();
    const userIndex = getUserIndex(userId);

    if (userIndex === -1) {
        throw new Error("The user doesn't exist.");
    }

    data.users[userIndex].username = username;
    data.users[userIndex].nameFirst = nameFirst;
    data.users[userIndex].nameLast = nameLast;

    setData(data);
    return {};
}

export function userEmailUpdate(userId, newEmail) {
    if (!isValidEmail(newEmail)) {
        throw new Error('Invalid email format.');
    }

    const data = getData();
    if (!(!data.users || data.users.length === 0)) {
        if (data.users.some(element => element.email === newEmail)) {
            throw new Error('This email has already being used.');
        }
    }

    const userIndex = getUserIndex(userId);

    if (userIndex == -1) {
        throw new Error("The user doesn't exist.");
    }

    data.users[userIndex].email = newEmail;
    setData(data);
    return {};
}

export function userPasswordUpdate(userId, oldPassword, newPassword) {
    if (!isValidPassword(newPassword)) {
        throw new Error('Password too weak, you must have at least 6 characters with at least 1 number or 1 letter.');
    }

    const data = getData();
    const userIndex = getUserIndex(userId);

    if (userIndex == -1) {
        throw new Error("The user doesn't exist.");
    }

    if (data.users[userIndex].password !== oldPassword) {
        throw new Error("The password doesn't match the existing password.");
    }

    if (data.users[userIndex].password === newPassword) {
        throw new Error("New password cannot match the old password.");
    }
    
    data.users[userIndex].password = newPassword;
    setData(data);
    return {};
}

export function userDelete(userId, password) {
    const data = getData();
    const userIndex = getUserIndex(userId);

    if (userIndex == -1) {
        throw new Error("The user doesn't exist.");
    }

    if (data.users[userIndex].password !== password) {
        throw new Error("The password doesn't match the existing password.");
    }
    data.users.splice(userIndex, 1);
    setData(data);
    return {};
}