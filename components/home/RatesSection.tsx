import React from 'react';
import { ArrowUpRight, Percent } from 'lucide-react';

export const RatesSection: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Rates Table */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h2 className="text-4xl font-black text-[#002D72] tracking-tight mb-4">Competitive Rates</h2>
                            <p className="text-slate-500 font-medium">We monitor the market daily to ensure you get the best value.</p>
                        </div>

                        <div className="space-y-4">
                            <RateRow label="New Auto Loan" rate="4.54" sub="APR as low as" />
                            <RateRow label="30-Year Fixed Mortgage" rate="6.12" sub="APR as low as" />
                            <RateRow label="Personal Loan" rate="7.99" sub="APR as low as" />
                            <RateRow label="Savings Account" rate="4.25" sub="APY up to" isGold />
                        </div>
                    </div>

                    {/* Right: Feature Highlight */}
                    <div className="flex-1 bg-[#002D72] rounded-[40px] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="relative z-10">
                            <span className="bg-[#FFB81C] text-[#002D72] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">Featured Product</span>
                            <h3 className="text-4xl font-black mb-6 leading-tight">Cash Rewards Credit Card</h3>
                            <p className="text-blue-100 text-lg mb-8 leading-relaxed">Earn 1.75% cash back on all purchases when you have direct deposit. No annual fees, forever.</p>

                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 font-bold text-sm">
                                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</span>
                                    Zero Liability Protection
                                </li>
                                <li className="flex items-center gap-3 font-bold text-sm">
                                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</span>
                                    No Foreign Transaction Fees
                                </li>
                            </ul>
                        </div>

                        <button className="bg-white text-[#002D72] w-full py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-50 transition shadow-lg relative z-10">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RateRow: React.FC<{ label: string; rate: string; sub: string; isGold?: boolean }> = ({ label, rate, sub, isGold }) => (
    <div className={`p-6 rounded-2xl border transition-all duration-300 flex justify-between items-center group cursor-pointer ${isGold ? 'bg-[#FFB81C]/5 border-[#FFB81C]/30 hover:bg-[#FFB81C]/10' : 'bg-slate-50 border-slate-100 hover:border-[#002D72]/20 hover:bg-white'
        }`}>
        <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{sub}</p>
            <h4 className="text-lg font-bold text-[#002D72]">{label}</h4>
        </div>
        <div className="text-right flex items-center gap-4">
            <div>
                <p className={`text-3xl font-black tracking-tighter ${isGold ? 'text-[#B8860B]' : 'text-[#002D72]'}`}>{rate}%</p>
            </div>
            <div className={`p-2 rounded-lg transition ${isGold ? 'bg-[#FFB81C] text-[#002D72]' : 'bg-white text-[#002D72] group-hover:bg-[#002D72] group-hover:text-white'}`}>
                <ArrowUpRight size={18} />
            </div>
        </div>
    </div>
);
