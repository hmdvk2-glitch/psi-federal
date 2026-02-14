import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
    onLoginClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
    return (
        <section className="relative pt-32 lg:pt-48 pb-20 lg:pb-32 overflow-hidden bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="bg-[#002D72]/10 text-[#002D72] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            <ShieldCheck size={12} /> Trusted Since 1933
                        </span>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-[#002D72] leading-[1.05] tracking-tight mb-8">
                        Financial <span className="text-[#004A99] italic">Empowerment</span> for Every Member.
                    </h1>
                    <p className="text-lg text-slate-600 font-medium mb-10 max-w-xl leading-relaxed">
                        Experience a credit union that prioritizes your future. From high-yield savings to market-leading rates, we're with you every step of the journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={onLoginClick}
                            className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg"
                        >
                            Sign In to Your Account <ChevronRight size={20} />
                        </button>
                        <button className="btn-secondary px-8 py-4 text-lg">
                            Open an Account
                        </button>
                    </div>
                </div>

                <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#002D72]/20 to-transparent blur-3xl -z-10 rounded-full"></div>
                    <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                        <img
                            src="/assets/hero-banking.png"
                            className="w-full h-full object-cover"
                            alt="Happy Family Banking"
                        />
                        {/* Trust Signal Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-2xl flex items-center justify-between border-white/40">
                            <div>
                                <p className="text-[10px] font-black text-[#002D72] uppercase tracking-[0.2em] mb-1">Current CD Rates</p>
                                <p className="text-2xl font-black text-[#002D72]">5.25% <span className="text-sm font-bold text-slate-500 tracking-normal">APY*</span></p>
                            </div>
                            <button className="bg-[#FFB81C] text-[#002D72] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-[#E6A619] transition">
                                Lock in Rate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#002D72]/5 -skew-x-12 translate-x-1/2 -z-0"></div>
        </section>
    );
};
