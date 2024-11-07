import {
    newId,
    updateData,
    getData,
    newRoom,
    newMessage
} from "./data.js";
import {Status, Target} from "./const.js";

export function createRoom(uid, roomName) {
    updateData(newRoom(
        newId(Target.room),
        uid,
        {},
        roomName,
        Status.active,
        []
    ));
}

export function changeNickname(uid, roomId, nickname) {
    const room = getData(Target.room, roomId);
    room.nicknames[uid] = nickname;
    updateData(room);
}

export function sendMessage(roomId, author, message) {
    let room = getData(Target.room, roomId);

    if (author in room.uid) {
        room.message.push(newMessage(
            author,
            null, // change in future to allow quote
            message,
            new Date()));
        updateData(room);
        return;
    }
    throw new Error(`uid ${author} should not be in this room`);
}

export function getRoom(roomId) {
    return getData(Target.room, roomId);
}
