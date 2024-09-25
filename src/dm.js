import {
    getData,
    setData
} from "data.js";

export function createDm(userId1, userId2, message) {
    const data = getData();
    data.dm.push({
        id: data.dm.length + 1,
        userId1: userId1,
        userId2: userId2,
        messages: [
            { author: userId1, message: message, time: Math.floor(Date.now() / 1000) }
        ]
    });
    setData(data);
}

export function sendDm(dmId, author, message) {
    const data = getData();
    data.dm[dmId].messages.push({
        author: author,
        message: message,
        time: Math.floor(Date.now() / 1000)
    });
}
