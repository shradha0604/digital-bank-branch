import { DB } from "./mockdb.js";

export function addAuditLog(eventType, info) {
    DB.auditLogs.push({
        id: "AUD" + Date.now(),
        eventType,
        info,
        time: Date.now()
    });
}

export function getAuditLogs() {
    return DB.auditLogs;
}
