// 🚪 PSI Federal - Universal Logout Button
// Fortune 500 Pattern: One component, many uses

import { useAuthSession } from '../hooks/useAuthSession';

interface LogoutButtonProps {
    variant?: 'admin' | 'customer' | 'default';
    redirectTo?: string;
}

export function LogoutButton({
    variant = 'default',
    redirectTo = '/'
}: LogoutButtonProps) {

    const { logout, admin, customer } = useAuthSession();

    const handleLogout = () => {
        // Clear session from memory AND localStorage
        logout();

        // Log who logged out (audit trail)
        if (admin) {
            console.log(`📋 AUDIT: Admin ${admin.email} logged out at ${new Date().toISOString()}`);
        }
        if (customer) {
            console.log(`📋 AUDIT: Member ${customer.accountNumber} logged out at ${new Date().toISOString()}`);
        }

        // Redirect to login
        window.location.href = redirectTo;
    };

    // Style based on who's using it
    const getStyles = () => {
        switch (variant) {
            case 'admin':
                return {
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '0.75rem 1.5rem'
                };
            case 'customer':
                return {
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '0.75rem 1.5rem'
                };
            default:
                return {
                    backgroundColor: '#0a1f44',
                    color: 'white',
                    padding: '0.5rem 1rem'
                };
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                ...getStyles()
            }}
        >
            🚪 {variant === 'admin' ? 'Admin Logout' : variant === 'customer' ? 'Logout' : 'Sign Out'}
        </button>
    );
}
