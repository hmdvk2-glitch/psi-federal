import React from 'react';
import { Offer } from '../../types/marketing';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OfferBannerProps {
    offer: Offer;
    onClaim: (offer: Offer) => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ offer, onClaim }) => {
    return (
        <div className="relative w-full rounded-[40px] overflow-hidden shadow-2xl group min-h-[400px] flex items-center">
            {/* Background with Gradient and Pattern */}
            <div className="absolute inset-0 bg-[#001D4D]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#001D4D] via-[#002D72]/80 to-transparent z-10"></div>
                {offer.bannerImage ? (
                    <img src={offer.bannerImage} alt={offer.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
                )}
            </div>

            {/* Content */}
            <div className="relative z-20 px-8 md:px-16 py-12 max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-blue-300 text-xs font-black uppercase tracking-widest mb-6 border border-white/10">
                    <Sparkles size={14} className="text-amber-400" />
                    Featured Opportunity
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight italic">
                    {offer.title}
                </h2>

                <p className="text-lg md:text-xl text-blue-100 mb-8 font-medium leading-relaxed opacity-90">
                    {offer.description}
                </p>

                <div className="flex flex-wrap items-center gap-6">
                    <button
                        onClick={() => onClaim(offer)}
                        className="px-8 py-4 bg-white text-[#001D4D] font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                    >
                        {offer.ctaText}
                        <ArrowRight size={20} />
                    </button>

                    <div className="flex flex-col">
                        <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Rate Locked At</span>
                        <span className="text-2xl font-black text-white tracking-tighter">{offer.value}</span>
                    </div>
                </div>
            </div>

            {/* Aesthetic Accents */}
            <div className="absolute bottom-0 right-0 p-8 z-20 hidden md:block">
                <div className="w-32 h-32 border-8 border-white/5 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};
