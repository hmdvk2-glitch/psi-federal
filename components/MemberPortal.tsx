
import React from 'react';
import { Customer, Account, Transaction } from '../types';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  CreditCard, 
  Search, 
  Bell, 
  Plus,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface MemberPortalProps {
  customer: Customer;
  accounts: Account[];
  transactions: Transaction[];
}

const MemberPortal: React.FC<MemberPortalProps> = ({ customer, accounts, transactions }) => {
  const primaryAccount = accounts[0];
  const recentTxns = transactions.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Profile Header */}
      <div className="flex justify-between items-center bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
        <div className="flex items-center gap-6">
          <img src={customer.metadata.avatar} className="w-20 h-20 rounded-[32px] object-cover border-4 border-slate-50 shadow-sm" alt="Profile" />
          <div>
            <h2 className="text-3xl font-black text-psi-navy tracking-tighter">Welcome back, {customer.name.split(' ')[0]}</h2>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#2E9E6F]" /> Secure Member Session • Member since {new Date(customer.onboardingDate).getFullYear()}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
           <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-psi-navy transition"><Bell size={24} /></button>
           <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-psi-navy transition"><Search size={24} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Account Cards & Quick Actions */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-xl font-black text-psi-navy tracking-tight uppercase">Your Accounts</h3>
              <button className="text-sm font-black text-psi-navy hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {accounts.map(acc => (
                 <div key={acc.id} className="bg-[#0B2E4F] rounded-[40px] p-8 text-white relative overflow-hidden group shadow-2xl hover:scale-[1.02] transition-transform">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-16 -mt-16"></div>
                   <div className="relative z-10 flex flex-col h-full justify-between gap-12">
                     <div className="flex justify-between items-start">
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">{acc.type}</p>
                         <p className="text-xs text-white/40 mt-1">•••• {acc.accountNumber.slice(-4)}</p>
                       </div>
                       <CreditCard size={24} className="text-white/20" />
                     </div>
                     <div>
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Available Balance</p>
                       <p className="text-4xl font-black tracking-tighter">${acc.balance.toLocaleString()}</p>
                     </div>
                   </div>
                 </div>
               ))}
               <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-8 text-slate-400 hover:border-psi-navy/30 hover:text-psi-navy transition">
                 <Plus size={32} />
                 <span className="font-black uppercase text-xs tracking-widest mt-2">Open New Account</span>
               </button>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-psi-navy tracking-tight uppercase mb-8">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
               <QuickAction icon={<Send />} label="Send" />
               <QuickAction icon={<Wallet />} label="Pay Bill" />
               <QuickAction icon={<ArrowUpRight />} label="Invest" />
               <QuickAction icon={<ArrowDownLeft />} label="Deposit" />
            </div>
          </section>
        </div>

        {/* Right Column: Transactions & Financial Wellness */}
        <div className="space-y-10">
          <section className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black text-psi-navy tracking-tight uppercase mb-8">Recent Activity</h3>
            <div className="space-y-6">
               {recentTxns.length === 0 ? (
                 <p className="text-sm text-slate-400 text-center py-10">No recent transactions.</p>
               ) : (
                 recentTxns.map(txn => (
                   <div key={txn.id} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${txn.amount < 0 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                           {txn.amount < 0 ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-black text-psi-navy group-hover:underline">{txn.description}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{txn.type}</p>
                        </div>
                      </div>
                      <p className={`text-sm font-black ${txn.amount < 0 ? 'text-slate-900' : 'text-[#2E9E6F]'}`}>
                        {txn.amount < 0 ? '-' : '+'}${Math.abs(txn.amount).toLocaleString()}
                      </p>
                   </div>
                 ))
               )}
            </div>
            <button className="w-full mt-10 py-4 bg-slate-50 text-psi-navy rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-100 transition">
              Full Statement
            </button>
          </section>

          <section className="bg-[#2E9E6F] p-8 rounded-[40px] text-white relative overflow-hidden">
             <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[40px] -mr-20 -mb-20"></div>
             <div className="relative z-10 space-y-6">
                <h4 className="text-xl font-black tracking-tight leading-tight">Financial Wellness Score: 780</h4>
                <p className="text-sm text-white/80 font-medium">Your spending is 12% lower than last month. You're on track for your savings goal!</p>
                <button className="bg-white text-[#2E9E6F] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Wellness Hub</button>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-4 group">
    <div className="w-16 h-16 bg-slate-50 rounded-[20px] flex items-center justify-center text-psi-navy group-hover:bg-psi-navy group-hover:text-white transition shadow-sm">
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-psi-navy transition">{label}</span>
  </button>
);

export default MemberPortal;
