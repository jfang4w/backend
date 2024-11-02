import request from "supertest";
import { app } from "../server.js";

import {
    clear,
    ERROR,
    NUM
} from "./testUtils.js";

describe("POST /v1/signup", () => {
    const tests = [
        [ "invalid Email", "abc@abc", "abc1234", "abc", 400, ERROR ],
        [ "invalid password (no digits)", "abc@abc.com", "abcabca", "abc", 400, ERROR ],
        [ "invalid password (no letters)", "abc@abc.com", "12343432", "abc", 400, ERROR ],
        [ "invalid password (too short)", "abc@abc.com", "abc12", "abc", 400, ERROR ],
        [ "invalid username (too short)", "abc@abc.com", "abc1234", "a", 400, ERROR ],
        [ "all valid inputs", "abc@abc.com", "abc1234", "abc", 200, NUM ],
        [ "repeated Email", "abc@abc.com", "abc1234", "abcdef", 400, ERROR ],
        [ "repeated username", "abcdef@abc.com", "abc1234", "abc", 400, ERROR ]
    ];
    it.each(tests) (
        "Testing signup with %p, the inputs are: %p, %p, %p, expected output is { %p, %p }.",
        (testName, email, password, username, statusCode, responseObject) => {
            return request(app).post("/v1/signup").send({
                email: email,
                password: password,
                username: username
            }).then((res) => {
                expect(res.statusCode).toStrictEqual(statusCode);
                expect(res.body).toStrictEqual(responseObject);
            });
        }
    );
});
  
describe("POST /v1/signin", () => {
    beforeAll(async () => {
        clear();
        await request(app)
            .post("/v1/signup")
            .send({
                email: "abc@abc.com",
                password: "abc1234",
                username: "abc"
            });
    });
    const tests = [
        [ "wrong Email", "abcdef@abc.com", "abc1234", 400, ERROR ],
        [ "wrong password", "abc@abc.com", "abcd1234", 400, ERROR ],
        [ "all valid inputs", "abc@abc.com", "abc1234", 200, { sessionId: NUM } ]
    ];
    it.each(tests) (
        "Testing signin with %p, the inputs are: %p, %p, expected output is { %p, %p }.",
        (testNmae, email, password, statusCode, responseObject) => {
            return request(app).post("/v1/signin").send({
                email: email,
                password: password
            }).then((res) => {
                expect(res.statusCode).toStrictEqual(statusCode);
                expect(res.body).toStrictEqual(responseObject);
            });
        }
    );
});

describe("POST /v1/signout", () => {
    beforeAll(async() => {
        clear();
        await request(app)
            .post("/v1/signup")
            .send({
                email: "abc@abc.com",
                password: "abc1234",
                username: "abc"
            });

        await request(app)
            .post("/v1/signin")
            .send({
                email: "abc@abc.com",
                password: "abc1234"
            });
    });

    const tests = [
        [ "wrong userId", 1, 0, 400, ERROR ],
        [ "wrong sessionId", 0, 1, 400, ERROR ],
        [ "valid sessionId", 0, 0, 200, {} ]
    ];
    it.each(tests) (
        "Testing signout with %p, the inputs are: %p, %p, expected output is { %p, %p }.",
        (testNmae, userId, sessionId, statusCode, responseObject) => {
            return request(app).post("/v1/signout").send({
                userId: userId,
                sessionId: sessionId
            }).then((res) => {
                expect(res.statusCode).toStrictEqual(statusCode);
                expect(res.body).toStrictEqual(responseObject);
            });
        }
    );
});
