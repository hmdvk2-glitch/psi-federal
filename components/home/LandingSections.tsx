import React, { useState, useEffect } from 'react';
import { ShieldCheck, PieChart, ShieldAlert, Smartphone, Calculator, Search, ArrowRight } from 'lucide-react';
import { OfferCard } from '../marketing/OfferCard';
import { OfferBanner } from '../marketing/OfferBanner';
import { SavingsCalculator, LoanCalculator } from '../marketing/Calculators';
import { getOffers } from '../../src/lib/marketingService';
import { Offer } from '../../types/marketing';

export const TrustSection = () => (
    <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-4xl font-black text-[#002D72] mb-6 tracking-tight italic uppercase">Absolute Security</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">Join 13 million members protected by federal-grade protocols.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <TrustTile icon={<ShieldCheck />} title="NCUA Insured" desc="Savings protected up to $250,000 via federal insurance." />
                <TrustTile icon={<PieChart />} title="Profit Sharing" desc="Earnings return to members via competitive interest rates." />
                <TrustTile icon={<ShieldAlert />} title="24/7 Shield" desc="Real-time proactive fraud detection and instant locks." />
            </div>
        </div>
    </section>
);

const TrustTile = ({ icon, title, desc }: any) => (
    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-premium group hover:border-[#002D72]/20 transition-all duration-500">
        <div className="mb-8 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#002D72] transition duration-500">
            {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="text-2xl font-black text-[#002D72] mb-4 tracking-tight uppercase italic">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

export const MobilePromoSection = () => (
    <section className="py-32 px-6 bg-[#001D4D] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
                <div className="relative z-10 bg-slate-900 w-full max-w-[320px] aspect-[9/19] rounded-[48px] p-4 shadow-[0_0_80px_rgba(0,0,0,0.5)] border-[8px] border-slate-800 mx-auto overflow-hidden group">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                    <div className="h-full w-full bg-gradient-to-b from-blue-600 to-[#001D4D] rounded-[36px] p-6 flex flex-col justify-between relative">
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="w-10 h-10 bg-white/20 rounded-full backdrop-blur-md"></div>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest mb-1 italic">Total Balance</p>
                            <h4 className="text-3xl font-black text-white italic">$4,250,000</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="h-12 bg-white/10 rounded-2xl backdrop-blur-md"></div>
                            <div className="h-12 bg-white/10 rounded-2xl backdrop-blur-md"></div>
                            <div className="h-12 bg-blue-500 rounded-2xl shadow-lg flex items-center justify-center font-bold text-white uppercase text-xs">Quick Transfer</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-white space-y-8 order-1 lg:order-2">
                <h2 className="text-6xl font-black italic tracking-tighter leading-none uppercase">Banking without <br /><span className="text-blue-400">Boundaries</span>.</h2>
                <p className="text-blue-100/60 text-xl font-medium leading-relaxed max-w-lg">
                    Manage your assets with the most advanced mobile core from PSI Federal CU. Biometric security, instant lead activation, and zero-fee transfers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-10">
                    <AppStoreButton platform="App Store" />
                    <AppStoreButton platform="Google Play" />
                </div>
            </div>
        </div>
    </section>
);

const AppStoreButton = ({ platform }: any) => (
    <button className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition shadow-lg">
        <Smartphone size={32} />
        <div className="text-left">
            <p className="text-[10px] uppercase font-black tracking-widest leading-none">Download</p>
            <p className="text-lg font-bold leading-none mt-1">{platform}</p>
        </div>
    </button>
);

export const OfferSection = ({ channel, onClaim }: any) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    useEffect(() => {
        getOffers(channel).then(setOffers);
    }, [channel]);

    if (offers.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map(offer => <OfferCard key={offer.id} offer={offer} onClaim={onClaim} />)}
        </div>
    );
};

export const BankingView = ({ channel, title, onClaim }: any) => {
    const [offers, setOffers] = useState<Offer[]>([]);
    useEffect(() => {
        getOffers(channel).then(setOffers);
    }, [channel]);

    const heroOffer = offers.find(o => o.type === 'WELCOME_BONUS' || o.type === 'LOAN_DISCOUNT' || o.type === 'INTEREST_BOOST');
    const restOffers = offers.filter(o => o.id !== heroOffer?.id);

    return (
        <div className="animate-in fade-in duration-700">
            {/* Hero Section for Channel */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
                {heroOffer ? (
                    <OfferBanner offer={heroOffer} onClaim={onClaim} />
                ) : (
                    <div className="bg-slate-900 rounded-[40px] p-16 text-white">
                        <h1 className="text-6xl font-black italic uppercase tracking-tighter">{title}</h1>
                    </div>
                )}
            </div>

            {/* Calculators specific to channel */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {(channel === 'SAVINGS' || channel === 'HOME') && <SavingsCalculator />}
                    {(channel === 'LOANS' || channel === 'HOME') && <LoanCalculator />}
                    {channel === 'BUSINESS' && (
                        <div className="bg-slate-50 rounded-3xl p-12 flex items-center justify-center border-2 border-dashed border-slate-200 text-center">
                            <div>
                                <h3 className="text-2xl font-black text-[#002D72] mb-4">Enterprise Growth Tools</h3>
                                <p className="text-slate-500 font-medium">Coming soon: Automated payroll and tax estimators.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* More Offers */}
            {restOffers.length > 0 && (
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h3 className="text-3xl font-black text-[#002D72] mb-8 italic uppercase">Available Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {restOffers.map(o => <OfferCard key={o.id} offer={o} onClaim={onClaim} />)}
                    </div>
                </div>
            )}
        </div>
    );
};
