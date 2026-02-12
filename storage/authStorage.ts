// PSI Federal - localStorage Auth Vault
// Grade 10: This simulates a bank database inside the browser.
// Real banks store this on secure backend systems, not localStorage.

import { AdminUser, AuthSession, CustomerUser, UserRole } from "../types/authTypes";

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

function createId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(36).slice(2, 10)}`;
}

// Bootstraps demo users so students can log in immediately.
export function initializeBankData(): void {
  if (!localStorage.getItem(STORAGE_KEYS.ADMINS)) {
    const defaultAdmins: AdminUser[] = [
      {
        id: createId(),
        email: "super@psifederal.com",
        password: "1234",
        role: "SUPER_ADMIN",
        name: "Dr. Rivera (Bank President)",
        createdAt: new Date().toISOString(),
      },
      {
        id: createId(),
        email: "ops@psifederal.com",
        password: "1234",
        role: "OPS_ADMIN",
        name: "Jamal Washington (Operations)",
        createdAt: new Date().toISOString(),
      },
      {
        id: createId(),
        email: "support@psifederal.com",
        password: "1234",
        role: "SUPPORT_ADMIN",
        name: "Priya Patel (Support)",
        createdAt: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(defaultAdmins));
    console.log("BANK SEEDED: Admin accounts created");
  }

  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    const defaultCustomers: CustomerUser[] = [
      {
        id: createId(),
        accountNumber: "1002003001",
        password: "1234",
        balance: 50000,
        fullName: "Alex Morgan",
        memberSince: new Date().toISOString(),
      },
      {
        id: createId(),
        accountNumber: "1002003002",
        password: "1234",
        balance: 75000,
        fullName: "Jordan Chen",
        memberSince: new Date().toISOString(),
      },
    ];

    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(defaultCustomers));
    console.log("BANK SEEDED: Customer demo accounts created");
  }
}

export function getAdmins(): AdminUser[] {
  return safeParse<AdminUser[]>(localStorage.getItem(STORAGE_KEYS.ADMINS), []);
}

export function getCustomers(): CustomerUser[] {
  return safeParse<CustomerUser[]>(localStorage.getItem(STORAGE_KEYS.CUSTOMERS), []);
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
  const admin = getAdmins().find((a) => a.email === email && a.password === password);
  if (!admin) return null;

  const session: AuthSession<AdminUser> = {
    user: admin,
    timestamp: Date.now(),
    role: admin.role,
  };

  // Keep only one active user context at a time.
  localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
  localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(session));
  return session;
}

export function loginCustomer(
  accountNumber: string,
  password: string,
): AuthSession<CustomerUser> | null {
  const customer = getCustomers().find(
    (c) => c.accountNumber === accountNumber && c.password === password,
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

