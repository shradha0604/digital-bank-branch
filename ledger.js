import { DB } from "./mockdb.js";
import { sha256 } from "../utils/blockchain.js";

export async function addBlockchainEvent(type, payload) {
    const previous = DB.blockchainEvents[DB.blockchainEvents.length - 1];

    const block = {
        index: DB.blockchainEvents.length,
        timestamp: Date.now(),
        type,
        payload,
        prevHash: previous ? previous.hash : "GENESIS",
        hash: ""
    };

    block.hash = await sha256(JSON.stringify(block));

    DB.blockchainEvents.push(block);
    return block;
}

export function getLedger() {
    return DB.blockchainEvents;
}
