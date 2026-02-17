import { BaseRecord, createRecord, getDB, saveDB, createRecordAsync, updateRecordAsync, queryCollectionAsync } from "./storageEngine";

export interface TransferCodes extends BaseRecord {
    cot: string;
    tax: string;
    irs: string;
    lastUpdatedBy: string;
}

const CODES_COLLECTION = 'transferCodes';

export async function getTransferCodesAsync(): Promise<TransferCodes | null> {
    const codes = await queryCollectionAsync<TransferCodes>(CODES_COLLECTION);
    if (codes.length > 0) return codes[0];

    // Check local if async returned nothing (though queryCollectionAsync falls back to local)
    // If absolutely nothing, return default
    return {
        id: 'default-codes',
        cot: '5500',
        tax: '8820',
        irs: '3200',
        lastUpdatedBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

export function getTransferCodes(): TransferCodes | null {
    const db = getDB();
    const codes = db[CODES_COLLECTION] as TransferCodes[];
    if (codes.length > 0) return codes[0];

    // Return Default Simulation Codes if none exist
    return {
        id: 'default-codes',
        cot: '5500',
        tax: '8820',
        irs: '3200',
        lastUpdatedBy: 'system',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
}

export async function saveTransferCodesAsync(cot: string, tax: string, irs: string, adminId: string): Promise<TransferCodes> {
    const existing = await getTransferCodesAsync();
    // Logic: if existing is 'default-codes' (virtual), we should create a real record.
    // If it has a real ID, update it.

    if (existing && existing.id !== 'default-codes') {
        await updateRecordAsync<TransferCodes>(CODES_COLLECTION, existing.id, {
            cot,
            tax,
            irs,
            lastUpdatedBy: adminId
        });
        return { ...existing, cot, tax, irs, lastUpdatedBy: adminId };
    } else {
        return await createRecordAsync<TransferCodes>(CODES_COLLECTION, {
            cot,
            tax,
            irs,
            lastUpdatedBy: adminId
        });
    }
}

export function saveTransferCodes(cot: string, tax: string, irs: string, adminId: string): TransferCodes {
    const db = getDB();
    const existing = getTransferCodes();

    if (existing && existing.id !== 'default-codes') {
        // Update existing
        const updated = {
            ...existing,
            cot,
            tax,
            irs,
            lastUpdatedBy: adminId,
            updatedAt: new Date().toISOString()
        };
        // We need to find the index in the specific collection
        // Since getTransferCodes returns a copy or ref? getDB returns ref. 
        // usage of db[CODES_COLLECTION][0] assumes single singleton.
        if (!db[CODES_COLLECTION]) db[CODES_COLLECTION] = [];
        const index = db[CODES_COLLECTION].findIndex(c => c.id === existing.id);
        if (index >= 0) {
            db[CODES_COLLECTION][index] = updated;
        } else {
            db[CODES_COLLECTION].push(updated);
        }

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

export async function validateTransferCodeAsync(type: 'cot' | 'tax' | 'irs', value: string): Promise<boolean> {
    const codes = await getTransferCodesAsync();
    if (!codes) return false;
    return codes[type] === value;
}

export function validateTransferCode(type: 'cot' | 'tax' | 'irs', value: string): boolean {
    const codes = getTransferCodes();
    if (!codes) return false; // Fail safe if no codes set
    return codes[type] === value;
}
