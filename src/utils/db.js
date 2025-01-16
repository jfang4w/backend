import {MongoClient} from "mongodb";


export class DBConnection {
    constructor() {
        this.connected = false;
        this.client = new MongoClient("mongodb+srv://BackEnd:N6fJjUYDXp8Bgppl@oatext.vcy18.mongodb.net/?retryWrites=true&w=majority&appName=OAText");
    }

    async connect() {
        if (this.connected) {
            console.warn("Already connected!");
        } else {
            await this.client.connect();
            this.db = this.client.db("OAText");
            this.connected = true;
        }
    }

    async disconnect() {
        await this.client.close();
        this.connected = false;
    }

    async assertConnect() {
        if (!this.connected) {
            console.warn("Not Connected!");
            await this.connect();
        }
    }

    async execute(func) {
        await this.assertConnect();
        try {
            return await func();
        } catch (error) {
            console.error(error);
        }
    }

    async post(type, data) {
        await this.assertConnect();
        return await this.execute(async () => {
            const result = await this.db.collection(type).insertOne(data);
            return result.insertedId;
        });
    }

    async get(type, query) {
        await this.assertConnect();
        return await this.execute(async () => {
            return await this.db.collection(type).findOne(query);
        });
    }

    async search(type, searchTerm) {
        await this.assertConnect();
        return await this.execute(async () => {
            return await this.db.collection(type).find({ $text: { $search: `"${searchTerm}"` } });
        });
    }

    async put(type, query, newData) {
        await this.assertConnect();
        return await this.execute(async () => {
            const result = await this.db.collection(type).updateOne(query, { $set: newData}, {upsert: true});
            return result.upsertedId;
        });
    }

    async count(type) {
        await this.assertConnect();
        return await this.execute(async () => {
            return await this.db.collection(type).count();
        });
    }

    async remove(type, query) {
        await this.assertConnect();
        return await this.execute(async () => {
            return await this.db.collection(type).deleteOne(query);
        })
    }
}
