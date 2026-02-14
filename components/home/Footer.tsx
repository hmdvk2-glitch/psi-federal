import React from 'react';
import { BarChart3, Shield, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
    onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
    return (
        <footer className="bg-[#001D4D] text-white pt-24 pb-12 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg text-[#002D72] shadow-lg">
                                <BarChart3 size={24} strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                                Federal <span className="text-blue-400">Trust</span>
                            </h2>
                        </div>
                        <p className="text-blue-100/60 font-medium max-w-sm leading-relaxed">
                            A mirrored simulation of a world-class federal credit union experience. Committed to financial clarity and member empowerment.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 transition group">
                                    <Icon size={18} className="text-blue-100 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-black uppercase tracking-widest text-[#FFB81C] text-xs mb-6">About Us</h4>
                        <ul className="space-y-4 text-sm font-medium text-blue-100/60">
                            <li><a href="#" className="hover:text-white transition">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition">Our History</a></li>
                            <li><a href="#" className="hover:text-white transition">Leadership</a></li>
                            <li><a href="#" className="hover:text-white transition">Membership</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-widest text-[#FFB81C] text-xs mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm font-medium text-blue-100/60">
                            <li><a href="#" className="hover:text-white transition">Search Locations</a></li>
                            <li><a href="#" className="hover:text-white transition">Education Center</a></li>
                            <li><a href="#" className="hover:text-white transition">Calculators</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase tracking-widest text-[#FFB81C] text-xs mb-6">Security</h4>
                        <ul className="space-y-4 text-sm font-medium text-blue-100/60">
                            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition">Security Center</a></li>
                            <li><a href="#" className="hover:text-white transition">Fraud Alerts</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-[10px] font-bold text-blue-100/40 uppercase tracking-[0.2em] text-center md:text-left">
                        © 2026 Federal Trust Credit Union Mirror. <br className="md:hidden" /> Insured by NCUA. Equal Housing Lender.
                    </div>

                    <div className="flex items-center gap-6">
                        {/* HIDDEN ADMIN SHIELD */}
                        <button
                            onClick={onAdminClick}
                            className="group relative flex items-center gap-2 text-white/5 hover:text-white/20 transition-all duration-700 cursor-default"
                            title="Authorized Personnel Only"
                        >
                            <Shield size={16} className="opacity-50 group-hover:opacity-100 transition" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">Vault Access</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
