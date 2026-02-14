import React from 'react';
import { CreditCard, Cpu, Wifi } from 'lucide-react';

interface AtmCardVisualProps {
    customerName: string;
    maskedNumber: string;
}

export const AtmCardVisual: React.FC<AtmCardVisualProps> = ({ customerName, maskedNumber }) => {
    return (
        <div className="w-full max-w-sm aspect-[1.586/1] rounded-[24px] bg-gradient-to-br from-[#002D72] via-[#004A99] to-[#002D72] p-8 text-white relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-500 group">
            {/* Texture/Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-40 backdrop-blur-[1px]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[60px] -mr-32 -mt-32"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                            <CreditCard size={16} className="text-[#FFB81C]" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] italic">Federal <span className="text-[#FFB81C]">Trust</span></span>
                    </div>
                    <Wifi size={24} className="text-white/20 group-hover:text-white/60 transition" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-10 bg-[#FFB81C] rounded-lg relative overflow-hidden flex items-center justify-center">
                        <Cpu size={32} className="text-[#002D72]/40" strokeWidth={1.5} />
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-30">
                            {[...Array(16)].map((_, i) => <div key={i} className="border-[0.5px] border-[#002D72]"></div>)}
                        </div>
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Debit</span>
                </div>

                <div>
                    <p className="text-xl font-mono tracking-[0.25em] mb-4 text-shadow">{maskedNumber}</p>
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[8px] uppercase font-black text-white/40 tracking-[0.2em] mb-0.5">Card Member</p>
                            <p className="text-sm font-bold tracking-wide uppercase">{customerName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] uppercase font-black text-white/40 tracking-[0.2em] mb-0.5">Expires</p>
                            <p className="text-sm font-bold tracking-wide">08 / 29</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gloss Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>
    );
};
