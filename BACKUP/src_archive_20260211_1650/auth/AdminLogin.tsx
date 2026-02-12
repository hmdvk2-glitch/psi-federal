// 🔐 PSI Federal - Admin Login Portal
// Fortune 500 Pattern: Controlled forms + immediate validation

import { useState } from 'react';
import { getAdmins, STORAGE_KEYS } from '../storage/authStorage';
import { AdminUser } from '../types/authTypes';

export function AdminLogin() {
    // 📝 Form state - React tracks every keystroke
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // 🚪 Handle login attempt
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Stop browser from refreshing

        // 1. Get current admins from vault
        const admins = getAdmins();

        // 2. Find matching credentials
        const foundAdmin = admins.find(
            admin => admin.email === email && admin.password === password
        );

        // 3. Login or show error
        if (foundAdmin) {
            // Save to session (persists until logout)
            localStorage.setItem(STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(foundAdmin));
            console.log('✅ LOGIN SUCCESS:', foundAdmin.name, 'as', foundAdmin.role);
            setError('');

            // Force page refresh to simulate redirect
            window.location.href = '/admin'; // We'll build this page later
        } else {
            setError('❌ Invalid email or password');
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
                🏦 Admin Access Only
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Sign In
                </button>
            </form>

            <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
                🔐 Demo credentials: super@psifederal.com / 1234
            </p>
        </div>
    );
}
