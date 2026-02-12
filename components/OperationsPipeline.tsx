
import React, { useState } from 'react';
import { Customer, Transaction, FraudRisk } from '../types';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Loader2, 
  Database, 
  Fingerprint, 
  ShieldCheck, 
  HardDrive,
  Calendar,
  Hash,
  Edit3,
  Save,
  X
} from 'lucide-react';

interface OperationsPipelineProps {
  customers: Customer[];
  transactions: Transaction[];
  onUpdateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

const OperationsPipeline: React.FC<OperationsPipelineProps> = ({ customers, transactions, onUpdateTransaction }) => {
  const [activeSequence, setActiveSequence] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Ledger Editing State
  const [editingTxId, setEditingTxId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editId, setEditId] = useState('');

  const STEPS = [
    { label: 'KYC Verification', icon: <Fingerprint />, desc: 'Biometric & Document Analysis' },
    { label: 'AML Screening', icon: <ShieldCheck />, desc: 'Sanctions & Watchlist Check' },
    { label: 'Risk Assessment', icon: <Database />, desc: 'Synthetic Scoring Engine' },
    { label: 'Core Systems Sync', icon: <HardDrive />, desc: 'Ledger Record Insertion' },
    { label: 'Fulfillment', icon: <CheckCircle2 />, desc: 'Digital Credentials Release' }
  ];

  const runSequence = (cId: string) => {
    setActiveSequence(cId);
    setCurrentStep(0);
    setIsProcessing(true);
    
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < STEPS.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 1200);
  };

  const startEditing = (txn: Transaction) => {
    setEditingTxId(txn.id);
    setEditId(txn.id);
    setEditDate(new Date(txn.timestamp).toISOString().slice(0, 16));
  };

  const saveEdits = () => {
    if (editingTxId) {
      onUpdateTransaction(editingTxId, {
        id: editId,
        timestamp: new Date(editDate).toISOString()
      });
      setEditingTxId(null);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* ACCOUNT OPENING SEQUENCE */}
      <section className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-[#0B2E4F] p-8 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase">Account Opening Sequence</h2>
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mt-1">Institutional Onboarding Pipeline</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Pipeline Health</p>
               <p className="text-sm font-black text-[#2E9E6F]">OPTIMIZED</p>
             </div>
             <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
               <RotateCcw size={18} className="text-white" />
             </div>
          </div>
        </div>

        <div className="p-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 hidden md:block z-0"></div>
            
            {STEPS.map((step, idx) => {
              const isActive = idx === currentStep && isProcessing;
              const isCompleted = idx < currentStep || (idx === currentStep && !isProcessing && activeSequence);
              
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 border-4 ${
                    isActive ? 'bg-[#0B2E4F] text-white border-indigo-400 animate-pulse scale-110 shadow-xl' :
                    isCompleted ? 'bg-[#2E9E6F] text-white border-[#2E9E6F] shadow-lg shadow-[#2E9E6F]/20' :
                    'bg-white text-slate-300 border-slate-50'
                  }`}>
                    {isActive ? <Loader2 className="animate-spin" size={24} /> : React.cloneElement(step.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <p className={`text-xs font-black uppercase tracking-tight transition-colors ${isCompleted || isActive ? 'text-psi-navy' : 'text-slate-300'}`}>
                      {step.label}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1 max-w-[120px] mx-auto leading-tight">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Select Member to Process</h3>
             <div className="space-y-3">
               {customers.slice(0, 3).map(c => (
                 <div key={c.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-psi-navy/20 transition group">
                    <div className="flex items-center gap-4">
                       <img src={c.metadata.avatar} className="w-10 h-10 rounded-xl" alt="" />
                       <div>
                         <p className="text-sm font-black text-psi-navy">{c.name}</p>
                         <p className="text-[10px] font-bold text-slate-400">{c.email}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => runSequence(c.id)}
                      disabled={isProcessing}
                      className="px-6 py-2 bg-psi-navy text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#071F36] transition disabled:opacity-20 flex items-center gap-2"
                    >
                      <Play size={14} fill="currentColor" /> Start Sequence
                    </button>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* LEDGER DATA MANAGEMENT (Requested feature) */}
      <section className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-psi-navy tracking-tight uppercase">Ledger Management Hub</h2>
            <p className="text-slate-500 text-xs font-medium mt-1">Operational Override & Log Maintenance</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">Audit Mode Active</span>
          </div>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">Transaction ID</th>
                <th className="px-8 py-5">Timestamp</th>
                <th className="px-8 py-5">Value</th>
                <th className="px-8 py-5 text-right">Ledger Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.slice(0, 8).map(txn => (
                <tr key={txn.id} className="hover:bg-slate-50 transition group">
                  <td className="px-8 py-6">
                    {editingTxId === txn.id ? (
                      <div className="flex items-center gap-2">
                        <Hash size={14} className="text-slate-300" />
                        <input 
                          type="text" 
                          value={editId}
                          onChange={(e) => setEditId(e.target.value)}
                          className="bg-white border border-slate-200 px-3 py-1 rounded font-mono text-xs outline-none focus:ring-1 focus:ring-psi-navy"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Hash size={14} className="text-slate-300" />
                        <span className="font-mono text-xs font-bold text-psi-navy">{txn.id}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    {editingTxId === txn.id ? (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-300" />
                        <input 
                          type="datetime-local" 
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="bg-white border border-slate-200 px-3 py-1 rounded text-xs font-bold outline-none focus:ring-1 focus:ring-psi-navy"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Calendar size={14} className="opacity-30" />
                        {new Date(txn.timestamp).toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-black ${txn.amount > 0 ? 'text-[#2E9E6F]' : 'text-slate-900'}`}>
                      ${txn.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {editingTxId === txn.id ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={saveEdits} className="p-2 bg-[#2E9E6F] text-white rounded-lg hover:bg-[#25855A] transition shadow-sm">
                          <Save size={16} />
                        </button>
                        <button onClick={() => setEditingTxId(null)} className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => startEditing(txn)}
                        className="p-2 text-slate-400 hover:text-psi-navy hover:bg-white rounded-lg transition opacity-0 group-hover:opacity-100 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ml-auto"
                      >
                        <Edit3 size={16} /> Update Index
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transactions.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
              No transactions available for management.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OperationsPipeline;
