
import React, { useState } from 'react';
import { Customer, LoanApplication } from '../types';
import { analyzeLoanApplication } from '../services/simulationService';
import { 
  BadgeDollarSign, 
  ChevronRight, 
  Car, 
  Home, 
  User, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

interface LoanAppProps {
  customer: Customer;
}

const LoanApplicationSystem: React.FC<LoanAppProps> = ({ customer }) => {
  const [step, setStep] = useState(1);
  const [loanType, setLoanType] = useState<'AUTO' | 'MORTGAGE' | 'PERSONAL' | null>(null);
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(36);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ status: 'APPROVED' | 'REJECTED', analysis: string } | null>(null);

  const handleSubmit = async () => {
    if (!loanType) return;
    setIsProcessing(true);
    const app: LoanApplication = {
      id: `APP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      customerId: customer.id,
      loanType,
      amount,
      term,
      status: 'PENDING',
      submissionDate: new Date().toISOString(),
    };

    try {
      const evaluation = await analyzeLoanApplication(app, customer);
      setResult(evaluation);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="bg-white rounded-[60px] shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Wizard Header */}
        <div className="bg-[#0B2E4F] p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] -mr-32 -mt-32"></div>
          <h2 className="text-4xl font-black tracking-tighter mb-4">Express Loan Center</h2>
          <div className="flex justify-center items-center gap-12 relative z-10">
            <StepIndicator step={1} active={step >= 1} label="Select" />
            <div className="h-0.5 w-12 bg-white/10"></div>
            <StepIndicator step={2} active={step >= 2} label="Configure" />
            <div className="h-0.5 w-12 bg-white/10"></div>
            <StepIndicator step={3} active={step >= 3} label="Result" />
          </div>
        </div>

        <div className="p-16">
          {step === 1 && (
            <div className="space-y-10 animate-in slide-in-from-right duration-500">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-black text-psi-navy tracking-tight uppercase">What do you need funding for?</h3>
                <p className="text-slate-500 font-medium">Select a product to see your personalized rates.</p>
              </div>
              <div className="grid grid-cols-3 gap-8">
                 <LoanTypeCard 
                  icon={<Car size={32} />} 
                  label="Auto" 
                  desc="New/Used Vehicles"
                  active={loanType === 'AUTO'}
                  onClick={() => setLoanType('AUTO')}
                 />
                 <LoanTypeCard 
                  icon={<Home size={32} />} 
                  label="Mortgage" 
                  desc="Buy or Refinance"
                  active={loanType === 'MORTGAGE'}
                  onClick={() => setLoanType('MORTGAGE')}
                 />
                 <LoanTypeCard 
                  icon={<User size={32} />} 
                  label="Personal" 
                  desc="Any Purpose"
                  active={loanType === 'PERSONAL'}
                  onClick={() => setLoanType('PERSONAL')}
                 />
              </div>
              <div className="flex justify-center pt-10">
                 <button 
                  disabled={!loanType}
                  onClick={() => setStep(2)}
                  className="px-12 py-5 bg-psi-navy text-white rounded-[24px] font-black uppercase tracking-widest hover:scale-105 transition disabled:opacity-20 shadow-xl shadow-black/10 flex items-center gap-3"
                 >
                   Next Step <ChevronRight size={20} />
                 </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12 animate-in slide-in-from-right duration-500">
              <div className="grid grid-cols-2 gap-16">
                 <div className="space-y-8">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Loan Amount ($)</label>
                      <input 
                        type="range" min="1000" max="100000" step="1000"
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-psi-navy"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                      />
                      <p className="mt-4 text-4xl font-black text-psi-navy tracking-tighter">${amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Term (Months)</label>
                      <select 
                        className="w-full p-5 bg-slate-50 rounded-2xl border border-slate-100 text-lg font-bold outline-none focus:ring-2 focus:ring-psi-navy transition"
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                      >
                         <option value={12}>12 Months</option>
                         <option value={24}>24 Months</option>
                         <option value={36}>36 Months</option>
                         <option value={48}>48 Months</option>
                         <option value={60}>60 Months</option>
                      </select>
                    </div>
                 </div>
                 <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 space-y-6">
                    <h4 className="font-black text-psi-navy tracking-tight uppercase border-b border-slate-200 pb-4">Estimate Summary</h4>
                    <div className="space-y-4">
                       <SummaryItem label="Interest Rate" value="4.25%" />
                       <SummaryItem label="Estimated Monthly" value={`$${Math.round((amount * 1.05) / term)}`} />
                       <SummaryItem label="Total Payment" value={`$${Math.round(amount * 1.05).toLocaleString()}`} />
                    </div>
                    <div className="pt-6 flex items-start gap-3">
                       <Clock size={16} className="text-slate-400" />
                       <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase">Rates based on synthetic risk profile {customer.riskScore}/100</p>
                    </div>
                 </div>
              </div>
              <div className="flex justify-between pt-10">
                 <button onClick={() => setStep(1)} className="px-8 py-5 text-slate-400 font-black uppercase tracking-widest hover:text-psi-navy transition">Back</button>
                 <button 
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="px-12 py-5 bg-[#2E9E6F] text-white rounded-[24px] font-black uppercase tracking-widest hover:scale-105 transition shadow-xl shadow-[#2E9E6F]/20 flex items-center gap-3"
                 >
                   {isProcessing ? 'Analyzing...' : 'Submit Application'}
                   <Sparkles size={20} />
                 </button>
              </div>
            </div>
          )}

          {step === 3 && result && (
            <div className="text-center space-y-10 animate-in zoom-in-95 duration-700">
               <div className={`w-24 h-24 rounded-[32px] mx-auto flex items-center justify-center ${
                 result.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
               }`}>
                 {result.status === 'APPROVED' ? <CheckCircle2 size={48} /> : <AlertCircle size={48} />}
               </div>
               <div className="space-y-4">
                 <h3 className="text-4xl font-black text-psi-navy tracking-tighter uppercase">Application {result.status}</h3>
                 <p className="text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">{result.analysis}</p>
               </div>
               <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 text-left">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText size={14} /> Official Officer Note
                  </h4>
                  <p className="text-sm text-psi-navy font-bold leading-relaxed italic opacity-80">
                    "This decision was generated by the PSI Federal Express Decision Engine v4.2 based on synthetic profile ${customer.id}. Real lending decisions require hard credit pulls."
                  </p>
               </div>
               <button 
                onClick={() => { setStep(1); setResult(null); }}
                className="px-10 py-5 bg-psi-navy text-white rounded-[24px] font-black uppercase tracking-widest hover:scale-105 transition shadow-xl shadow-black/10"
               >
                 Start New Application
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StepIndicator: React.FC<{ step: number, active: boolean, label: string }> = ({ step, active, label }) => (
  <div className={`flex flex-col items-center gap-3 transition-opacity ${active ? 'opacity-100' : 'opacity-30'}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 ${
      active ? 'bg-white text-psi-navy border-white' : 'border-white/20 text-white'
    }`}>
      {step}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

const LoanTypeCard: React.FC<{ icon: React.ReactNode, label: string, desc: string, active: boolean, onClick: () => void }> = ({ icon, label, desc, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-10 rounded-[40px] border-4 transition-all text-center space-y-4 ${
      active ? 'bg-psi-navy border-psi-navy text-white shadow-2xl scale-105' : 'bg-white border-slate-50 text-slate-400 hover:border-slate-100'
    }`}
  >
    <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition ${active ? 'bg-white/10' : 'bg-slate-50'}`}>
       {icon}
    </div>
    <h4 className={`text-xl font-black ${active ? 'text-white' : 'text-psi-navy'}`}>{label}</h4>
    <p className={`text-xs font-medium ${active ? 'text-white/60' : 'text-slate-400'}`}>{desc}</p>
  </button>
);

const SummaryItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-lg font-black text-psi-navy">{value}</span>
  </div>
);

export default LoanApplicationSystem;
