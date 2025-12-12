import { DB } from "./mockdb.js";

export function addNotification(custId, message) {
    const c = DB.customers.find(c => c.id === custId);
    c.notifications.push({
        id: "NTF" + Date.now(),
        message,
        time: Date.now()
    });
}

export function getNotifications(custId) {
    return DB.customers.find(c => c.id === custId).notifications;
}
