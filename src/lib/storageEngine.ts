export type CollectionName = 'admins' | 'customers' | 'transactions' | 'charges' | 'transferCodes' | 'offers' | 'leads';

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
    offers: BaseRecord[];
    leads: BaseRecord[];
}

const DB_KEY = 'psiFederalSimDB';
const CLOUD_SYNC_KEY = 'psiFederalSyncUser'; // Key to store the current sync ID
const KVDB_BUCKET = 'psi_federal_trust_v1'; // Hidden bucket name
const KVDB_URL = `https://kvdb.io/${KVDB_BUCKET}/`;

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
            offers: [],
            leads: []
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
            offers: [],
            leads: []
        };
        saveDB(fallbackDB);
        return fallbackDB;
    }
}

export function saveDB(db: PsiFederalSimDB): void {
    const data = JSON.stringify(db);
    localStorage.setItem(DB_KEY, data);

    // Auto-sync if we have a cloud identity
    const syncUser = localStorage.getItem(CLOUD_SYNC_KEY);
    if (syncUser) {
        pushToCloud(syncUser, data);
    }
}

async function pushToCloud(username: string, data: string) {
    try {
        await fetch(`${KVDB_URL}${username}`, {
            method: 'PUT',
            body: data,
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(`[CloudSync] Data mirrored to cloud for: ${username}`);
    } catch (e) {
        console.warn('[CloudSync] Failed to mirror data:', e);
    }
}

export async function pullFromCloud(username: string): Promise<boolean> {
    try {
        const response = await fetch(`${KVDB_URL}${username}`);
        if (response.ok) {
            const cloudData = await response.text();
            if (cloudData && cloudData.trim().startsWith('{')) {
                localStorage.setItem(DB_KEY, cloudData);
                localStorage.setItem(CLOUD_SYNC_KEY, username);
                console.log(`[CloudSync] Success! Data pulled for: ${username}`);
                return true;
            }
        }
        return false;
    } catch (e) {
        console.error('[CloudSync] Pull error:', e);
        return false;
    }
}

export function setSyncIdentity(username: string) {
    localStorage.setItem(CLOUD_SYNC_KEY, username);
}

export function clearSyncIdentity() {
    localStorage.removeItem(CLOUD_SYNC_KEY);
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
