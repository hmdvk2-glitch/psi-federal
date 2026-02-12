
import React from 'react';
import { Account, Customer, AccountStatus } from '../types';
import { CreditCard, Wallet, Landmark, ShieldCheck } from 'lucide-react';

interface AccountDetailProps {
  account: Account;
  customer: Customer;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account, customer }) => {
  return (
    <div className="bg-white rounded-3xl p-1 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="bg-slate-900 rounded-[22px] p-6 text-white relative overflow-hidden h-52 flex flex-col justify-between">
        {/* Abstract pattern bg */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
        
        <div className="flex justify-between items-start relative">
          <div>
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">{account.type}</h4>
            <div className="flex items-center gap-2">
               <ShieldCheck size={14} className="text-emerald-400" />
               <p className="text-xs text-slate-400">Insured by PSIF</p>
            </div>
          </div>
          <p className="text-xl font-bold italic opacity-40">Ψ</p>
        </div>

        <div className="relative">
          <p className="text-xs text-slate-400 font-medium mb-1 tracking-wider uppercase">Balance</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-slate-400">$</span>
            <span className="text-3xl font-bold tracking-tight">{account.balance.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-end relative">
          <p className="font-mono text-sm tracking-widest text-slate-300">•••• •••• {account.accountNumber.slice(-4)}</p>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
            account.status === AccountStatus.ACTIVE ? 'border-emerald-500/50 text-emerald-400' : 'border-slate-500/50 text-slate-400'
          }`}>
            {account.status}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
            <img src={customer.metadata.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">{customer.name}</p>
            <p className="text-xs text-slate-500">{customer.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Routing</p>
            <p className="text-sm font-mono font-medium text-slate-700">{account.routingNumber}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Created</p>
            <p className="text-sm font-medium text-slate-700">{new Date(account.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <button className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-100 transition">
          View Transactions
        </button>
      </div>
    </div>
  );
};

export default AccountDetail;
