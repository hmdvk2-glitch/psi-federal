// 👤 PSI Federal - Member Login Portal
// Same pattern as Admin - different validation rules

import { useState } from 'react';
import { getCustomers, STORAGE_KEYS } from '../storage/authStorage';
import { useAuthSession } from '../hooks/useAuthSession';

export function CustomerLogin() {
    const [accountNumber, setAccountNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { loginCustomer } = useAuthSession();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const customers = getCustomers();

        const foundCustomer = customers.find(
            customer => customer.accountNumber === accountNumber && customer.password === password
        );

        if (foundCustomer) {
            loginCustomer(foundCustomer);
            console.log('✅ MEMBER LOGIN:', foundCustomer.fullName);
            setError('');
            window.location.href = '/dashboard'; // Member dashboard
        } else {
            setError('❌ Invalid account number or password');
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '2rem auto',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            backgroundColor: 'white'
        }}>
            <h2 style={{ color: '#0a1f44', marginBottom: '1.5rem' }}>
                👤 Member Access
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Account Number:
                    </label>
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem'
                        }}
                        placeholder="10-digit account number"
                        required
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '1rem'
                        }}
                        required
                    />
                </div>

                {error && (
                    <div style={{
                        color: 'red',
                        marginBottom: '1rem',
                        padding: '0.5rem',
                        backgroundColor: '#ffeeee',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#0a1f44',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Sign In to Online Banking
                </button>
            </form>

            <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
                🔐 Demo account: 1002003001 / 1234
            </p>
        </div>
    );
}
