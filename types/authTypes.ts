// PSI Federal - Type Safe Vault
// Grade 10 note: Types are like rules on a football field.
// They tell us what is valid before the game (app) even starts.

// All access levels in this simulation.
export type UserRole = "SUPER_ADMIN" | "OPS_ADMIN" | "SUPPORT_ADMIN" | "CUSTOMER";

// Admins can only be admin roles, never CUSTOMER.
export type AdminRole = Exclude<UserRole, "CUSTOMER">;

// Bank employee record for login and role checks.
export interface AdminUser {
  id: string;
  email: string;
  password: string; // Simulation only. Real banks use hashed passwords on secure servers.
  role: AdminRole;
  name: string;
  createdAt: string;
}

// Bank member record for customer login.
export interface CustomerUser {
  id: string;
  accountNumber: string;
  email: string;
  password: string; // Simulation only. Never store plain text in production.
  balance: number;
  fullName: string;
  memberSince: string;
}

// Session object stored while a user is logged in.
export interface AuthSession<T = AdminUser | CustomerUser> {
  user: T;
  timestamp: number;
  role: UserRole;
}

