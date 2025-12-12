import { DB } from "./mockdb.js";

export function getCustomer360(id = "CUST1001") {
    return {
        info: DB.customers.find(c => c.id === id),
        accounts: DB.accounts.filter(a => a.custId === id),
        transactions: DB.transactions.filter(t => t.custId === id),
        fraudEvents: DB.fraudEvents.filter(f => f.details?.custId === id),
        locker: DB.lockers.find(l => l.owner === id),
        notifications: DB.customers.find(c => c.id === id).notifications
    };
}
