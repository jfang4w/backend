import {
    articleUpload,
    articleUpdate,
    getArticleDetails,
    addComment
} from "../article.js";
import {initData, runFunction} from "../data.js";
import {Target} from "../const.js";
import {userDelete, userDetail, userDetailUpdate, userEmailUpdate, userPasswordUpdate, userSignup} from "../user.js";
import {createRoom, sendMessage} from "../dm.js";

function testPreparation() {
    initData([],[],[]);
    userSignup('123@123.com', 'abc123', 'test1');
    userSignup('789@789.com', 'abc123', 'test2');
    articleUpload(
        0,
        '1',
        'summary',
        'content',
        true,
        10,
        [],
        -1
    );
    createRoom([0, 1]);
}

function articleTest() {
    console.log("testing article upload");
    articleUpload(
        0,
        'title',
        'summary',
        'content',
        true,
        10,
        [],
        -1
    );
    console.log(getArticleDetails(1));

    console.log('testing article update');
    articleUpdate(
        0,
        'new title',
        'new summary',
        'new content',
        5.0,
        false,
        0,
        [],
        1,
        0,
    );
    console.log(getArticleDetails(1));
}

function commentTest() {
    console.log('testing add comment');
    addComment([0], 0, "comment from author");
    console.log(getArticleDetails(0).clone());

    console.log('testing add another comment');
    addComment([0], 1, "comment from other");
    console.log(getArticleDetails(0).clone());

    console.log('testing add a reply to the first comment');
    addComment([0,0], 1, "other replying author's comment");
    console.log(getArticleDetails(0).clone());

    console.log('testing add a reply to the other comment');
    addComment([0,1], 0, "author replying to other's comment");
    console.log(getArticleDetails(0).clone());

    console.log('testing add a reply to the reply of the first comment');
    addComment([0,0,0], 0, "author replying 'other replying author's comment'");
    console.log(getArticleDetails(0).clone());
}

function userTest() {
    initData([],[],[]);
    console.log('testing user sign up');
    userSignup(
        'valid@email.com',
        'abc1234',
        'abc'
    );
    console.log(userDetail(0));

    console.log('testing user detail update');
    userDetailUpdate(0, 'new username', 'new firstname', 'new lastname');
    console.log(userDetail(0));

    console.log('testing user email update');
    userEmailUpdate(0, "new@email.com");
    console.log(userDetail(0));

    console.log('testing user password update');
    userPasswordUpdate(0, 'abc1234', 'new123');
    console.log(userDetail(0));

    console.log('testing user delete, expected status code is 4026531840');
    userDelete(0, 'new123');
    console.log(userDetail(0));
}

function roomTest() {
    sendMessage(0, 0, 'hi, my uid is 0');
    sendMessage(0, 1, 'hello, my id is 1');

    console.log('testing sending data');
    runFunction(Target.room, function (data) {
        console.log(data[0]);
    });

    console.log('testing sending message from a person who is not in the room\nexpect an error\ngot:');
    userSignup(
        // id: 2
        'valid@email.com',
        'abc1234',
        'abc'
    );
    try {
        sendMessage(0, 2, 'hello, my id is 2; I should not be in this chat room.');
        console.log('NO ERROR THROWN');
    } catch (e) {
        console.log(e);
    }
}

const testcasesToRun = [];  // put in test functions here
testcasesToRun.forEach((testcase) => {
    testPreparation();
    testcase();
});
