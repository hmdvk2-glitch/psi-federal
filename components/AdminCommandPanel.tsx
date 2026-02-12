import React, { useState, useEffect } from 'react';
import { useAuthSession } from '../hooks/useAuthSession';
import { X, Shield, Plus, DollarSign, Users, Lock, ChevronRight, Save } from 'lucide-react';
import { BaseRecord, createRecord, queryCollection } from '../src/lib/storageEngine';
import { createCustomer, createTransaction, getAllCustomers, DBUser } from '../src/lib/bankingService';
import { getTransferCodes, saveTransferCodes } from '../src/lib/transferCodeService';
import { STORAGE_KEYS } from '../storage/authStorage';

const AdminCommandPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { admin } = useAuthSession();
    const [activeTab, setActiveTab] = useState<'users' | 'transact' | 'admin'>('users');
    const [customers, setCustomers] = useState<DBUser[]>([]);

    // Form States
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', balance: 0 });
    const [transaction, setTransaction] = useState({ account: '', amount: 0, type: 'credit', charges: 0 });
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // Code Mgmt
    const [codes, setCodes] = useState({ cot: '', tax: '', irs: '' });

    useEffect(() => {
        // Load customers on mount
        refreshCustomers();
        // Load codes
        const saved = getTransferCodes();
        if (saved) {
            setCodes({ cot: saved.cot, tax: saved.tax, irs: saved.irs });
        }
    }, []);

    const refreshCustomers = () => {
        const list = getAllCustomers();
        setCustomers(list);
    };

    const handleCreateCustomer = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const accountNum = "ACCT-" + Math.floor(10000000 + Math.random() * 90000000);
            createCustomer({
                accountNumber: accountNum,
                fullName: newCustomer.name,
                email: newCustomer.email,
                password: 'demo', // Default demo password
                balance: Number(newCustomer.balance),
                status: 'active'
            });
            setStatusMessage(`Created ${newCustomer.name} (${accountNum})`);
            setNewCustomer({ name: '', email: '', balance: 0 });
            refreshCustomers();
        } catch (err: any) {
            setStatusMessage("Error: " + err.message);
        }
    };

    const handleCreateTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const customer = customers.find(c => c.accountNumber === transaction.account);
            if (!customer) throw new Error("Account not found");

            createTransaction({
                customerId: customer.id,
                type: transaction.type as any,
                amount: Number(transaction.amount),
                description: `Admin ${transaction.type} injection`,
                chargesApplied: Number(transaction.charges),
                status: 'completed',
                date: new Date().toISOString()
            });

            setStatusMessage(`Transaction successful: $${transaction.amount} to ${customer.fullName} `);
            refreshCustomers(); // Update balances
        } catch (err: any) {
            setStatusMessage("Error: " + err.message);
        }
    };

    const handleSaveCodes = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            saveTransferCodes(codes.cot, codes.tax, codes.irs, admin?.id || 'admin');
            setStatusMessage("Transfer codes updated securely.");
        } catch (err: any) {
            setStatusMessage("Error saving codes: " + err.message);
        }
    };

    if (!admin) return null;

    const tabs = [
        { id: 'users', label: 'User Mgmt', icon: Users, roles: ['SUPER_ADMIN', 'OPS_ADMIN'] },
        { id: 'transact', label: 'Transactions', icon: DollarSign, roles: ['SUPER_ADMIN', 'OPS_ADMIN'] },
        { id: 'admin', label: 'Admin Ops', icon: Shield, roles: ['SUPER_ADMIN'] },
    ];

    const allowedTabs = tabs.filter(t => t.roles.includes(admin.role));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="bg-[#0B2E4F] text-white p-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Shield className="w-6 h-6 text-[#FFD700]" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Admin Command Console</h2>
                            <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                {admin.role.replace('_', ' ')} ACTIVE
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Status Bar */}
                {statusMessage && (
                    <div className="bg-amber-100 text-amber-800 px-6 py-2 text-sm font-bold border-b border-amber-200 flex justify-between items-center">
                        <span>{statusMessage}</span>
                        <button onClick={() => setStatusMessage(null)}><X size={14} /></button>
                    </div>
                )}

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-64 bg-slate-50 border-r border-slate-200 p-4 space-y-2">
                        {allowedTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`w - full flex items - center gap - 3 px - 4 py - 3 rounded - lg text - sm font - bold transition - all ${activeTab === tab.id
                                    ? 'bg-[#0B2E4F] text-white shadow-lg shadow-blue-900/20'
                                    : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                                    } `}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                                {activeTab === tab.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto bg-white">
                        {activeTab === 'users' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-[#0B2E4F]">Customer Provisioning</h3>
                                        <p className="text-slate-500 mt-1">Create and manage member entities.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Create Form */}
                                    <form onSubmit={handleCreateCustomer} className="space-y-4">
                                        <h4 className="font-bold text-[#0B2E4F] uppercase text-xs tracking-wider">New Customer Profile</h4>
                                        <input
                                            value={newCustomer.name}
                                            onChange={e => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full p-3 border rounded-lg text-sm"
                                            required
                                        />
                                        <input
                                            value={newCustomer.email}
                                            onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                            type="email"
                                            placeholder="Email Address"
                                            className="w-full p-3 border rounded-lg text-sm"
                                            required
                                        />
                                        <input
                                            value={newCustomer.balance}
                                            onChange={e => setNewCustomer({ ...newCustomer, balance: Number(e.target.value) })}
                                            type="number"
                                            placeholder="Initial Balance"
                                            className="w-full p-3 border rounded-lg text-sm"
                                        />
                                        <button type="submit" className="bg-[#2E9E6F] text-white w-full py-3 rounded-lg font-bold hover:bg-[#24805A]">
                                            Create Account
                                        </button>
                                    </form>

                                    {/* Recent List */}
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 h-64 overflow-y-auto">
                                        <h4 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-3">Recent Customers</h4>
                                        <div className="space-y-2">
                                            {customers.length === 0 ? <p className="text-xs text-slate-400">No customers found.</p> :
                                                customers.map(c => (
                                                    <div key={c.id} className="bg-white p-2 rounded shadow-sm border border-slate-100 flex justify-between items-center">
                                                        <div>
                                                            <p className="font-bold text-xs text-[#0B2E4F]">{c.fullName}</p>
                                                            <p className="text-[10px] text-slate-400 font-mono">{c.accountNumber}</p>
                                                        </div>
                                                        <span className="text-xs font-bold text-green-600">${c.balance.toLocaleString()}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'transact' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-[#0B2E4F]">Transaction Tunnel</h3>
                                        <p className="text-slate-500 mt-1">Inject transactions bypassing the core ledger.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleCreateTransaction} className="space-y-4 max-w-lg">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Target Account</label>
                                        <select
                                            value={transaction.account}
                                            onChange={e => setTransaction({ ...transaction, account: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0B2E4F] outline-none font-mono text-sm"
                                            required
                                        >
                                            <option value="">Select Account...</option>
                                            {customers.map(c => (
                                                <option key={c.id} value={c.accountNumber}>{c.fullName} ({c.accountNumber}) - ${c.balance}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Amount</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-3 text-slate-400 font-bold">$</span>
                                                <input
                                                    value={transaction.amount}
                                                    onChange={e => setTransaction({ ...transaction, amount: Number(e.target.value) })}
                                                    type="number"
                                                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 outline-none font-mono text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Type</label>
                                            <select
                                                value={transaction.type}
                                                onChange={e => setTransaction({ ...transaction, type: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-slate-300 outline-none text-sm font-semibold text-[#0B2E4F]"
                                            >
                                                <option value="credit">Credit (Deposit)</option>
                                                <option value="debit">Debit (Withdrawal)</option>
                                                <option value="transfer">Transfer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="charges"
                                            checked={transaction.charges > 0}
                                            onChange={e => setTransaction({ ...transaction, charges: e.target.checked ? 15 : 0 })}
                                        />
                                        <label htmlFor="charges" className="text-sm text-slate-600">Apply Standard Wire Fee ($15.00)</label>
                                    </div>

                                    <button type="submit" className="w-full bg-[#0B2E4F] text-white font-bold py-3 rounded-lg shadow-lg hover:bg-[#08223a] transition">
                                        Execute Transaction
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'admin' && (
                            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-end border-b border-slate-100 pb-4">
                                    <div>
                                        <h3 className="text-2xl font-black text-[#0B2E4F]">System Operations</h3>
                                        <p className="text-slate-500 mt-1">Platform configuration and logs.</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {['System Logs', 'Audit Trail', 'Role Definitions', 'Feature Flags'].map(item => (
                                        <div key={item} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100">
                                            <span className="font-bold text-slate-700">{item}</span>
                                            <button className="text-xs font-bold text-[#2E6F95] hover:text-[#0B2E4F] uppercase tracking-wider">Configure</button>
                                        </div>
                                    ))}
                                </div>

                                {/* Transfer Codes Section */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h4 className="font-bold text-[#0B2E4F]">Transfer Approval Codes</h4>
                                            <p className="text-xs text-slate-500">Required credentials for customer wire transfers.</p>
                                        </div>
                                        <Lock className="text-slate-300" />
                                    </div>

                                    <form onSubmit={handleSaveCodes} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">COT Code</label>
                                            <input
                                                type="text"
                                                value={codes.cot}
                                                onChange={e => setCodes({ ...codes, cot: e.target.value })}
                                                className="w-full p-2 border border-slate-300 rounded text-sm font-mono text-center tracking-widest uppercase"
                                                placeholder="0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">TAX ID</label>
                                            <input
                                                type="text"
                                                value={codes.tax}
                                                onChange={e => setCodes({ ...codes, tax: e.target.value })}
                                                className="w-full p-2 border border-slate-300 rounded text-sm font-mono text-center tracking-widest uppercase"
                                                placeholder="0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">IRS Pin</label>
                                            <input
                                                type="text"
                                                value={codes.irs}
                                                onChange={e => setCodes({ ...codes, irs: e.target.value })}
                                                className="w-full p-2 border border-slate-300 rounded text-sm font-mono text-center tracking-widest uppercase"
                                                placeholder="0000"
                                            />
                                        </div>
                                        <div className="md:col-span-3">
                                            <button type="submit" className="w-full bg-[#0B2E4F] text-white py-2 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#1d4e89] transition flex justify-center items-center gap-2">
                                                <Save size={14} /> Update Secure Codes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
                    <p className="text-[10px] text-slate-400 font-mono">SECURE ADMIN CHANNEL // ENCRYPTED SESSION // ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminCommandPanel;
