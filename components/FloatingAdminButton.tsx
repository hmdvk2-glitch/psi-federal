import React, { useState } from 'react';
import { Shield, Settings, Users, ArrowLeftRight, X } from 'lucide-react';
import AdminCommandPanel from './AdminCommandPanel';

export const FloatingAdminButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-8 right-8 z-[60]">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-[#002D72] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                    <Shield size={28} className="relative z-10" />
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="absolute top-8 right-8 z-[110]">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-12 h-12 bg-white text-[#002D72] rounded-full shadow-xl flex items-center justify-center hover:bg-slate-100 transition"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="h-full w-full overflow-y-auto pt-24 pb-12 px-6">
                        <div className="max-w-4xl mx-auto">
                            <AdminCommandPanel onClose={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
