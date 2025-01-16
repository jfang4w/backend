import {addData, getData, getUserBy, removeRecord} from "./data.js";


function generateRandom(length) {
    let code = "";
    for (let i = 0; i < length; i++) {
        code += Math.floor(Math.random() * 36).toString(36);
    }
    return code;
}

async function send(email, title, body) {  // STUB!!
    return true;
}

export async function sendCode(email) {
    const user = await getUserBy("email", email);
    if (user) {
        const code = generateRandom(6);
        const sent = await send(email, "Your OAText Verification Code", `Dear ${user.username}, \n\nYour Verification Code is ${code}\n\nWarm Regards, \nOAText Team`);
        if (!sent) {
            throw new Error("Can not send a verification code");
        }
        const _id = await addData({
            _type: "verificationCode",
            email: email,
            code: code,
            expiration: Date.now() + 3e5,
        });
        setTimeout(() => {
            removeRecord("verificationCode", {_id: _id});
        }, 3e5);
        return {};
    }
    throw new Error(`Email ${email} not found.`);
}

export async function verifyCode(email, code) {
    const record = await getData("verificationCode", {email: email, code: code});
    if (record) {
        if (record.expiration > Date.now()) {
            return true;
        }
        await removeRecord("verificationCode", {email: email, code: code});
    }
    return false;
}
