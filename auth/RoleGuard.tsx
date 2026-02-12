import React, { ReactNode } from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { UserRole } from "../types/authTypes";

interface RoleGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({
  children,
  fallback = <p>Access denied - role permission required.</p>,
  allowedRoles,
}: RoleGuardProps): React.ReactElement {
  const { hasRole, isLoading } = useAuthSession();

  if (isLoading) {
    return <p>Loading security clearance...</p>;
  }

  if (hasRole(allowedRoles)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
