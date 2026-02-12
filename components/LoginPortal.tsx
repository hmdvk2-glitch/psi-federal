import React, { useState } from 'react';
import { AdminLogin } from '../auth/AdminLogin';
import { CustomerLogin } from '../auth/CustomerLogin';

export const LoginPortal: React.FC = () => {
    const [isAdminLogin, setIsAdminLogin] = useState(true);

    return (
        <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 animate-in fade-in duration-500 hover:shadow-2xl transition">
            <div className="bg-[#0a1f44] text-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f44] to-[#123b7c] z-0"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#3BB3C3] relative z-10 mb-2">Secure Access</p>
                <h1 className="text-3xl font-black text-white relative z-10 tracking-tight">PSI Federal</h1>
                <p className="text-slate-300 relative z-10 text-sm mt-2 font-medium">Banking with Integrity</p>
            </div>

            <div className="p-8">
                <div className="bg-slate-100 p-1.5 rounded-xl flex mb-8 border border-slate-200 shadow-inner">
                    <button
                        onClick={() => setIsAdminLogin(true)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${isAdminLogin
                                ? 'bg-white text-[#0a1f44] shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Admin Access
                    </button>
                    <button
                        onClick={() => setIsAdminLogin(false)}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${!isAdminLogin
                                ? 'bg-white text-[#0a1f44] shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Member Login
                    </button>
                </div>

                <div className="transition-all duration-300">
                    {isAdminLogin ? (
                        <div className="animate-in slide-in-from-left-4 fade-in duration-300">
                            <AdminLogin />
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-right-4 fade-in duration-300">
                            <CustomerLogin />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
