import { BaseRecord, createRecord, getDB, saveDB } from "./storageEngine";

export interface TransferCodes extends BaseRecord {
    cot: string;
    tax: string;
    irs: string;
    lastUpdatedBy: string;
}

const CODES_COLLECTION = 'transferCodes';

export function getTransferCodes(): TransferCodes | null {
    const db = getDB();
    const codes = db[CODES_COLLECTION] as TransferCodes[];
    return codes.length > 0 ? codes[0] : null;
}

export function saveTransferCodes(cot: string, tax: string, irs: string, adminId: string): TransferCodes {
    const db = getDB();
    const existing = getTransferCodes();

    if (existing) {
        // Update existing
        const updated = {
            ...existing,
            cot,
            tax,
            irs,
            lastUpdatedBy: adminId,
            updatedAt: new Date().toISOString()
        };
        db[CODES_COLLECTION][0] = updated;
        saveDB(db);
        return updated;
    } else {
        // Create new
        const newCodes = createRecord<TransferCodes>(CODES_COLLECTION, {
            cot,
            tax,
            irs,
            lastUpdatedBy: adminId
        });
        return newCodes;
    }
}

export function validateTransferCode(type: 'cot' | 'tax' | 'irs', value: string): boolean {
    const codes = getTransferCodes();
    if (!codes) return false; // Fail safe if no codes set
    return codes[type] === value;
}
