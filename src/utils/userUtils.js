import {
    getData,
    setData
} from "../data.js";

/*
 * Consider putting this file in ../data.js to avoid getting and setting the entire dataset everytime a function is called.
 */

export function checkUsername(username) {
    return !getData().users.some(element => element.username === username);
}

export function checkEmail(email) {
    return !getData().users.some(element => element.email === email);
}

export function getUser(id) {
    return (getData().users.find(element => element.id === id) || null);
}

export function getUserIndex(id) {
    return getData().users.findIndex(element => element.id === id);
}

export function getSessionIndex(userIndex, sessionId) {
    return getData().users[userIndex].activeSessions.findIndex(element => element === sessionId);
}

export function appendSession(userIndex) {
    const data = getData();
    const sessionId = data.users[userIndex].activeSessions.length;
    data.users[userIndex].activeSessions.push(sessionId);
    setData(data);
    return sessionId;
}

export function removeSession(userIndex, sessionIndex) {
    const data = getData();
    data.users[userIndex].activeSessions.splice(sessionIndex, 1);
    setData(data);
}
