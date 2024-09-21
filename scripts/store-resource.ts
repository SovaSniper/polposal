/**
 * Consideration
 * - Need to store POL POAP metadata somewhere
 *      Requirements
 * npm run post:store -- https://github.com/5208980/pol-template/
 */
import * as dotenv from 'dotenv';
dotenv.config();

import { convertImportToMongo } from "../../db-loader/src/quest/converter";
import { MongoService } from "../lib/db/client";
import { QuestSchema } from "../lib/db/quest";
import { validateQuest } from "../lib/utils";

// Handle Arguments
var args = process.argv.slice(2);

if (args.length !== 1) {
    console.error(`Expected 1 argument but received ${args.length}. Usage: node script.js hash`);
    process.exit(1);
}

const uri = args[0];

(async () => {
    const service = new MongoService({
        connectionString: process.env.MONGO_URI as string,
        database: process.env.DB_NAME as string,
        collections: {
            submission: process.env.SUBMISSION_COLLECTION_NAME as string,
            userSubmission: process.env.USER_SUBMISSION_COLLECTION_NAME as string,
            quest: process.env.QUEST_COLLECTION_NAME as string,
        }
    });
    await service.connect();

    try {
        const data = await validateQuest(uri)

        // Initialise quest metadata
        const metadata: QuestSchema = {
            owner: data.metadata.owner,
            name: data.metadata.name,
            title: data.metadata.title,
            image: data.metadata.image,
            description: data.metadata.description,
            // tokenId: config.tokenId,
            tokenId: 999,
            quests: []
        }

        // Quest 
        const quests = convertImportToMongo(data)

        console.log("storing quests ...")

        const questIds = quests.map((item) => item.id);
        metadata.quests = questIds;
        const query = { id: { $in: questIds } };
        const existings = await service.submissions?.collection.find(query).toArray();
        if (!existings) throw new Error("Failed to find existing submissions");

        console.log(existings)
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1); // Exit with code 1 to indicate failure
    } finally {
        service.close()
    }
})()