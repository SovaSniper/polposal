import * as dotenv from 'dotenv';

import {
    getClient,
    isCorrectAddress,
    isSufficient
} from './lib/utils';
import { openCampusCodex } from './lib/chains/open-campus-codex';

dotenv.config();
const chain = openCampusCodex.id;

const hash = process.argv[2] as `0x${string}`;
// const hash = '0x262ec99b269235fbae0450aab044d57caec49e1714c42e903031faafe49b2aa6';

(async () => {
    const client = getClient(chain)

    const chainId = await client.getChainId()
    console.log("Chain: ", chainId)

    const transaction = await client.getTransaction({ hash })
    console.log("Block Number: ", transaction.blockNumber)

    if (!isSufficient(transaction)) {
        console.error("In valid staking amount")
        return;
    }

    if (!isCorrectAddress(transaction, chainId.toString())) {
        console.error("In valid staking amount")
        return;
    }

    // Validate!
})()