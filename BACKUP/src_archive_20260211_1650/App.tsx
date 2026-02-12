import { useState } from 'react';
import { useAuthSession } from './hooks/useAuthSession';
import { AdminLogin } from './auth/AdminLogin';
import { CustomerLogin } from './auth/CustomerLogin';
import { RoleGuard } from './auth/RoleGuard';
import { LogoutButton } from './auth/LogoutButton';

// 🏦 ADMIN DASHBOARD (Protected)
function AdminDashboard() {
    const { admin } = useAuthSession();

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ color: '#0a1f44' }}>🏦 PSI Federal - Admin Portal</h1>
            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h2>Welcome, {admin?.name}</h2>
                <p>Role: <strong style={{
                    color: admin?.role === 'SUPER_ADMIN' ? '#0a1f44' : '#2c7da0'
                }}>{admin?.role}</strong></p>

                {/* 👑 Role-based content - only SUPER_ADMIN sees this */}
                <RoleGuard allowedRoles={['SUPER_ADMIN']}>
                    <div style={{
                        backgroundColor: '#e9ecef',
                        padding: '1rem',
                        borderRadius: '4px',
                        marginTop: '1rem'
                    }}>
                        <h3>👑 Super Admin Controls</h3>
                        <p>Create new employees • System settings • Audit logs</p>
                        <button style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#0a1f44',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}>
                            Create New Admin (Phase 2)
                        </button>
                    </div>
                </RoleGuard>

                {/* 💼 OPS_ADMIN and SUPPORT_ADMIN see this */}
                <RoleGuard allowedRoles={['OPS_ADMIN', 'SUPPORT_ADMIN', 'SUPER_ADMIN']}>
                    <div style={{ marginTop: '1rem' }}>
                        <h3>📊 Customer Operations</h3>
                        <p>View accounts • Transaction history • Member support</p>
                    </div>
                </RoleGuard>

                <div style={{ marginTop: '2rem' }}>
                    <LogoutButton variant="admin" />
                </div>
            </div>
        </div>
    );
}

// 👤 CUSTOMER DASHBOARD
function CustomerDashboard() {
    const { customer } = useAuthSession();

    return (
        <div style={{ padding: '2rem' }}>
            <h1 style={{ color: '#0a1f44' }}>👤 Welcome, {customer?.fullName}</h1>
            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                marginTop: '1rem'
            }}>
                <h2>Account Summary</h2>
                <p>Account: {customer?.accountNumber}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    Balance: ${customer?.balance.toLocaleString()}
                </p>

                <div style={{ marginTop: '1rem' }}>
                    <LogoutButton variant="customer" />
                </div>
            </div>
        </div>
    );
}

// 🚪 LOGIN PORTAL
function LoginPortal() {
    const [isAdminLogin, setIsAdminLogin] = useState(true);

    return (
        <div>
            <div style={{
                padding: '1rem',
                backgroundColor: '#0a1f44',
                color: 'white',
                textAlign: 'center'
            }}>
                <h1>🏦 PSI Federal Credit Union</h1>
                <p>serving our members since 1970 with trust, integrity, and institutional strength.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <button
                    onClick={() => setIsAdminLogin(true)}
                    style={{
                        padding: '0.75rem 2rem',
                        backgroundColor: isAdminLogin ? '#0a1f44' : '#e9ecef',
                        color: isAdminLogin ? 'white' : '#0a1f44',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    🏦 Admin Access
                </button>
                <button
                    onClick={() => setIsAdminLogin(false)}
                    style={{
                        padding: '0.75rem 2rem',
                        backgroundColor: !isAdminLogin ? '#0a1f44' : '#e9ecef',
                        color: !isAdminLogin ? 'white' : '#0a1f44',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    👤 Member Login
                </button>
            </div>

            {isAdminLogin ? <AdminLogin /> : <CustomerLogin />}
        </div>
    );
}

// 🎯 MAIN APP ROUTER
function App() {
    const { admin, customer, isLoading } = useAuthSession();

    if (isLoading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>🔐 Loading secure session...</div>;
    }

    // Route to appropriate dashboard based on who's logged in
    if (admin) {
        return <AdminDashboard />;
    }

    if (customer) {
        return <CustomerDashboard />;
    }

    return <LoginPortal />;
}

export default App;
