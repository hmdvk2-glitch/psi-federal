import React, { useState } from 'react';
import { Navbar } from '../components/home/Navbar';
import HeroCarousel from '../src/components/hero/HeroCarousel';
import { FeatureStrip } from '../components/home/FeatureStrip';
import { RatesSection } from '../components/home/RatesSection';
import { Footer } from '../components/home/Footer';
import { LoginModal } from '../components/home/LoginModal';
import { ShieldAlert, ShieldCheck, PieChart, Smartphone, Calculator, Search, BarChart3 as BarChart3Icon } from 'lucide-react';
import { SmartForm } from '../components/marketing/SmartForm';
import { StickyPromo } from '../components/marketing/StickyPromo';
import { OfferSection, BankingView, TrustSection, MobilePromoSection } from '../components/home/LandingSections';

export const LandingPage: React.FC = () => {
    const [loginState, setLoginState] = useState<{ isOpen: boolean; isAdmin: boolean }>({
        isOpen: false,
        isAdmin: false
    });
    const [currentView, setCurrentView] = useState('HOME');
    const [selectedOffer, setSelectedOffer] = useState<any>(null);

    const openMemberLogin = () => setLoginState({ isOpen: true, isAdmin: false });
    const openAdminLogin = () => setLoginState({ isOpen: true, isAdmin: true });
    const closeLogin = () => setLoginState({ isOpen: false, isAdmin: false });

    const handleClaimOffer = (offer: any) => {
        setSelectedOffer(offer);
    };

    const handleViewChange = (view: string) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-white selection:bg-[#002D72] selection:text-white">
            <Navbar onLoginClick={openMemberLogin} setView={handleViewChange} />

            <main>
                {currentView === 'HOME' && (
                    <div className="animate-in fade-in duration-500">
                        <HeroCarousel onLoginClick={openMemberLogin} />
                        <FeatureStrip />
                        <RatesSection />

                        {/* Featured Offers */}
                        <div className="max-w-7xl mx-auto px-6 py-12">
                            <OfferSection channel="HOME" onClaim={handleClaimOffer} />
                        </div>
                    </div>
                )}

                {currentView === 'SAVINGS' && <BankingView channel="SAVINGS" title="Savings & Investments" onClaim={handleClaimOffer} />}
                {currentView === 'CARDS' && <BankingView channel="CARDS" title="Premium Credit & Debit Cards" onClaim={handleClaimOffer} />}
                {currentView === 'LOANS' && <BankingView channel="LOANS" title="Personal & Mortgage Loans" onClaim={handleClaimOffer} />}
                {currentView === 'BUSINESS' && <BankingView channel="BUSINESS" title="Business Banking Solutions" onClaim={handleClaimOffer} />}
                {currentView === 'MEMBERSHIP' && <BankingView channel="MEMBERSHIP" title="Membership & Eligibility" onClaim={handleClaimOffer} />}

                {/* Shared Sections */}
                {currentView === 'HOME' && (
                    <>
                        <TrustSection />
                        <MobilePromoSection />
                    </>
                )}
            </main>

            <Footer onAdminClick={openAdminLogin} />

            <LoginModal
                isOpen={loginState.isOpen}
                onClose={closeLogin}
                isAdminMode={loginState.isAdmin}
            />

            {selectedOffer && (
                <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl max-h-[90vh]">
                        <SmartForm
                            offer={selectedOffer}
                            onClose={() => setSelectedOffer(null)}
                        />
                    </div>
                </div>
            )}

            <StickyPromo onClaim={handleClaimOffer} />
        </div>
    );
};

const TrustTile = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
    <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-premium group hover:border-[#002D72]/20 transition-all duration-500">
        <div className="mb-8 w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition duration-500">
            {React.cloneElement(icon as React.ReactElement, { size: 32 })}
        </div>
        <h3 className="text-2xl font-black text-[#002D72] mb-4 tracking-tight">{title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

const ToolCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
    <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-3 transition min-w-[200px] group">
        <div className="text-[#FFB81C] group-hover:scale-110 transition">{icon}</div>
        <span className="font-bold text-sm tracking-tight">{label}</span>
    </button>
);


