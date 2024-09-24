let data = {
    users: [
        /* {
            id: 1,
            nameFirst: "Ody",
            nameLast: "Zhou",
            email: "Ody@gmail.com",
            password: "password123",
            passwordAttempt: 0,
            accountCreateDate: "2024-08-16",
            publishedArticles: [articleId]
            activeSessions: [
                1, 2, 3
            ]
        } */
    ],
    articles: [
        /*{
            id: 1
            content: "some content",
            summary: "",
            author: "Ody Zhou",
            initialCreateTime: "08/16/2024 13:02:09",
            lastEditTime: "08/16/2024 13:05:09",
            nextChap: 2,
            comments: [
                {
                    content: "some comments",
                    author: 2,
                    time: "08/16/2024 13:05:09"
                    reply: [
                        {
                            content: "some comments",
                            author: 2,
                            time: "08/16/2024 13:10:14"
                        },
                    ]
                },
            ]
        }*/
    ]
};



/** Return the users and quizzes data store in the dataStore.ts
 *
 * @return {Object} An object that contains all the users and quizzes data
 */
export function getData() {
    return data;
}
  
/** Pass in the new data object, with modifications made and store back to dataStore.ts
 *
 * @param {Object} newData - An object that contains the updated users and quizzes data
 */
export function setData(newData) {
    data = newData;
}

  