import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Calendar, Zap } from 'lucide-react';

export const SavingsCalculator: React.FC = () => {
    const [amount, setAmount] = useState(1000000); // $1m
    const [months, setMonths] = useState(12);
    const [rate, setRate] = useState(18); // 18%
    const [result, setResult] = useState({ interest: 0, total: 0 });

    useEffect(() => {
        const interest = (amount * (rate / 100) * (months / 12));
        setResult({ interest, total: amount + interest });
    }, [amount, months, rate]);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 h-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 text-[#002D72] rounded-xl font-bold">
                    <TrendingUp size={24} />
                </div>
                <h3 className="text-2xl font-black text-[#0A1F44]">Yield Estimator</h3>
            </div>

            <div className="space-y-6 mb-8">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Initial Deposit</label>
                        <span className="text-sm font-black text-[#0A1F44]">${amount.toLocaleString()}</span>
                    </div>
                    <input
                        type="range" min="10000" max="10000000" step="10000"
                        value={amount} onChange={e => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0A1F44]"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Tenure (Months)</label>
                        <span className="text-sm font-black text-[#0A1F44]">{months} Mo</span>
                    </div>
                    <input
                        type="range" min="3" max="60" step="1"
                        value={months} onChange={e => setMonths(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0A1F44]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Interest</p>
                    <p className="text-xl font-black text-green-600">${result.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="p-4 bg-[#0A1F44] rounded-2xl">
                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-widest mb-1">Maturity Value</p>
                    <p className="text-xl font-black text-white">${result.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                </div>
            </div>
        </div>
    );
};

export const LoanCalculator: React.FC = () => {
    const [amount, setAmount] = useState(5000000);
    const [years, setYears] = useState(3);
    const [rate, setRate] = useState(12.5);
    const [repayment, setRepayment] = useState(0);

    useEffect(() => {
        const monthlyRate = (rate / 100) / 12;
        const numberOfPayments = years * 12;
        const x = Math.pow(1 + monthlyRate, numberOfPayments);
        const monthly = (amount * x * monthlyRate) / (x - 1);
        setRepayment(monthly);
    }, [amount, years, rate]);

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 h-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 text-[#002D72] rounded-xl font-bold">
                    <Calculator size={24} />
                </div>
                <h3 className="text-2xl font-black text-[#0A1F44]">Loan Repayment</h3>
            </div>

            <div className="space-y-6 mb-8">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Loan Amount</label>
                        <span className="text-sm font-black text-[#0A1F44]">${amount.toLocaleString()}</span>
                    </div>
                    <input
                        type="range" min="100000" max="50000000" step="100000"
                        value={amount} onChange={e => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0A1F44]"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Tenure (Years)</label>
                        <select
                            value={years} onChange={e => setYears(Number(e.target.value))}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black outline-none"
                        >
                            {[1, 2, 3, 5, 10, 15, 20].map(y => <option key={y} value={y}>{y} Years</option>)}
                        </select>
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Interest Rate (%)</label>
                        <input
                            type="number" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))}
                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-black outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#0A1F44] rounded-[2.5rem] p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap size={80} />
                </div>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mb-2">Monthly Repayment</p>
                <p className="text-4xl font-black text-white mb-2 italic">${repayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                <p className="text-[10px] text-blue-200/60 font-medium">Estimated value. Final rate subject to credit scoring.</p>
            </div>
        </div>
    );
};
