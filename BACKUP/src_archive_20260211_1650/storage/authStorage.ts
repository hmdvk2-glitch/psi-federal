// 🗄️ PSI Federal - Bank Vault (localStorage edition)
// Real banks: Oracle databases with 24/7 monitoring
// Today: Browser storage - same logic, safer practice

import { AdminUser, CustomerUser } from '../types/authTypes';

// No magic strings - Fortune 500 Rule: Constants live in one place
export const STORAGE_KEYS = {
    ADMINS: 'psifederal_admins',
    CUSTOMERS: 'psifederal_customers',
    CURRENT_ADMIN: 'psifederal_current_admin',
    CURRENT_CUSTOMER: 'psifederal_current_customer'
} as const;

// 👑 SEED DATABASE - First day at the bank
export function initializeBankData(): void {

    // Check if we already have admins (don't overwrite!)
    if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
        const defaultAdmins: AdminUser[] = [
            {
                id: crypto.randomUUID(), // Generates unique ID like '123e4567-e89b-12d3-a456-426614174000'
                email: 'super@psifederal.com',
                password: '1234', // 🚨 TRAINING WHEELS - real banks use bcrypt + salt
                role: 'SUPER_ADMIN',
                name: 'Dr. Rivera (Bank President)',
                createdAt: new Date().toISOString()
            },
            {
                id: crypto.randomUUID(),
                email: 'ops@psifederal.com',
                password: '1234',
                role: 'OPS_ADMIN',
                name: 'Jamal Washington (Operations)',
                createdAt: new Date().toISOString()
            }
        ];

        localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(defaultAdmins));
        console.log('🏦 BANK SEEDED: Super Admin + Ops Admin created');
    }

    // Seed customers if none exist
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
        const defaultCustomers: CustomerUser[] = [
            {
                id: crypto.randomUUID(),
                accountNumber: '1002003001',
                password: '1234',
                balance: 50000,
                fullName: 'Alex Morgan',
                memberSince: new Date().toISOString()
            },
            {
                id: crypto.randomUUID(),
                accountNumber: '1002003002',
                password: '1234',
                balance: 75000,
                fullName: 'Jordan Chen',
                memberSince: new Date().toISOString()
            }
        ];

        localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(defaultCustomers));
        console.log('👥 CUSTOMERS SEEDED: 2 demo accounts');
    }
}

// 🔐 AUTH HELPERS - We'll build these out in next activities
export function getAdmins(): AdminUser[] {
    const data = localStorage.getItem(STORAGE_KEYS.ADMINS);
    return data ? JSON.parse(data) : [];
}

export function getCustomers(): CustomerUser[] {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : [];
}
