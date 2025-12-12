import { DB } from "./mockdb.js";

export function calculateFraudScore(uploadData) {
    // Simulated ML scoring model
    const score = Math.floor(Math.random() * 100);

    DB.fraudEvents.push({
        id: "FRD" + Date.now(),
        details: uploadData,
        score,
        timestamp: Date.now()
    });

    return score;
}

export function getFraudEvents() {
    return DB.fraudEvents;
}
