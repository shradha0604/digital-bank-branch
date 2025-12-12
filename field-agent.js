import { DB } from "./mockdb.js";

export function addFieldAgentLog(agentId, action, payload) {
    DB.fieldAgentLogs.push({
        id: "FAL" + Date.now(),
        agentId,
        action,
        payload,
        timestamp: Date.now(),
        synced: false
    });
}

export function syncFieldLogs() {
    DB.fieldAgentLogs.forEach(log => log.synced = true);
}
