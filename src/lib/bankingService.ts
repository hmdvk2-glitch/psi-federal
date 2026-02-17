import { BaseRecord, createRecord, queryCollection, updateRecord, createRecordAsync, queryCollectionAsync, updateRecordAsync } from "./storageEngine";

export interface DBUser extends BaseRecord {
    accountNumber: string;
    fullName: string;
    email: string;
    password: string; // Stored in plain text for this simulation (security grade 10 requirement)
    balance: number;
    status: "active" | "restricted";
    photo?: string; // Base64 encoded passport photo
}

export interface DBTransaction extends BaseRecord {
    customerId: string;
    type: "credit" | "debit" | "transfer";
    amount: number;
    description: string;
    chargesApplied: number;
    status: "completed" | "pending";
    date: string;
    senderName?: string;
    senderAccount?: string;
    transactionId: string;
}

// ----------------------------------------------------------------------
// CUSTOMER SERVICE LAYER
// ----------------------------------------------------------------------

export function createCustomer(payload: Omit<DBUser, keyof BaseRecord>): DBUser {
    // Check for duplicate emails or account numbers just in case
    const existing = queryCollection<DBUser>('customers', c => c.email === payload.email || c.accountNumber === payload.accountNumber);
    if (existing.length > 0) {
        throw new Error("Customer with this email or account number already exists");
    }

    return createRecord<DBUser>('customers', payload);
}

export async function createCustomerAsync(payload: Omit<DBUser, keyof BaseRecord>): Promise<DBUser> {
    const existing = await queryCollectionAsync<DBUser>('customers', c => c.email === payload.email || c.accountNumber === payload.accountNumber);
    if (existing.length > 0) {
        throw new Error("Customer with this email or account number already exists");
    }
    return createRecordAsync<DBUser>('customers', payload);
}

export function getAllCustomers(): DBUser[] {
    return queryCollection<DBUser>('customers');
}

export async function getAllCustomersAsync(): Promise<DBUser[]> {
    return queryCollectionAsync<DBUser>('customers');
}

export function getCustomerById(id: string): DBUser | undefined {
    return queryCollection<DBUser>('customers', c => c.id === id)[0];
}

export function getCustomerByAccount(accountNumber: string): DBUser | undefined {
    return queryCollection<DBUser>('customers', c => c.accountNumber === accountNumber)[0];
}

export function updateCustomer(id: string, updates: Partial<DBUser>): void {
    updateRecord<DBUser>('customers', id, updates);
}

export async function updateCustomerAsync(id: string, updates: Partial<DBUser>): Promise<void> {
    await updateRecordAsync<DBUser>('customers', id, updates);
}

export function updateCustomerPassword(id: string, newPassword: string): void {
    updateRecord<DBUser>('customers', id, { password: newPassword });
}

export async function updateCustomerPasswordAsync(id: string, newPassword: string): Promise<void> {
    await updateRecordAsync<DBUser>('customers', id, { password: newPassword });
}

// ----------------------------------------------------------------------
// TRANSACTION SERVICE LAYER
// ----------------------------------------------------------------------

export function createTransaction(payload: Omit<DBTransaction, keyof BaseRecord>): DBTransaction {
    const customer = getCustomerById(payload.customerId);
    if (!customer) {
        throw new Error("Invalid customer ID");
    }

    // 1. Create Transaction Record
    const transaction = createRecord<DBTransaction>('transactions', {
        ...payload,
        transactionId: payload.transactionId || `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });

    // 2. Update Customer Balance
    let newBalance = customer.balance;
    const totalDeduction = payload.amount + (payload.chargesApplied || 0);

    if (payload.type === 'credit') {
        newBalance += payload.amount - (payload.chargesApplied || 0);
    } else if (payload.type === 'debit' || payload.type === 'transfer') {
        // For transfers, logic might be more complex if "pending", but simulating instant for now unless specified
        newBalance -= totalDeduction;
    }

    updateRecord<DBUser>('customers', customer.id, { balance: newBalance });

    return transaction;
}

export async function createTransactionAsync(payload: Omit<DBTransaction, keyof BaseRecord>): Promise<DBTransaction> {
    const customers = await queryCollectionAsync<DBUser>('customers', c => c.id === payload.customerId);
    const customer = customers[0];

    if (!customer) {
        throw new Error("Invalid customer ID");
    }

    const transaction = await createRecordAsync<DBTransaction>('transactions', {
        ...payload,
        transactionId: payload.transactionId || `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });

    let newBalance = customer.balance;
    const totalDeduction = payload.amount + (payload.chargesApplied || 0);

    if (payload.type === 'credit') {
        newBalance += payload.amount - (payload.chargesApplied || 0);
    } else if (payload.type === 'debit' || payload.type === 'transfer') {
        newBalance -= totalDeduction;
    }

    await updateRecordAsync<DBUser>('customers', customer.id, { balance: newBalance });

    return transaction;
}

export function getTransactionsForCustomer(customerId: string): DBTransaction[] {
    return queryCollection<DBTransaction>('transactions', t => t.customerId === customerId);
}
