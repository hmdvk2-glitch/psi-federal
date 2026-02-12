import React from "react";
import { useAuthSession } from "../hooks/useAuthSession";

interface LogoutButtonProps {
  variant?: "admin" | "customer" | "default";
  redirectTo?: string;
}

export function LogoutButton({
  variant = "default",
  redirectTo = "/",
}: LogoutButtonProps): React.ReactElement {
  const { logout, admin, customer } = useAuthSession();

  const handleLogout = (): void => {
    logout();

    if (admin) {
      console.log(`AUDIT: Admin ${admin.email} logged out at ${new Date().toISOString()}`);
    }

    if (customer) {
      console.log(
        `AUDIT: Member ${customer.accountNumber} logged out at ${new Date().toISOString()}`,
      );
    }

    window.location.href = redirectTo;
  };

  const styleForVariant = (): React.CSSProperties => {
    if (variant === "admin") {
      return {
        backgroundColor: "#dc3545",
        color: "white",
        padding: "0.75rem 1.5rem",
      };
    }

    if (variant === "customer") {
      return {
        backgroundColor: "#6c757d",
        color: "white",
        padding: "0.75rem 1.5rem",
      };
    }

    return {
      backgroundColor: "#0a1f44",
      color: "white",
      padding: "0.5rem 1rem",
    };
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: 700,
        ...styleForVariant(),
      }}
    >
      {variant === "admin" ? "Admin Logout" : variant === "customer" ? "Logout" : "Sign Out"}
    </button>
  );
}
