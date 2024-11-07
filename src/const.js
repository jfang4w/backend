// export const By = {
//     id: true,
//     Id: true,
//     ID: true,
//     index: false,
//     Index: false,
//     INDEX: false
// };

export const Target = {
    u: 0,
    user: 0,
    users: 0,
    a: 1,
    article: 1,
    articles: 1,
    r: 2,
    room: 2,
    rooms: 2,
};

export const Status = {
    deletedByUser: 0xf0000000,
    deletedByAdmin: 0xf0000001,

    authorOnly: 0x00000004, // for comments only: the comment is only visible to the author of the article.
    friendsOnly: 0x00000003,
    public: 0x00000002,
    private: 0x00000001,
    active: 0x00000000,
};
