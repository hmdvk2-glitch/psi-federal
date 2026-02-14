import React from 'react';
import { CreditCard, Wallet, Car, Home, ChevronRight } from 'lucide-react';

export const FeatureStrip: React.FC = () => {
    const cards = [
        { icon: <Wallet className="text-[#002D72]" />, title: 'Savings & Checking', desc: 'High-yield options designed for growth.' },
        { icon: <CreditCard className="text-[#002D72]" />, title: 'Credit Cards', desc: 'Earn points on every purchase you make.' },
        { icon: <Car className="text-[#002D72]" />, title: 'Auto Loans', desc: 'Drive home with rates that fit your budget.' },
        { icon: <Home className="text-[#002D72]" />, title: 'Mortgages', desc: 'Secure your dream home with confidence.' },
    ];

    return (
        <section className="py-12 px-6 -mt-16 lg:-mt-20 relative z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100 hover:border-[#002D72]/20 hover:-translate-y-2 transition-all duration-300 group"
                    >
                        <div className="mb-6 bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-[#002D72]/10 transition">
                            {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
                        </div>
                        <h3 className="text-xl font-black text-[#002D72] mb-3 tracking-tight">{card.title}</h3>
                        <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed">{card.desc}</p>
                        <a href="#" className="text-xs font-black text-[#002D72] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all">
                            Learn More <ChevronRight size={14} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};
