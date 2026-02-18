import React, { useState, useEffect } from 'react';
import { useAuthSession } from '../../hooks/useAuthSession';
import { getTransactionsForCustomer, DBTransaction } from '../../src/lib/bankingService';
import {
    BarChart3,
    Settings,
    LogOut,
    Bell,
    Search,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
    Clock,
    ShieldCheck,
    Smartphone,
    ChevronRight,
    Plus
} from 'lucide-react';
import { AtmCardVisual } from './AtmCardVisual';
import { TransferModal } from './TransferModal';

export const MemberDashboard: React.FC = () => {
    const { customer, logout } = useAuthSession();
    const [activeTab, setActiveTab] = useState<'accounts' | 'services' | 'security'>('accounts');
    const [transactions, setTransactions] = useState<DBTransaction[]>([]);
    const [isRequestingCard, setIsRequestingCard] = useState(false);
    const [cardStatus, setCardStatus] = useState<'none' | 'processing'>('none');
    const [isTransferOpen, setIsTransferOpen] = useState(false);

    useEffect(() => {
        if (customer) {
            setTransactions(getTransactionsForCustomer(customer.id).reverse());
        }
    }, [customer]);

    if (!customer) return null;

    const handleRequestCard = (e: React.FormEvent) => {
        e.preventDefault();
        setIsRequestingCard(true);
        setTimeout(() => {
            setCardStatus('processing');
            setIsRequestingCard(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Dashboard Navbar */}
            <nav className="bg-[#002D72] text-white px-6 py-4 shadow-xl">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-lg text-[#002D72]">
                            <BarChart3 size={20} strokeWidth={3} />
                        </div>
                        <span className="font-black uppercase tracking-tighter text-xl italic">PSI Federal <span className="text-blue-300">CU</span></span>
                    </div>

                    <div className="flex items-center gap-4 lg:gap-8">
                        <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">
                            <a href="#" className="hover:text-white transition">Transfers</a>
                            <a href="#" className="hover:text-white transition">Bill Pay</a>
                            <a href="#" className="hover:text-white transition">Deposits</a>
                        </div>
                        <div className="flex items-center gap-3 border-l border-white/10 pl-4 lg:pl-8">
                            <button className="p-2 hover:bg-white/10 rounded-full transition text-blue-200 hover:text-white"><Bell size={18} /></button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition text-blue-200 hover:text-white"><Settings size={18} /></button>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition"
                            >
                                <LogOut size={14} /> <span className="hidden sm:inline">Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sub-Header / Welcome */}
            <div className="bg-white border-b border-slate-200 px-6 py-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Secure Member Session</p>
                        <h2 className="text-3xl font-black text-[#002D72] tracking-tight italic">Welcome back, {customer.fullName.split(' ')[0]}</h2>
                    </div>
                    <div className="flex gap-2">
                        {['accounts', 'services', 'security'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                    ? 'bg-[#002D72] text-white shadow-lg shadow-blue-900/20'
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-[#002D72]'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {activeTab === 'accounts' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Account Summary */}
                        <div className="lg:col-span-2 space-y-10">
                            <section className="bg-white rounded-[40px] p-10 shadow-premium border border-slate-100">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Total Balance</h3>
                                        <p className="text-6xl font-black text-[#002D72] tracking-tighter">${customer.balance.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-[#002D72]/5 p-4 rounded-3xl text-[#002D72]">
                                        <Smartphone size={32} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-[#002D72] rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-16 -mt-16"></div>
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-1">Checking Account</p>
                                            <p className="text-xs text-white/40 mb-6">•••• {customer.accountNumber.slice(-4)}</p>
                                            <p className="text-3xl font-black">${customer.balance.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-[#002D72]/30 hover:text-[#002D72] transition cursor-pointer">
                                        <Plus size={32} />
                                        <span className="text-[10px] font-black uppercase tracking-widest mt-2">Open New Account</span>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white rounded-[40px] p-10 shadow-premium border border-slate-100 overflow-hidden">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-xl font-black text-[#002D72] tracking-tight uppercase italic">Recent Transactions</h3>
                                    <button className="text-[10px] font-black text-[#002D72] flex items-center gap-1 uppercase tracking-widest hover:underline">Download PDF <ChevronRight size={14} /></button>
                                </div>

                                {transactions.length === 0 ? (
                                    <div className="py-20 text-center space-y-4">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                                            <Clock size={32} />
                                        </div>
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No transaction records found</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {transactions.map((txn) => (
                                            <div key={txn.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-4 rounded-xl ${txn.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                                        {txn.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-[#002D72] text-sm group-hover:underline">{txn.description}</p>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{new Date(txn.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • {txn.transactionId}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm font-black ${txn.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                                        {txn.type === 'credit' ? '+' : '-'}${txn.amount.toLocaleString()}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Completed</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar Widgets */}
                        <div className="space-y-10">
                            <div className="bg-[#002D72] rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[40px] -mr-20 -mb-20"></div>
                                <div className="relative z-10">
                                    <ShieldCheck size={40} className="text-emerald-400 mb-6" />
                                    <h4 className="text-2xl font-black tracking-tight mb-4">Financial Wellness</h4>
                                    <div className="flex items-end gap-2 mb-6">
                                        <span className="text-5xl font-black">740</span>
                                        <span className="text-xs font-bold text-emerald-400 mb-1 uppercase tracking-widest">Excellent</span>
                                    </div>
                                    <p className="text-sm text-blue-100/60 font-medium leading-relaxed mb-8">Your credit usage is optimized. You've unlocked our lowest mortgage rates!</p>
                                    <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition">Full Analysis</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] p-10 shadow-premium border border-slate-100 flex flex-col justify-between aspect-square">
                                <h4 className="text-sm font-black uppercase tracking-widest text-[#002D72]">Quick Actions</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <QuickAction label="Send Money" color="bg-blue-50" onClick={() => setIsTransferOpen(true)} />
                                    <QuickAction label="Pay Bills" color="bg-amber-50" />
                                    <QuickAction label="Zelle®" color="bg-purple-50" />
                                    <QuickAction label="Help" color="bg-slate-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-white rounded-[40px] p-12 shadow-premium border border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h3 className="text-3xl font-black text-[#002D72] tracking-tight mb-6 italic">ATM Card Management</h3>
                                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                                        Request a new physical debit card with Federal Trust's premium finish. Includes zero-liability protection and global ATM access.
                                    </p>

                                    {cardStatus === 'processing' ? (
                                        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-center gap-4 text-emerald-800 animate-in zoom-in duration-300">
                                            <ShieldCheck className="text-emerald-600" size={32} />
                                            <div>
                                                <p className="font-black uppercase text-xs tracking-widest">Request Received</p>
                                                <p className="text-sm font-medium">Your card is being provisioned. Estimated arrival: 5-7 business days.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleRequestCard} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Mailing Address</label>
                                                <input required type="text" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#002D72] outline-none text-sm font-bold" placeholder="123 Financial Lane, NY" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Contact Phone</label>
                                                <input required type="tel" className="w-full px-5 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#002D72] outline-none text-sm font-bold" placeholder="+1 (555) 000-0000" />
                                            </div>
                                            <button
                                                disabled={isRequestingCard}
                                                className="w-full btn-primary py-4 text-xs tracking-[0.2em] font-black disabled:opacity-50"
                                            >
                                                {isRequestingCard ? 'SUBMITTING REQUEST...' : 'REQUEST PHYSICAL CARD'}
                                            </button>
                                        </form>
                                    )}
                                </div>

                                <div className="flex flex-col items-center gap-8">
                                    <AtmCardVisual customerName={customer.fullName} maskedNumber={`•••• •••• •••• ${customer.accountNumber.slice(-4)}`} />
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <CreditCard size={18} />
                                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                        <ShieldCheck size={18} />
                                        <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                                        <Clock size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <TransferModal
                isOpen={isTransferOpen}
                onClose={() => setIsTransferOpen(false)}
                onSuccess={() => {
                    // Refresh transactions
                    if (customer) {
                        setTransactions(getTransactionsForCustomer(customer.id).reverse());
                    }
                }}
            />
        </div>
    );
};

const QuickAction = ({ label, color, onClick }: { label: string; color: string; onClick?: () => void }) => (
    <button onClick={onClick} className={`${color} p-6 rounded-3xl flex flex-col items-center justify-center gap-3 hover:scale-105 transition duration-300 group`}>
        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#002D72] group-hover:bg-[#002D72] group-hover:text-white transition">
            <Plus size={20} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#002D72]">{label}</span>
    </button>
);
