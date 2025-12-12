import { DB } from "./mockdb.js";
import { addBlockchainEvent } from "./ledger.js";

export function getAllLockers() {
    return DB.lockers;
}

export async function accessLocker(lockerId, custId) {
    const locker = DB.lockers.find(l => l.lockerId === lockerId);

    locker.lastAccessed = Date.now();

    await addBlockchainEvent("LOCKER_ACCESS", {
        lockerId,
        custId,
        time: locker.lastAccessed
    });

    return locker;
}
