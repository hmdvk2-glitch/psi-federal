import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { Offer } from '../../types/marketing';
import { getOffers } from '../../src/lib/marketingService';

interface StickyPromoProps {
    onClaim: (offer: Offer) => void;
}

export const StickyPromo: React.FC<StickyPromoProps> = ({ onClaim }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [promo, setPromo] = useState<Offer | null>(null);

    useEffect(() => {
        const loadPromo = async () => {
            // Check if dismissed in last 24h
            const dismissedAt = localStorage.getItem('promo_dismissed_at');
            if (dismissedAt) {
                const hoursSince = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60);
                if (hoursSince < 24) return;
            }

            const offers = await getOffers('HOME');
            if (offers.length > 0) {
                setPromo(offers[0]);
                // Delayed enter
                setTimeout(() => setIsVisible(true), 3000);
            }
        };
        loadPromo();
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('promo_dismissed_at', Date.now().toString());
    };

    if (!promo || !isVisible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[55] w-[95%] max-w-2xl animate-in slide-in-from-bottom-12 duration-500">
            <div className="bg-[#002D72] text-white p-4 pr-12 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-400 rounded-lg text-[#002D72]">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-amber-400">Limited Activation</p>
                        <p className="text-[13px] font-bold line-clamp-1">{promo.title}: {promo.description}</p>
                    </div>
                </div>

                <button
                    onClick={() => onClaim(promo)}
                    className="whitespace-nowrap px-6 py-2 bg-white text-[#002D72] text-xs font-black rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                    Claim Now
                    <ArrowRight size={14} />
                </button>

                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 p-1.5 hover:bg-white/10 rounded-full transition text-white/60 hover:text-white"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};
