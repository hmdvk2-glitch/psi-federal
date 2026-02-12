// 🎣 PSI Federal - Session Hook
// Fortune 500 Pattern: Encapsulate auth logic in custom hook

import { useState, useEffect } from 'react';
import { AdminUser, CustomerUser, AuthSession } from '../types/authTypes';
import { STORAGE_KEYS } from '../storage/authStorage';

export function useAuthSession() {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [customer, setCustomer] = useState<CustomerUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 🏦 Check vault for existing sessions on mount
    useEffect(() => {
        const storedAdmin = localStorage.getItem(STORAGE_KEYS.CURRENT_ADMIN);
        const storedCustomer = localStorage.getItem(STORAGE_KEYS.CURRENT_CUSTOMER);

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }

        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        }

        setIsLoading(false);
    }, []);

    // 🔐 Login admin
    const loginAdmin = (adminUser: AdminUser) => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(adminUser));
        setAdmin(adminUser);
    };

    // 👤 Login customer
    const loginCustomer = (customerUser: CustomerUser) => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_CUSTOMER, JSON.stringify(customerUser));
        setCustomer(customerUser);
    };

    // 🚪 Logout both (security best practice)
    const logout = () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_ADMIN);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_CUSTOMER);
        setAdmin(null);
        setCustomer(null);
    };

    // 👑 Role checker
    const hasRole = (roles: Array<AdminUser['role'] | 'CUSTOMER'>) => {
        if (admin) return roles.includes(admin.role);
        if (customer) return roles.includes('CUSTOMER');
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
        isAuthenticated: !!(admin || customer)
    };
}
