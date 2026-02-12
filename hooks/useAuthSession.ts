// PSI Federal - Session Hook
// Fortune 500 pattern: keep auth/session logic in one reusable hook.

import { useEffect, useState } from "react";
import { AdminUser, CustomerUser } from "../types/authTypes";
import { STORAGE_KEYS } from "../storage/authStorage";

type AdminStoredShape =
  | AdminUser
  | {
      user?: AdminUser;
    };

type CustomerStoredShape =
  | CustomerUser
  | {
      user?: CustomerUser;
    };

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function extractAdmin(value: string | null): AdminUser | null {
  const parsed = safeParse<AdminStoredShape>(value);
  if (!parsed) return null;
  if ("email" in parsed) return parsed;
  return parsed.user ?? null;
}

function extractCustomer(value: string | null): CustomerUser | null {
  const parsed = safeParse<CustomerStoredShape>(value);
  if (!parsed) return null;
  if ("accountNumber" in parsed) return parsed;
  return parsed.user ?? null;
}

export function useAuthSession() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN);
    const storedCustomer = localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER);

    const adminUser = extractAdmin(storedAdmin);
    const customerUser = extractCustomer(storedCustomer);

    if (adminUser) {
      setAdmin(adminUser);
    }
    if (customerUser) {
      setCustomer(customerUser);
    }
    setIsLoading(false);
  }, []);

  const loginAdmin = (adminUser: AdminUser): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
    localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(adminUser));
    setCustomer(null);
    setAdmin(adminUser);
  };

  const loginCustomer = (customerUser: CustomerUser): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    localStorage.setItem(STORAGE_KEYS.CURRENT_CUSTOMER, JSON.stringify(customerUser));
    setAdmin(null);
    setCustomer(customerUser);
  };

  const logout = (): void => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
    setAdmin(null);
    setCustomer(null);
  };

  const hasRole = (roles: Array<AdminUser["role"] | "CUSTOMER">): boolean => {
    if (admin) return roles.includes(admin.role);
    if (customer) return roles.includes("CUSTOMER");
    return false;
  };

  return {
    admin,
    customer,
    isLoading,
    loginAdmin,
    loginCustomer,
    logout,
    hasRole,
    isAuthenticated: !!(admin || customer),
  };
}

