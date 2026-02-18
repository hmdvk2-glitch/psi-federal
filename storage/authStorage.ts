import { AdminUser, AuthSession, CustomerUser, UserRole } from "../types/authTypes";
import { getDB, saveDB, queryCollection, queryCollectionAsync, BaseRecord } from "../src/lib/storageEngine";

export const STORAGE_KEYS = {
  ADMINS: "psifederal_admins",
  CUSTOMERS: "psifederal_customers",
  CURRENT_ADMIN: "psifederal_current_admin",
  CURRENT_CUSTOMER: "psifederal_current_customer",
} as const;

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// Demo Data Definitions
const defaultAdmins: any[] = [
  {
    id: "admin-1",
    email: "admin@test.com",
    password: "Admin@123",
    role: "SUPER_ADMIN",
    name: "System Administrator",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "admin-ops",
    email: "ops@psifederal.com",
    password: "1234",
    role: "OPS_ADMIN",
    name: "Jamal Washington",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const defaultCustomers: any[] = [
  {
    id: "cust-1",
    accountNumber: "1002003001",
    email: "member@test.com",
    password: "Test@123",
    balance: 32500,
    fullName: "Alex Morgan",
    memberSince: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active"
  },
  {
    id: "cust-2",
    accountNumber: "1002003002",
    email: "jordan@example.com",
    password: "1234",
    balance: 75000,
    fullName: "Jordan Chen",
    memberSince: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active"
  },
  {
    id: "cust-3",
    accountNumber: "9900112233",
    email: "sarah@psifederal.com",
    password: "1234",
    balance: 1542000,
    fullName: "Sarah Jenkins",
    memberSince: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active"
  },
];

export function initializeBankData(): void {
  const db = getDB();
  let updated = false;

  // Add admins if they don't exist
  defaultAdmins.forEach(def => {
    if (!db.admins.find(a => (a as any).email === def.email || a.id === def.id)) {
      db.admins.push(def);
      updated = true;
    }
  });

  // Add customers if they don't exist
  defaultCustomers.forEach(def => {
    if (!db.customers.find(c => (c as any).accountNumber === def.accountNumber || c.id === def.id)) {
      db.customers.push(def);
      updated = true;
    }
  });

  if (updated) {
    saveDB(db);
    console.log("BANK ENGINE: Core demo accounts validated.");
  }
}

export function getAdmins(): AdminUser[] {
  return queryCollection<any>('admins') as AdminUser[];
}

export async function getAdminsAsync(): Promise<AdminUser[]> {
  return queryCollectionAsync<any>('admins') as Promise<AdminUser[]>;
}

export function getCustomers(): CustomerUser[] {
  return queryCollection<any>('customers') as CustomerUser[];
}

export async function getCustomersAsync(): Promise<CustomerUser[]> {
  return queryCollectionAsync<any>('customers') as Promise<CustomerUser[]>;
}

export function getCurrentAdminSession(): AuthSession<AdminUser> | null {
  return safeParse<AuthSession<AdminUser> | null>(
    localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN),
    null,
  );
}

export function getCurrentCustomerSession(): AuthSession<CustomerUser> | null {
  return safeParse<AuthSession<CustomerUser> | null>(
    localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER),
    null,
  );
}

export function loginAdmin(email: string, password: string): AuthSession<AdminUser> | null {
  const admin = getAdmins().find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
  if (!admin) return null;

  const session: AuthSession<AdminUser> = {
    user: admin,
    timestamp: Date.now(),
    role: admin.role,
  };

  localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
  localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(session));
  return session;
}

export function loginCustomer(identity: string, password: string): AuthSession<CustomerUser> | null {
  const allCustomers = getCustomers();
  const customer = allCustomers.find(
    (c) => (
      c.accountNumber === identity ||
      c.email.toLowerCase() === identity.toLowerCase()
    ) && c.password === password
  );

  if (!customer) return null;

  const session: AuthSession<CustomerUser> = {
    user: customer,
    timestamp: Date.now(),
    role: "CUSTOMER",
  };

  localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
  localStorage.setItem(STORAGE_KEYS.CURRENT_CUSTOMER, JSON.stringify(session));
  return session;
}

export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
}

export function logoutCustomer(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
}

export function getCurrentRole(): UserRole | null {
  const admin = getCurrentAdminSession();
  if (admin) return admin.role;
  const customer = getCurrentCustomerSession();
  if (customer) return customer.role;
  return null;
}
