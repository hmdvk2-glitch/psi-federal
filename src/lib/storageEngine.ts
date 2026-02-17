export type CollectionName = 'admins' | 'customers' | 'transactions' | 'charges' | 'transferCodes';

export interface BaseRecord {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface PsiFederalSimDB {
    admins: BaseRecord[];
    customers: BaseRecord[];
    transactions: BaseRecord[];
    charges: BaseRecord[];
    transferCodes: BaseRecord[];
}

const DB_KEY = 'psiFederalSimDB';

function generateUUID(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function getTimestamp(): string {
    return new Date().toISOString();
}

export function getDB(): PsiFederalSimDB {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
        const initialDB: PsiFederalSimDB = {
            admins: [],
            customers: [],
            transactions: [],
            charges: [],
            transferCodes: [],
        };
        saveDB(initialDB);
        return initialDB;
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error('Failed to parse DB, resetting:', e);
        const fallbackDB: PsiFederalSimDB = {
            admins: [],
            customers: [],
            transactions: [],
            charges: [],
            transferCodes: [],
        };
        saveDB(fallbackDB);
        return fallbackDB;
    }
}

export function saveDB(db: PsiFederalSimDB): void {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

export function createRecord<T extends BaseRecord>(
    collection: CollectionName,
    payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): T {
    const db = getDB();
    const now = getTimestamp();

    const record = {
        ...payload,
        id: generateUUID(),
        createdAt: now,
        updatedAt: now,
    } as T;

    // We need to verify if the collection exists, if not initialize it (though getDB does this)
    if (!db[collection]) {
        db[collection] = [];
    }

    // @ts-ignore - We know the type matches because of the collection key constraint
    db[collection].push(record);
    saveDB(db);
    return record;
}

export function updateRecord<T extends BaseRecord>(
    collection: CollectionName,
    id: string,
    payload: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): T | null {
    const db = getDB();
    // @ts-ignore
    const index = db[collection].findIndex((r) => r.id === id);

    if (index === -1) return null;

    const now = getTimestamp();
    const original = db[collection][index];

    const updated = {
        ...original,
        ...payload,
        updatedAt: now,
    };

    // @ts-ignore
    db[collection][index] = updated;
    saveDB(db);
    return updated as T;
}

export function deleteRecord(collection: CollectionName, id: string): boolean {
    const db = getDB();
    // @ts-ignore
    const initialLength = db[collection].length;
    // @ts-ignore
    db[collection] = db[collection].filter((r) => r.id !== id);

    // @ts-ignore
    if (db[collection].length < initialLength) {
        saveDB(db);
        return true;
    }
    return false;
}

export function queryCollection<T extends BaseRecord>(
    collection: CollectionName,
    filterFn?: (item: T) => boolean
): T[] {
    const db = getDB();
    // @ts-ignore
    const items = db[collection] as T[];

    if (!filterFn) return items;
    return items.filter(filterFn);
}

// Initialize on Load if needed
(function init() {
    if (typeof window !== 'undefined') {
        getDB(); // This will initialize if empty
    }
})();

// Async API (Maintained for backward compatibility with UI components)
export async function createRecordAsync<T extends BaseRecord>(
    collection: CollectionName,
    payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): Promise<T> {
    return createRecord<T>(collection, payload);
}

export async function updateRecordAsync<T extends BaseRecord>(
    collection: CollectionName,
    id: string,
    payload: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<T | null> {
    return updateRecord<T>(collection, id, payload);
}

export async function deleteRecordAsync(collection: CollectionName, id: string): Promise<boolean> {
    return deleteRecord(collection, id);
}

export async function queryCollectionAsync<T extends BaseRecord>(
    collection: CollectionName,
    filterFn?: (item: T) => boolean
): Promise<T[]> {
    return queryCollection(collection, filterFn);
}
