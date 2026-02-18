
import React from 'react';
import { CreditCard, Wallet, Car, Home, ChevronRight, ShieldCheck, PieChart, Smartphone } from 'lucide-react';

export const FeatureStrip: React.FC = () => {
    const cards = [
        {
            icon: <Wallet />,
            title: 'Private Wealth',
            desc: 'High-yield assets with federal protection policies.',
            stat: '4.85% APY'
        },
        {
            icon: <CreditCard />,
            title: 'Elite Cards',
            desc: 'Earn curated rewards on institutional spending.',
            stat: '2.5% Back'
        },
        {
            icon: <ShieldCheck />,
            title: 'Audit Vault',
            desc: 'Real-time ledger transparency for all members.',
            stat: 'Real-Time'
        },
        {
            icon: <Smartphone />,
            title: 'Mobile Core',
            desc: 'Manage your global portfolio from a single app.',
            stat: 'Biometric'
        },
    ];

    return (
        <section className="py-12 px-6 -mt-24 lg:-mt-32 relative z-30">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="bg-white/80 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-premium border border-white/50 hover:border-[#002D72]/20 hover:-translate-y-2 transition-all duration-500 group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-[#002D72] w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition duration-500">
                                {React.cloneElement(card.icon as React.ReactElement, { size: 28 })}
                            </div>
                            <span className="text-[10px] font-black text-[#002D72]/40 uppercase tracking-widest">{card.stat}</span>
                        </div>
                        <h3 className="text-xl font-black text-[#002D72] mb-3 tracking-tighter uppercase italic">{card.title}</h3>
                        <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{card.desc}</p>
                        <a href="#" className="text-[10px] font-black text-[#002D72] uppercase tracking-[0.3em] flex items-center gap-2 group-hover:gap-4 transition-all border-t border-slate-100 pt-6 w-full">
                            Protocol Details <ChevronRight size={14} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};
