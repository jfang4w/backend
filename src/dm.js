import {
    newId,
    updateData,
    getData,
    ChatRoom,
    Messages
} from "./data.js";
import {Status, Target} from "./const.js";

export function createRoom(uid) {
    updateData(new ChatRoom(
        newId(Target.room),
        uid,
        Status.active,
        []
    ));
}

export function sendMessage(roomId, author, message) {
    let room = getData(Target.room, roomId);

    if (author in room.uid) {
        room.message.push(new Messages(
            author,
            null, // change in future to allow quote
            message,
            new Date()));
        updateData(room);
        return;
    }
    throw new Error(`uid ${author} should not be in this room`);
}
