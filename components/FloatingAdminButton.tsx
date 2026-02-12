import React, { useState } from 'react';
import { useAuthSession } from '../hooks/useAuthSession';
import { Shield, ChevronUp } from 'lucide-react';
import AdminCommandPanel from './AdminCommandPanel';

const FloatingAdminButton: React.FC = () => {
    const { admin } = useAuthSession();
    const [isOpen, setIsOpen] = useState(false);

    // Only show if an admin is logged in
    if (!admin) return null;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40 group">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#0B2E4F] text-white p-4 rounded-full shadow-2xl hover:bg-[#071F36] hover:scale-110 transition-all duration-300 border-4 border-[#2E9E6F]"
                    title="Admin Command Console"
                >
                    <Shield className="w-6 h-6 animate-pulse" />
                </button>
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    Admin Console
                </span>
            </div>

            {isOpen && <AdminCommandPanel onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default FloatingAdminButton;
