import { DB } from "./mockdb.js";

export function getCustomer(id = "CUST1001") {
    return DB.customers.find(c => c.id === id);
}

export function updateCustomer(id, updates) {
    let cust = getCustomer(id);
    Object.assign(cust, updates);
    return cust;
}

export function addNotification(id, note) {
    const cust = getCustomer(id);
    cust.notifications.push({
        id: "NTF" + Date.now(),
        text: note,
        time: Date.now()
    });
}
