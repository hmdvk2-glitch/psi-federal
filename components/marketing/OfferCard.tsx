import React from 'react';
import * as Icons from 'lucide-react';
import { Offer } from '../../types/marketing';

interface OfferCardProps {
    offer: Offer;
    onClaim: (offer: Offer) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onClaim }) => {
    const IconComponent = (Icons as any)[offer.icon || 'Tag'] || Icons.Tag;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 text-[#002D72] rounded-2xl group-hover:bg-[#002D72] group-hover:text-white transition-colors">
                    <IconComponent size={24} />
                </div>
                {offer.status === 'ACTIVE' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                        Active
                    </span>
                )}
            </div>

            <div className="flex-1">
                <h4 className="text-xl font-bold text-[#0A1F44] mb-2">{offer.title}</h4>
                <p className="text-slate-500 text-sm mb-4 line-clamp-3">{offer.description}</p>

                <div className="bg-slate-50 rounded-xl p-3 mb-4">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Value</p>
                    <p className="text-2xl font-black text-[#002D72]">{offer.value}</p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium mb-6">
                    <Icons.Clock size={12} />
                    <span>Ends: {new Date(offer.endDate).toLocaleDateString()}</span>
                </div>
            </div>

            <button
                onClick={() => onClaim(offer)}
                className="w-full py-4 bg-white border-2 border-[#0A1F44] text-[#0A1F44] font-bold rounded-2xl hover:bg-[#0A1F44] hover:text-white transition-all flex items-center justify-center gap-2"
            >
                {offer.ctaText}
                <Icons.ArrowRight size={18} />
            </button>
        </div>
    );
};
