
import React, { useState } from 'react';
import { Search, MapPin, User, ChevronDown, Menu, X, ShieldCheck, CreditCard, Layout, Smartphone, Star, Zap, Monitor, Smartphone as MobileIcon, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

const HeaderPreview: React.FC = () => {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const megaMenuBanking = {
    categories: [
      { name: 'Checking', items: ['Premier Checking', 'Basic Checking', 'Student Access'] },
      { name: 'Savings', items: ['Regular Savings', 'High-Yield Savings', 'Youth Savings'] },
      { name: 'Money Market', items: ['High-Yield MM', 'Jumbo MM'] },
      { name: 'CDs', items: ['12-Month CD', '24-Month CD', 'Special Term CD'] }
    ],
    featured: {
      title: 'Earn $300 bonus',
      desc: 'When you open an Everyday Checking account.',
      rating: 4.8
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl font-black text-psi-navy tracking-tight">Enterprise Navigation Engine</h2>
          <p className="text-slate-500 font-medium">Cross-Platform UX Blueprint • Northstar DS v4.2</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setViewMode('desktop')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'desktop' ? 'bg-white text-psi-navy shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Monitor size={14} /> Desktop
          </button>
          <button 
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'mobile' ? 'bg-white text-psi-navy shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <MobileIcon size={14} /> Mobile
          </button>
        </div>
      </div>

      <div className="relative group bg-slate-100 p-6 md:p-12 rounded-psi-hero border border-slate-200 shadow-inner overflow-hidden flex justify-center">
        
        {viewMode === 'desktop' ? (
          /* DESKTOP PREVIEW */
          <div className="bg-white rounded-psi-lg shadow-2xl border border-slate-100 overflow-visible min-h-[500px] w-full relative animate-in zoom-in-95 duration-300">
            {/* LAYER 1: UTILITY BAR (40px) */}
            <div className="bg-[#0B2E4F] text-white px-8 h-[40px] flex justify-between items-center text-[11px] font-black uppercase tracking-[0.1em] relative z-50">
              <div className="flex gap-8">
                <a href="#" className="hover:text-[#FFD700] transition">Rates</a>
                <a href="#" className="hover:text-[#FFD700] transition">Locations</a>
                <a href="#" className="hover:text-[#FFD700] transition">Support</a>
                <a href="#" className="hover:text-[#FFD700] transition">Security</a>
              </div>
              <div className="flex items-center gap-8 h-full">
                <button className="flex items-center gap-2 hover:text-[#FFD700] transition h-full px-2">
                  <Search size={14} /> Search 🔍
                </button>
                <button className="flex items-center gap-2 h-full bg-white/10 px-4 hover:bg-white/20 transition">
                  Sign In → <User size={12} />
                </button>
              </div>
            </div>

            {/* LAYER 2: PRIMARY NAVIGATION (60px) */}
            <div className="bg-white border-b border-slate-100 px-8 h-[60px] flex justify-between items-center relative z-40">
              <div className="flex items-center gap-10 h-full">
                <div className="flex items-center gap-2 pr-4">
                  <div className="w-9 h-9 bg-[#0B2E4F] rounded-xl flex items-center justify-center font-black text-white shadow-lg">Ψ</div>
                  <span className="text-2xl font-black text-[#0B2E4F] tracking-tighter">PSI FEDERAL</span>
                </div>
                
                <nav className="hidden lg:flex gap-6 h-full items-center">
                  {['Checking & Savings', 'Credit Cards', 'Loans', 'Mortgages', 'Investments', 'Business'].map(item => (
                    <button 
                      key={item} 
                      onMouseEnter={() => item.includes('Checking') && setActiveMega('Banking')}
                      className={`text-[13px] font-black transition flex items-center gap-1.5 h-full border-b-4 tracking-tight ${
                        (activeMega === 'Banking' && item.includes('Checking')) ? 'text-[#0B2E4F] border-[#0B2E4F]' : 'text-slate-600 border-transparent hover:text-[#0B2E4F]'
                      }`}
                    >
                      {item} {item.includes('Checking') && <ChevronDown size={14} className="opacity-30" />}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex items-center h-full">
                <button className="px-6 py-2 bg-[#0B2E4F] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-black/10 hover:bg-[#071F36] transition scale-90">
                  Join Now
                </button>
              </div>
            </div>

            {/* Mega Menu Dropdown */}
            {activeMega === 'Banking' && (
              <div 
                className="absolute top-[100px] left-0 w-full bg-white shadow-2xl border-b border-slate-100 p-12 z-30 animate-in slide-in-from-top-2 duration-300 grid grid-cols-5 gap-12"
                onMouseLeave={() => setActiveMega(null)}
              >
                {megaMenuBanking.categories.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-black text-[#0B2E4F] uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">{cat.name}</h4>
                    <ul className="space-y-4">
                      {cat.items.map((item, i) => (
                        <li key={i}><a href="#" className="text-[13px] text-slate-500 hover:text-slate-900 transition font-bold">{item}</a></li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="col-span-1">
                  <div className="bg-slate-50 p-8 rounded-psi border border-slate-100">
                    <div className="flex gap-1 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-[#FFD700] text-[#FFD700]" />)}
                    </div>
                    <h5 className="font-black text-[#0B2E4F] text-sm mb-2">{megaMenuBanking.featured.title}</h5>
                    <p className="text-[11px] text-slate-500 mb-6 font-bold leading-relaxed">{megaMenuBanking.featured.desc}</p>
                    <button className="w-full py-3 bg-[#0B2E4F] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#071F36] transition shadow-md">Open Account</button>
                  </div>
                </div>
              </div>
            )}

            {/* LAYER 3: CONTEXTUAL STRIP (50px) */}
            <div className="bg-gradient-to-r from-[#0B2E4F] to-[#174A7C] px-8 h-[50px] flex justify-between items-center relative z-20 text-white shadow-md">
              <div className="flex items-center gap-4">
                <span className="bg-[#FFD700] text-[#0B2E4F] px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tighter shadow-sm">MEMBER OFFER</span>
                <p className="text-sm font-bold tracking-tight">Limited-Time <span className="text-[#FFD700]">2.9% Auto Loan APR*</span> — Members Only</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-white/10 text-white border border-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition">Calculate Payment</button>
                <button className="px-6 py-2 bg-[#FFD700] text-[#0B2E4F] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white transition shadow-md">Apply Now</button>
              </div>
            </div>

            {/* Page Placeholder */}
            <div className="p-24 text-center bg-slate-50/30">
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#0B2E4F]/20 shadow-xl border border-slate-100"><Layout size={40} /></div>
               <h2 className="text-5xl font-black text-[#0B2E4F] max-w-2xl mx-auto tracking-tighter leading-tight">Institutional Power. Individual Care.</h2>
               <p className="mt-8 text-slate-500 max-w-lg mx-auto text-lg leading-relaxed font-bold">Experience the financial stability of 55+ years of institutional excellence.</p>
            </div>
          </div>
        ) : (
          /* MOBILE PREVIEW - PHONE FRAME */
          <div className="relative w-[375px] h-[750px] bg-slate-900 rounded-[50px] p-4 shadow-2xl border-[10px] border-slate-800 animate-in zoom-in-95 duration-300">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-[60]"></div>
            
            <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col">
              
              {/* MOBILE HEADER (Priority+ Pattern) */}
              <div className="bg-[#0B2E4F] text-white h-[64px] px-6 flex justify-between items-center flex-shrink-0 relative z-[55]">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition active:scale-90 h-[44px] w-[44px] flex items-center justify-center">
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-1.5 font-black tracking-tighter">
                  <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-[10px] text-psi-navy">Ψ</div>
                  <span className="text-sm">PSI FEDERAL</span>
                </div>
                <button className="p-2 -mr-2 hover:bg-white/10 rounded-full transition h-[44px] w-[44px] flex items-center justify-center">
                  <User size={20} />
                </button>
              </div>

              {/* MOBILE MENU OVERLAY */}
              {isMobileMenuOpen && (
                <div className="absolute inset-0 bg-[#0B2E4F] z-50 pt-[80px] px-8 animate-in slide-in-from-left duration-300">
                  <div className="space-y-6">
                    {['Banking', 'Borrowing', 'Home Lending', 'Investing', 'Business'].map(item => (
                      <button key={item} className="w-full flex justify-between items-center text-xl font-black text-white py-4 border-b border-white/10">
                        {item} <ChevronDown size={20} className="text-white/40" />
                      </button>
                    ))}
                    <div className="pt-8 space-y-4">
                      <button className="w-full py-4 bg-[#FFD700] text-[#0B2E4F] rounded-2xl font-black text-sm uppercase tracking-widest">Open Account</button>
                      <button className="w-full py-4 bg-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest border border-white/20">Find Branch</button>
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE CONTENT AREA */}
              <div className="flex-1 overflow-y-auto pb-[100px] scrollbar-hide">
                {/* Contextual Alert */}
                <div className="bg-[#FFD700] p-4 text-center">
                   <p className="text-[10px] font-black text-[#0B2E4F] uppercase tracking-widest">Limited-Time Offer</p>
                   <p className="text-xs font-bold text-[#0B2E4F]">2.9% Auto Loan APR for Members*</p>
                </div>

                <div className="p-6 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-psi-navy tracking-tight leading-none">Premier Checking</h3>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-[#FFD700] text-[#FFD700]" />)}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Annual Percentage Yield</p>
                    <p className="text-4xl font-black text-psi-navy tracking-tighter">4.50% <span className="text-lg text-slate-400 font-bold uppercase">APY*</span></p>
                    <p className="text-xs font-bold text-[#2E9E6F] mt-1 flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> Market Leading Reward
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Key Benefits</h4>
                    <ul className="space-y-4">
                      {['No monthly maintenance fees', 'Early direct deposit access', '30,000+ Fee-free ATMs', 'Premium Identity Protection'].map((b, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                           <div className="w-5 h-5 rounded-full bg-emerald-50 text-[#2E9E6F] flex items-center justify-center flex-shrink-0">
                             <CheckCircle2 size={12} />
                           </div>
                           {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-2">
                     <Info size={24} className="mx-auto text-slate-300" />
                     <p className="text-xs font-bold text-slate-500">View additional details and full disclosures below.</p>
                  </div>
                </div>
              </div>

              {/* STICKY BOTTOM BAR (Mobile Action Bar) */}
              <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 h-[90px] flex items-center gap-4 z-[55] pb-2">
                <button className="flex-1 h-[52px] bg-slate-100 text-psi-navy rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition active:scale-95 border border-slate-200">
                  View Details
                </button>
                <button className="flex-[1.5] h-[52px] bg-psi-navy text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-black/20 hover:bg-[#071F36] transition active:scale-95 flex items-center justify-center gap-2">
                  Apply Now <ArrowRight size={14} className="text-[#FFD700]" />
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <SpecCard 
          icon={<Smartphone className="text-psi-navy" size={20} />}
          label="Priority Navigation"
          desc="Critical tasks (Join, Sign In) always within top 10% vertical space."
        />
        <SpecCard 
          icon={<ShieldCheck className="text-[#2E9E6F]" size={20} />}
          label="Thumb Zone Optimized"
          desc="Action bars use 52px targets to exceed 44px WCAG requirements."
        />
        <SpecCard 
          icon={<Zap className="text-[#FFD700]" size={20} />}
          label="Contextual Awareness"
          desc="Sticky CTAs persist across product pages for seamless conversion."
        />
        <SpecCard 
          icon={<CreditCard className="text-[#3BB3C3]" size={20} />}
          label="Responsive Stacking"
          desc="3-Layer model intelligently collapses into a functional single-column flow."
        />
      </div>
    </div>
  );
};

const SpecCard: React.FC<{ icon: React.ReactNode, label: string, desc: string }> = ({ icon, label, desc }) => (
  <div className="bg-white p-8 rounded-psi border border-slate-200 shadow-sm hover:border-psi-navy/40 transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-psi-navy/5 transition">{icon}</div>
      <h5 className="font-black text-psi-navy text-sm uppercase tracking-tight leading-none">{label}</h5>
    </div>
    <p className="text-xs text-slate-500 leading-relaxed font-bold opacity-80">{desc}</p>
  </div>
);

export default HeaderPreview;
