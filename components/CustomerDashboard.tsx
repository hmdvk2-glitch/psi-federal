import React from "react";
import { useAuthSession } from "../hooks/useAuthSession";
import { LogoutButton } from "../auth/LogoutButton";
import { CreditCard, Wallet, AlertCircle } from "lucide-react";
import { TransferModal } from "./TransferModal";

export const CustomerDashboard: React.FC = () => {
    const { customer, isLoading } = useAuthSession();
    const [isTransferOpen, setIsTransferOpen] = React.useState(false);

    if (isLoading || !customer) return null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0a1f44] to-[#1d4e89] text-white rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                {/* ... banner content ... */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
                <div className="relative z-10">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-2">Member Portal</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">My Finances</h1>
                    <p className="text-blue-100 text-lg">Good afternoon, <span className="font-bold text-white">{customer.fullName}</span></p>
                </div>
            </div>

            {/* Account Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:border-[#0a1f44]/20 transition flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Checking Account</p>
                                <p className="font-mono text-sm text-slate-500 tracking-wider">****{customer.accountNumber.slice(-4)}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl text-green-700">
                                <Wallet size={24} />
                            </div>
                        </div>
                        <p className="text-4xl font-black text-[#0a1f44] tracking-tight">
                            ${customer.balance.toLocaleString()}
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
                        <button
                            onClick={() => setIsTransferOpen(true)}
                            className="bg-[#0B2E4F] text-white px-4 py-2 rounded-lg text-sm font-bold flex-1 hover:bg-[#071F36] transition shadow-lg shadow-blue-900/10"
                        >
                            Transfer
                        </button>
                        <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex-1 hover:bg-slate-200 transition">Statements</button>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#1d4e89] to-[#0a1f44] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-white/5 opacity-50 backdrop-blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">Credit Score</p>
                            </div>
                            <div className="p-3 bg-white/10 rounded-xl text-white">
                                <CreditCard size={24} />
                            </div>
                        </div>
                        <p className="text-4xl font-black tracking-tight">720</p>
                        <p className="text-sm font-medium text-green-400 mt-2 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Excellent
                        </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                        <p className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-2">Next Payment</p>
                        <p className="text-lg font-bold">No payments due</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <LogoutButton variant="customer" />
            </div>

            <TransferModal
                isOpen={isTransferOpen}
                onClose={() => setIsTransferOpen(false)}
                onSuccess={() => {
                    setIsTransferOpen(false);
                    // Force refresh or just show success is handled in modal
                    window.location.reload(); // Quick simulation refresh
                }}
                amount={5000} // Hardcoded simulation amount for now
            />
        </div>
    );
};
