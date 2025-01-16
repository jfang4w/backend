import {
    newId,
    updateData,
    getDataById,
    newChat,
    newMessage
} from "./data.js";
import {Target} from "./const.js";

export async function createRoom(uid, roomName) {
    await updateData(newChat(
        await newId(Target.room),
        uid,
        [],
        new Date(),
        roomName,
    ));
}

export async function sendMessage(roomId, author, message) {
    let room = await getDataById(Target.room, roomId);

    if (author in room.uid) {
        room.message.push(newMessage(
            author,
            new Date(),
            message));
        await updateData(room);
        return;
    }
    throw new Error(`uid ${author} should not be in this room`);
}

export async function getRoom(roomId) {
    return await getDataById(Target.room, roomId);
}
