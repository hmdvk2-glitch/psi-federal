// 🛡️ PSI Federal - Role Guard
// Fortune 500 Pattern: Protect routes like a bank vault
// If you don't have the right key, you don't get in

import { ReactNode } from 'react';
import { useAuthSession } from '../hooks/useAuthSession';
import { UserRole } from '../types/authTypes';

interface RoleGuardProps {
    children: ReactNode;           // What to show if authorized
    fallback?: ReactNode;         // What to show if not authorized
    allowedRoles: UserRole[];     // Who can see this
}

export function RoleGuard({
    children,
    fallback = <p>🔒 Access Denied - Admin privileges required</p>,
    allowedRoles
}: RoleGuardProps) {

    const { hasRole, isLoading } = useAuthSession();

    // ⏳ Still checking credentials
    if (isLoading) {
        return <p>Loading security clearance...</p>;
    }

    // ✅ Authorized
    if (hasRole(allowedRoles)) {
        return <>{children}</>;
    }

    // ❌ Not authorized
    return <>{fallback}</>;
}
