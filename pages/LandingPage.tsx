import React, { useState } from 'react';
import { Navbar } from '../components/home/Navbar';
import { Hero } from '../components/home/Hero';
import { FeatureStrip } from '../components/home/FeatureStrip';
import { RatesSection } from '../components/home/RatesSection';
import { Footer } from '../components/home/Footer';
import { LoginModal } from '../components/home/LoginModal';
import { ShieldAlert, ShieldCheck, PieChart, Smartphone, Calculator, Search } from 'lucide-react';

export const LandingPage: React.FC = () => {
    const [loginState, setLoginState] = useState<{ isOpen: boolean; isAdmin: boolean }>({
        isOpen: false,
        isAdmin: false
    });

    const openMemberLogin = () => setLoginState({ isOpen: true, isAdmin: false });
    const openAdminLogin = () => setLoginState({ isOpen: true, isAdmin: true });
    const closeLogin = () => setLoginState({ isOpen: false, isAdmin: false });

    return (
        <div className="min-h-screen bg-white selection:bg-[#002D72] selection:text-white">
            <Navbar onLoginClick={openMemberLogin} />

            <main>
                <Hero onLoginClick={openMemberLogin} />
                <FeatureStrip />
                <RatesSection />

                {/* TRUST & MEMBERSHIP SECTION (Mirrored Trust Block) */}
                <section className="py-24 px-6 bg-slate-50 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-16 max-w-2xl mx-auto">
                            <h2 className="text-4xl font-black text-[#002D72] mb-6 tracking-tight italic">Why Members Choose Us</h2>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">Join 13 million members who trust us with their financial future.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <TrustTile
                                icon={<ShieldCheck className="text-emerald-500" />}
                                title="Federally Insured"
                                desc="Your savings are protected up to $250,000 by the NCUA."
                            />
                            <TrustTile
                                icon={<PieChart className="text-[#002D72]" />}
                                title="Member Owned"
                                desc="As a not-for-profit, our earnings go back to you through better rates."
                            />
                            <TrustTile
                                icon={<ShieldAlert className="text-amber-500" />}
                                title="Fraud Monitoring"
                                desc="24/7 proactive account security and instant credit freezes."
                            />
                        </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#002D72]/5 to-transparent"></div>
                </section>

                {/* FINANCIAL TOOLS STRIP */}
                <section className="py-20 px-6 bg-[#002D72]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="text-white max-w-sm">
                                <h3 className="text-3xl font-black mb-4 tracking-tight">Smart Tools for Smart Planning</h3>
                                <p className="text-blue-100/60 font-medium">Use our guided calculators to plan your next big milestone.</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                <ToolCard icon={<Calculator />} label="Loan Estimator" />
                                <ToolCard icon={<PieChart />} label="Budget Planner" />
                                <ToolCard icon={<ShieldCheck />} label="Credit Checker" />
                                <ToolCard icon={<Search />} label="Find Branch" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* MOBILE APP PROMO SECTION */}
                <section className="py-24 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#002D72]/5 rounded-full blur-[100px]"></div>
                            <div className="relative bg-[#001D4D] rounded-[60px] p-12 shadow-2xl border-t border-white/10 max-w-md mx-auto aspect-[9/18] flex flex-col justify-between group overflow-hidden">
                                <div className="flex justify-between items-center text-white/40">
                                    <BarChart3Icon size={16} />
                                    <div className="flex gap-1 items-center">
                                        <div className="w-4 h-1.5 bg-white/20 rounded-full"></div>
                                        <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md">
                                        <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">Total Balance</p>
                                        <p className="text-2xl font-black text-white">$45,200.00</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[1, 2, 3].map(i => <div key={i} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center text-white/20 hover:bg-white/10 transition cursor-pointer"><PieChart size={20} /></div>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-5xl font-black text-[#002D72] tracking-tight leading-[1.1] italic">The Bank in Your <span className="text-[#004A99]">Pocket</span>.</h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
                                Manage your finances anytime, anywhere. Deposit checks, move funds, and monitor your credit with the highest-rated banking app.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition shadow-lg">
                                    <Smartphone size={32} />
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase font-black tracking-widest leading-none">Download on</p>
                                        <p className="text-lg font-bold leading-none mt-1">App Store</p>
                                    </div>
                                </button>
                                <button className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:scale-[1.02] transition shadow-lg">
                                    <Smartphone size={32} className="rotate-180" />
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase font-black tracking-widest leading-none">Get it on</p>
                                        <p className="text-lg font-bold leading-none mt-1">Google Play</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer onAdminClick={openAdminLogin} />

            <LoginModal
                isOpen={loginState.isOpen}
                onClose={closeLogin}
                isAdminMode={loginState.isAdmin}
            />
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

const BarChart3Icon = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 20V10M18 20V4M6 20V16" />
    </svg>
);
