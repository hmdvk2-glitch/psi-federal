
import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export const RatesSection: React.FC = () => {
    return (
        <section className="py-24 px-6 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left: Rates Table */}
                    <div className="flex-1 space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg text-[#002D72]">
                                    <TrendingUp size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Yield Management</span>
                            </div>
                            <h2 className="text-5xl font-black text-[#002D72] tracking-tighter mb-6 italic uppercase">Competitive Yields</h2>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">Our institutional audit ensures you receive the maximum risk-adjusted yield in the current market.</p>
                        </div>

                        <div className="grid gap-4">
                            <RateRow label="Direct Auto Portfolio" rate="4.54" sub="APR as low as" />
                            <RateRow label="Institutional Mortgage" rate="6.12" sub="APR as low as" />
                            <RateRow label="Personal Asset Loan" rate="7.99" sub="APR as low as" />
                            <RateRow label="High-Yield Liquidity" rate="4.85" sub="APY up to" isGold />
                        </div>
                    </div>

                    {/* Right: Featured Performance Highlight */}
                    <div className="flex-1 bg-[#001D4D] rounded-[3rem] p-16 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl border border-white/5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48 animate-pulse"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-blue-300 text-[10px] font-black uppercase tracking-widest mb-10 w-fit border border-white/10">
                                <Zap size={14} fill="currentColor" />
                                Q1 Performance Highlight
                            </div>
                            <h3 className="text-5xl font-black mb-8 leading-[1.1] tracking-tighter italic uppercase">Cash Rewards <br />Audit Plus</h3>
                            <p className="text-blue-100/70 text-lg mb-12 font-medium leading-relaxed">Earn 1.75% cash back on institutional spending with zero annual maintenance fees. Secured by NCUA protocols.</p>

                            <div className="grid grid-cols-2 gap-6 mb-12">
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <ShieldCheck className="text-[#FFB81C] mb-4" size={24} />
                                    <p className="text-xs font-black text-white uppercase tracking-widest">Zero Liability</p>
                                </div>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <Zap className="text-[#00A3FF] mb-4" size={24} />
                                    <p className="text-xs font-black text-white uppercase tracking-widest">Instant Lock</p>
                                </div>
                            </div>
                        </div>

                        <button className="bg-white text-[#001D4D] w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#FFB81C] transition-all transform hover:-translate-y-1 shadow-2xl relative z-10 flex items-center justify-center gap-2">
                            Initialize Application <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const RateRow: React.FC<{ label: string; rate: string; sub: string; isGold?: boolean }> = ({ label, rate, sub, isGold }) => (
    <div className={`p-8 rounded-[2rem] border transition-all duration-500 flex justify-between items-center group cursor-pointer ${isGold ? 'bg-white border-[#FFB81C]/50 shadow-xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-[#002D72]/20 hover:shadow-lg'}`}>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{sub}</p>
            <h4 className="text-xl font-bold text-[#002D72] tracking-tight italic uppercase">{label}</h4>
        </div>
        <div className="text-right flex items-center gap-6">
            <div>
                <p className={`text-4xl font-black tracking-tighter ${isGold ? 'text-[#FFB81C]' : 'text-[#002D72]'}`}>{rate}%</p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${isGold ? 'bg-[#FFB81C] text-[#001D4D]' : 'bg-slate-50 text-slate-300 group-hover:bg-[#002D72] group-hover:text-white'}`}>
                <ArrowUpRight size={20} />
            </div>
        </div>
    </div>
);
