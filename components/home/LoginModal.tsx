import React, { useState } from 'react';
import { X, Lock, Key, ChevronRight, Loader2, User } from 'lucide-react';
import { useAuthSession } from '../../hooks/useAuthSession';
import { getCustomers, loginCustomer } from '../../storage/authStorage';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAdminMode?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, isAdminMode = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { loginAdmin: setAdmin, loginCustomer: setCustomer } = useAuthSession();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            if (isAdminMode) {
                // Simple admin check for demo
                const normalizedEmail = email.toLowerCase().trim();

                if ((normalizedEmail === 'admin@test.com' && password === 'Admin@123') || (normalizedEmail === 'ops@psifederal.com' && password === '1234')) {
                    const isOps = normalizedEmail === 'ops@psifederal.com';
                    await setAdmin({
                        id: isOps ? 'admin-ops' : 'admin-1',
                        email: email,
                        password: password,
                        name: isOps ? 'Operations Admin' : 'System Administrator',
                        role: isOps ? 'OPS_ADMIN' : 'SUPER_ADMIN',
                        createdAt: new Date().toISOString()
                    });
                    onClose();
                    // Force reload to ensure admin button appears
                    window.location.reload();
                } else {
                    setError('Invalid Administration Credentials');
                }
            } else {
                const normalizedIdentity = email.trim();
                const result = loginCustomer(normalizedIdentity, password);
                if (result) {
                    await setCustomer(result.user);
                    onClose();
                    window.location.reload();
                } else {
                    setError('Invalid Member Email or Access Code');
                }
            }
        } catch (err) {
            setError('Connection Timeout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001D4D]/90 backdrop-blur-md animate-in fade-in duration-300 px-6">
            <div className="w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl relative">
                {/* Header */}
                <div className={`p-8 pb-0 flex justify-between items-center`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#002D72]/5 rounded-lg text-[#002D72]">
                            {isAdminMode ? <Lock size={20} className="text-amber-600" /> : <User size={20} />}
                        </div>
                        <h3 className="text-xl font-black text-[#002D72] tracking-tight uppercase">
                            {isAdminMode ? 'Vault Access' : 'Member Sign In'}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8">
                    <p className="text-sm font-medium text-slate-500 mb-8">
                        {isAdminMode ? 'Authorized personnel authentication required.' : 'Enter your credentials to access your secure member dashboard.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Account Number</label>
                            <input
                                type="text"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#002D72] focus:ring-4 focus:ring-[#002D72]/5 outline-none font-medium transition font-mono"
                                placeholder="e.g. 1002003001"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Access Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-[#002D72] focus:ring-4 focus:ring-[#002D72]/5 outline-none font-medium transition"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute right-5 top-4 text-slate-300" size={20} />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-black flex items-center gap-3 border border-red-100 animate-in shake-in duration-300">
                                <div className="bg-red-600 w-1.5 h-1.5 rounded-full"></div>
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#002D72] focus:ring-[#002D72]" />
                                <span className="text-xs font-bold text-slate-500">Remember Me</span>
                            </label>
                            <a href="#" className="text-xs font-bold text-[#002D72] hover:underline underline-offset-4">Forgot ID?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#002D72] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#001D4D] transition shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <UnlockIcon isAdmin={isAdminMode} />}
                            {isLoading ? (isAdminMode ? 'Authenticating...' : 'Signing In...') : (isAdminMode ? 'Enter Vault' : 'Secure Login')}
                        </button>
                    </form>

                    {!isAdminMode && (
                        <p className="text-center mt-10 text-xs font-bold text-slate-400">
                            Not a member? <a href="#" className="text-[#002D72] hover:underline">Join Federal Trust today.</a>
                        </p>
                    )}
                </div>

                {/* Footer Guarantee */}
                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Secure 256-bit Encrypted Session</p>
                </div>
            </div>
        </div>
    );
};

const UnlockIcon = ({ isAdmin }: { isAdmin: boolean }) => (
    isAdmin ? <Key size={20} /> : <ChevronRight size={20} />
);
