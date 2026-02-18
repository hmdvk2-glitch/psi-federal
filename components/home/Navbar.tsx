import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, HelpCircle, BarChart3, Menu, X, User } from 'lucide-react';

interface NavbarProps {
    onLoginClick: () => void;
    setView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, setView }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed w-full z-50">
            {/* Top Utility Bar */}
            <div className="bg-[#001D4D] text-white py-1.5 px-6 hidden lg:block border-b border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-bold tracking-wider uppercase">
                    <div className="flex gap-6">
                        <a href="#" className="flex items-center gap-1.5 hover:text-[#FFB81C] transition"><MapPin size={12} /> Locations</a>
                        <a href="#" className="flex items-center gap-1.5 hover:text-[#FFB81C] transition"><Phone size={12} /> Contact</a>
                        <a href="#" className="flex items-center gap-1.5 hover:text-[#FFB81C] transition"><BarChart3 size={12} /> Rates</a>
                        <a href="#" className="flex items-center gap-1.5 hover:text-[#FFB81C] transition"><HelpCircle size={12} /> Help Center</a>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="hover:text-[#FFB81C] transition flex items-center gap-1.5 uppercase tracking-widest"><Search size={14} /> Search</button>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className={`transition-all duration-300 px-6 ${isScrolled ? 'bg-white shadow-xl py-3' : 'bg-white/95 backdrop-blur-md py-4'
                }`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo Placeholder */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="bg-[#002D72] p-2 rounded-lg text-white group-hover:bg-[#004A99] transition shadow-lg">
                            <BarChart3 size={24} strokeWidth={3} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-[#002D72] leading-none tracking-tighter uppercase italic">
                                PSI Federal <span className="text-[#004A99]">CU</span>
                            </h1>
                            <p className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase">Premier Federal Credit Union</p>
                        </div>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex gap-6 text-[13px] font-bold text-slate-700">
                            {[
                                { name: 'Home', view: 'HOME' },
                                { name: 'Personal', view: 'PERSONAL' },
                                { name: 'Savings', view: 'SAVINGS' },
                                { name: 'Cards', view: 'CARDS' },
                                { name: 'Loans', view: 'LOANS' },
                                { name: 'Business', view: 'BUSINESS' },
                                { name: 'Membership', view: 'MEMBERSHIP' },
                                { name: 'Mobile App', view: 'MOBILE' },
                                { name: 'Help', view: 'SUPPORT' }
                            ].map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => setView(item.view)}
                                    className="hover:text-[#002D72] transition relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#002D72] transition-all group-hover:w-full"></span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={onLoginClick}
                            className="bg-[#002D72] text-white px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-widest hover:bg-[#001D4D] transition shadow-md flex items-center gap-2"
                        >
                            <User size={16} /> Sign In
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button className="lg:hidden text-[#002D72]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-slate-100 p-6 animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-4 mb-6">
                        {[
                            { name: 'Home', view: 'HOME' },
                            { name: 'Personal Banking', view: 'PERSONAL' },
                            { name: 'Checking & Savings', view: 'SAVINGS' },
                            { name: 'Credit Cards', view: 'CARDS' },
                            { name: 'Personal Loans', view: 'LOANS' },
                            { name: 'Business Banking', view: 'BUSINESS' },
                            { name: 'Membership', view: 'MEMBERSHIP' },
                            { name: 'Digital Banking', view: 'MOBILE' },
                            { name: 'Support Center', view: 'SUPPORT' }
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => { setView(item.view); setIsMobileMenuOpen(false); }}
                                className="text-left text-lg font-bold text-[#002D72] border-b border-slate-50 pb-2"
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onLoginClick}
                        className="w-full bg-[#002D72] text-white py-4 rounded-xl font-black uppercase tracking-widest"
                    >
                        Sign In
                    </button>
                </div>
            )}
        </nav>
    );
};
