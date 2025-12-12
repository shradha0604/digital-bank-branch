import { DB } from "./mockdb.js";
import { uid } from "../utils/uid.js";

export function newTransaction(custId, amount, type = "withdraw") {
    const txn = {
        id: uid(),
        custId,
        type,
        amount,
        timestamp: Date.now(),
        status: "completed"
    };

    DB.transactions.push(txn);
    return txn;
}

export function getTransactions(custId) {
    return DB.transactions.filter(t => t.custId === custId);
}

export function updateBalance(accountNo, amountChange) {
    const acc = DB.accounts.find(a => a.accountNo === accountNo);
    acc.balance += amountChange;
    acc.lastUpdated = Date.now();
    return acc;
}
