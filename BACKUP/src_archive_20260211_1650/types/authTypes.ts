// 🏦 PSI Federal - Type Safe Vault
// Fortune 500 Rule: Every data structure needs strict typing
// Grade 10: Types = rules that prevent bugs before they happen

// Who can use this system?
export type UserRole =
    | 'SUPER_ADMIN'    // 👑 Bank President - can do everything
    | 'OPS_ADMIN'      // 💼 Operations Manager - can view and edit accounts
    | 'SUPPORT_ADMIN'  // 🎧 Customer Support - read only
    | 'CUSTOMER';      // 👤 Bank member - can view own accounts

// Bank employee badge
export interface AdminUser {
    id: string;              // Unique employee ID
    email: string;           // Work email
    password: string;        // 🔐 SIMULATION ONLY - real banks never store plain text!
    role: Exclude<UserRole, 'CUSTOMER'>; // Admin can't be customer
    name: string;            // Full name
    createdAt: string;       // ISO date when hired
}

// Bank member account
export interface CustomerUser {
    id: string;              // Internal ID
    accountNumber: string;   // 10-digit account number
    password: string;        // 🔐 SIMULATION ONLY - encrypted in real world
    balance: number;         // Current balance in dollars
    fullName: string;        // Member name
    memberSince: string;     // ISO date when joined
}

// Active login session
export interface AuthSession<T = AdminUser | CustomerUser> {
    user: T;                 // Who logged in
    timestamp: number;       // When they logged in (Date.now())
    role: UserRole;          // Quick access to role
}
