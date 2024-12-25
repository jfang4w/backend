import {
    newId,
    updateData,
    getData,
    newRoom,
    newMessage
} from "./data.js";
import {Status, Target} from "./const.js";

export async function createRoom(uid, roomName) {
    await updateData(newRoom(
        await newId(Target.room),
        uid,
        {},
        roomName,
        Status.active,
        []
    ));
}

export async function changeNickname(uid, roomId, nickname) {
    const room = await getData(Target.room, roomId);
    room.nicknames[uid] = nickname;
    await updateData(room);
}

export async function sendMessage(roomId, author, message) {
    let room = await getData(Target.room, roomId);

    if (author in room.uid) {
        room.message.push(newMessage(
            author,
            null, // change in future to allow quote
            message,
            new Date()));
        await updateData(room);
        return;
    }
    throw new Error(`uid ${author} should not be in this room`);
}

export async function getRoom(roomId) {
    return await getData(Target.room, roomId);
}
