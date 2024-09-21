import { MongoClient } from 'mongodb'
import { SubmissionCollection } from './submission';
import { UserSubmissionCollection } from './user-submission';
import { QuestCollection } from './quest';

export const defaultConfig = {
    connectionString: process.env.MONGO_URI || "",
    database: process.env.DB_NAME || "",
    collections: {
        submission: process.env.SUBMISSION_COLLECTION_NAME || "",
        userSubmission: process.env.USER_SUBMISSION_COLLECTION_NAME || "",
        quest: process.env.QUEST_COLLECTION_NAME || "",
    }
}

export interface MongoServiceConfig {
    connectionString: string
    database: string
    collections: {
        submission: string
        userSubmission: string
        quest: string
    }
}

export class MongoService {
    private client: MongoClient
    private config: MongoServiceConfig
    public submissions?: SubmissionCollection
    public userSubmissions?: UserSubmissionCollection
    public quests?: QuestCollection

    constructor(config: MongoServiceConfig = defaultConfig) {
        this.config = config;
        this.client = new MongoClient(config.connectionString);
    }

    async connect() {
        await this.client.connect();
        this.submissions = new SubmissionCollection(await this.getSubmissionCollection());
        this.userSubmissions = new UserSubmissionCollection(await this.getUserSubmissionCollection());
        this.quests = new QuestCollection(await this.getQuestCollection());
    }

    async close() {
        await this.client.close();
    }

    async disconnect() {
        await this.client.close();
    }

    async ping() {
        try {
            await this.client.db(this.config.database).command({ ping: 1 });
            return true;
        } catch (e: any) {
            return false;
        } finally {
            await this.client.close();
        }

    }

    private async getDb(dbName: string) {
        return this.client.db(this.config.database);
    }

    private async getCollection(dbName: string, collectionName: string) {
        return this.client.db(this.config.database).collection(collectionName);
    }

    async getSubmissionCollection() {
        const collection = this.client
            .db(this.config.database).collection(this.config.collections.submission);
        // Makes sure the id field is unique
        await collection.createIndex({ id: 1 }, { unique: true });
        return collection
    }

    async getUserSubmissionCollection() {
        const collection = this.client
            .db(this.config.database).collection(this.config.collections.userSubmission);
        return collection
    }

    async getQuestCollection() {
        const collection = this.client
            .db(this.config.database).collection(this.config.collections.quest);
        collection.createIndex({ tokenId: 1 }, { unique: true })
        return collection
    }
}