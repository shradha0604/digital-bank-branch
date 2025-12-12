// Master Mock Database for NEXUS Frontend

export const DB = {
    customers: [
        {
            id: "CUST1001",
            name: "Rohan Kumar",
            dob: "2002-08-14",
            email: "rohan@example.com",
            phone: "9876543210",
            address: "Bangalore, India",
            language: "English",
            preferences: {
                theme: "default",
                quickActions: ["Withdraw", "Check Balance"]
            },
            fraudScore: 12,
            notifications: []
        }
    ],

    accounts: [
        {
            custId: "CUST1001",
            accountNo: "AC9988776655",
            type: "Savings",
            balance: 45000,
            lastUpdated: Date.now()
        }
    ],

    transactions: [],

    lockers: [
        {
            lockerId: "LCK-01",
            size: "Medium",
            available: false,
            owner: "CUST1001",
            lastAccessed: Date.now()
        },
        {
            lockerId: "LCK-02",
            size: "Small",
            available: true,
            owner: null,
            lastAccessed: null
        }
    ],

    kycRecords: [],
    fraudEvents: [],
    blockchainEvents: [],
    fieldAgentLogs: [],
    auditLogs: []
};
