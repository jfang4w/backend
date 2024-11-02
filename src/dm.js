import {
    newId,
    updateData,
    getData,
    ChatRoom,
    Messages
} from "data.js";
import {By, Target} from "./const.js";

export function createRoom(uid) {
    updateData(new ChatRoom(
        newId(Target.room),
        uid,
        []
    ));
}

export function sendMessage(roomId, author, message) {
    let room = getData(Target.room, By.id, roomId);

    if (author in room.uid) {
        room.message.push(new Messages(
            author,
            message,
            new Date()));
        updateData(room);
        return;
    }
    throw new Error(`uid ${author} should not be in this room`);
}
