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
            title: "some title",
            summary: "some summary",
            content: "some content",
            author: "Ody Zhou",
            initialCreateTime: "08/16/2024 13:02:09",
            lastEditTime: "08/16/2024 13:05:09",
            nextChap: 2,
            rating: 5
            long: False
            price: 0,
            tags: [ "Blog" ],
            comments: [
                {
                    content: "some comments",
                    author: 2,
                    liked: 10,
                    hate: 10
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
    ],
    dm: [
        /* {
            id: 1,
            userId1: 1,
            userId2: 2,
            messages: [
                { author: 1, message: "Hello", time: "2024/9/16 16:11" },
                { author: 2, message: "Hi", time: "2024/9/16 16:12" }
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

  
