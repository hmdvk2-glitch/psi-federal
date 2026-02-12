
import React, { useState } from 'react';
import { 
  CreditCard, Landmark, Car, Home, TrendingUp, LifeBuoy, 
  CheckCircle2, Star, ArrowRight, ShieldCheck, Calculator, 
  BookOpen, Users, Zap, Shield, ChevronRight, PlayCircle,
  HelpCircle, UserCheck, Award
} from 'lucide-react';

const HomepagePreview: React.FC = () => {
  const [eligibility, setEligibility] = useState<string | null>(null);

  const products = [
    { title: 'Checking', icon: <Landmark className="text-[#0B2E4F]" />, desc: 'No monthly fees. Full digital banking.', action: 'Learn More' },
    { title: 'Auto Loans', icon: <Car className="text-[#2E9E6F]" />, desc: 'Low 2.99% APR* fixed for 60 months.', action: 'Apply Now' },
    { title: 'Credit Cards', icon: <CreditCard className="text-[#F2A900]" />, desc: 'Unlimited 1.5% cash back on all purchases.', action: 'Compare' },
    { title: 'Mortgages', icon: <Home className="text-indigo-600" />, desc: 'VA, FHA, and conventional first-time options.', action: 'Get Rates' },
    { title: 'Savings', icon: <TrendingUp className="text-[#2E9E6F]" />, desc: 'High-yield 4.50% APY* with no minimums.', action: 'Open Now' },
    { title: 'Personal', icon: <LifeBuoy className="text-rose-500" />, desc: 'Fast cash for any need. Decisions in minutes.', action: 'Apply' }
  ];

  return (
    <div className="space-y-24 animate-in fade-in duration-700 pb-20">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[650px] rounded-psi-hero overflow-hidden shadow-2xl mx-auto max-w-[1400px]">
        <img 
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
          alt="Member lifestyle"
        />
        <div className="absolute inset-0 hero-wash"></div>
        
        <div className="relative z-10 h-full flex items-center px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                 <span className="px-3 py-1 bg-[#FFD700] text-[#0B2E4F] rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Since 1967</span>
                 <span className="text-white/60 text-xs font-bold flex items-center gap-1"><ShieldCheck size={14} /> NCUA Insured</span>
                 <span className="text-white/60 text-xs font-bold flex items-center gap-1"><Award size={14} className="text-[#FFD700]" /> 5-star Bauer rating</span>
              </div>
              <div className="space-y-4">
                <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tighter">Banking Built for Service.</h1>
                <p className="text-3xl font-bold text-[#FFD700] tracking-tight">Financial Power for Those Who Protect.</p>
              </div>
              <p className="text-xl text-white/80 max-w-lg leading-relaxed font-medium">
                Low rates. Lifetime membership. Exclusive federal benefits. We exist to serve those who serve our country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="px-10 py-5 bg-[#FFD700] text-[#0B2E4F] rounded-2xl font-black text-lg hover:bg-white hover:scale-105 transition shadow-2xl shadow-[#FFD700]/20">Join PSI Federal</button>
                 <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl font-black text-lg hover:bg-white/20 transition">Check Auto Loan Rates</button>
              </div>
            </div>
            
            <div className="hidden lg:flex justify-end">
               <div className="bg-white/10 backdrop-blur-xl p-8 rounded-psi-lg border border-white/20 shadow-2xl w-full max-w-sm">
                 <h4 className="text-white font-black text-xl mb-6 flex items-center gap-2">
                   <TrendingUp className="text-[#FFD700]" size={20} /> Featured Rates
                 </h4>
                 <div className="space-y-6">
                    <HeroRateTile label="Auto Loan" rate="2.99" trend="-0.12%" />
                    <HeroRateTile label="Mortgage" rate="6.25" trend="Stable" />
                    <HeroRateTile label="Savings APY" rate="4.50" trend="+0.05%" />
                 </div>
                 <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black uppercase tracking-widest transition">View All Rates</button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCT QUICK-ACCESS GRID */}
      <section className="space-y-16 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-[#0B2E4F] tracking-tighter uppercase">Explore PSI Federal Products</h2>
          <div className="w-24 h-1.5 bg-[#FFD700] mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p, idx) => (
            <div key={idx} className="bg-white p-10 rounded-psi-lg border border-slate-100 shadow-lg hover:shadow-2xl transition-all group hover:-translate-y-2">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0B2E4F]/5 transition">
                <div className="group-hover:scale-110 transition duration-500">
                  {p.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black text-[#0B2E4F] mb-2">{p.title}</h3>
              <p className="text-base text-slate-500 font-medium mb-8 leading-relaxed">{p.desc}</p>
              <button className="flex items-center gap-2 text-sm font-black text-[#0B2E4F] uppercase tracking-widest group-hover:gap-3 transition-all">
                {p.action} <ArrowRight size={18} className="text-[#FFD700]" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: RATES COMPARISON BAND */}
      <section className="bg-slate-100 rounded-psi-lg py-12 px-16 max-w-7xl mx-auto border border-slate-200">
         <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-1 flex-shrink-0">
              <h3 className="text-2xl font-black text-[#0B2E4F] tracking-tight">Real-Time Member Rates</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#2E9E6F]" /> Verified Institutional Data
              </p>
            </div>
            <div className="flex gap-16 overflow-x-auto pb-4 scrollbar-hide w-full lg:w-auto">
               <RateBand rate="2.9%" product="Auto Loans" action="Apply" />
               <RateBand rate="0% Intro" product="Credit Cards" action="Learn" />
               <RateBand rate="4.1%" product="Mortgages" action="View" />
               <RateBand rate="4.5%" product="Savings APY" action="Open" />
            </div>
         </div>
      </section>

      {/* SECTION 4: TRUST REINFORCEMENT */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white rounded-psi-lg shadow-sm border border-slate-100 text-center">
         <h2 className="text-4xl font-black text-[#0B2E4F] tracking-tighter mb-20">Why 14M+ Members Trust PSI Federal</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <TrustCard icon={<Star className="text-[#FFD700]" fill="#FFD700" />} title="#1 Military Credit Union" sub="Ranked by Forbes 2024" />
            <TrustCard icon={<CheckCircle2 className="text-[#2E9E6F]" />} title="98% Satisfaction" sub="Member Loyalty Score" />
            <TrustCard icon={<Shield className="text-[#0B2E4F]" />} title="Federal Security" sub="NCUA Tier-1 Protection" />
         </div>
      </section>

      {/* SECTION 6: FEATURED BENEFITS SPLIT SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Section A */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-psi-hero overflow-hidden shadow-2xl aspect-video bg-slate-200 group relative">
            <img 
              src="https://images.unsplash.com/photo-1556742521-9713529b5a95?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              alt="Checking services"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500"></div>
          </div>
          <div className="space-y-8">
            <h3 className="text-4xl font-black text-[#0B2E4F] tracking-tighter">Checking Without Compromise</h3>
            <div className="space-y-6">
              <BenefitItem label="No monthly maintenance fees" />
              <BenefitItem label="Early direct deposit pay access" />
              <BenefitItem label="Nationwide 30,000+ surcharge-free ATMs" />
            </div>
            <button className="px-10 py-4 bg-psi-navy text-white rounded-2xl font-black hover:bg-[#071F36] transition shadow-lg shadow-black/10">Open Account</button>
          </div>
        </div>

        {/* Section B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <h3 className="text-4xl font-black text-[#0B2E4F] tracking-tighter">Loans That Move With You</h3>
            <div className="space-y-6">
              <BenefitItem label="Auto, Personal, and Student lending" />
              <BenefitItem label="Deployment deferment for service members" />
              <BenefitItem label="Skip-a-Payment options available" />
            </div>
            <button className="px-10 py-4 bg-psi-navy text-white rounded-2xl font-black hover:bg-[#071F36] transition shadow-lg shadow-black/10">Explore Loans</button>
          </div>
          <div className="order-1 lg:order-2 rounded-psi-hero overflow-hidden shadow-2xl aspect-video bg-slate-200 group relative">
            <img 
              src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              alt="Loan services"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500"></div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINANCIAL EDUCATION HUB */}
      <section className="bg-slate-900 rounded-psi-hero py-24 px-12 text-white overflow-hidden relative max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        <div className="relative z-10 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tighter uppercase">Financial Knowledge Center</h2>
            <p className="text-indigo-200 text-lg max-w-lg mx-auto">Empowering our members with the tools and education to build lifelong wealth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EducationCard 
              icon={<Home size={24} />} 
              title="Home Buying Guide" 
              desc="Step-by-step path to your first home."
            />
            <EducationCard 
              icon={<Calculator size={24} />} 
              title="Debt Payoff Tool" 
              desc="Calculators to help you find financial freedom."
            />
            <EducationCard 
              icon={<Zap size={24} />} 
              title="PCS Relocation Tips" 
              desc="Moving made easier for military families."
            />
          </div>
          <div className="text-center">
            <button className="flex items-center gap-2 text-[#FFD700] font-black uppercase tracking-widest mx-auto hover:gap-4 transition-all">
              Explore Education Hub <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: MEMBERSHIP ELIGIBILITY */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-[#0B2E4F] tracking-tighter uppercase">Who Can Join PSI Federal</h2>
          <p className="text-slate-500 text-lg">Membership is open to all who have served or are currently serving in the U.S. Federal Government.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <EligibilityPill icon={<UserCheck size={18} />} label="Active Duty" />
          <EligibilityPill icon={<Users size={18} />} label="Veterans" />
          <EligibilityPill icon={<Users size={18} />} label="Military Families" />
          <EligibilityPill icon={<Landmark size={18} />} label="Federal Employees" />
        </div>

        <div className="p-8 bg-slate-50 border border-slate-200 rounded-psi-lg space-y-6">
           <h4 className="font-black text-[#0B2E4F] text-xl">Not sure if you qualify?</h4>
           <p className="text-slate-600">Our interactive eligibility selector can help you determine your membership path in seconds.</p>
           <button 
            onClick={() => setEligibility('check')}
            className="px-10 py-4 bg-white border-2 border-psi-navy text-psi-navy rounded-2xl font-black hover:bg-psi-navy hover:text-white transition"
           >
             Check Eligibility
           </button>
        </div>
      </section>

      {/* SECTION 9: FINAL CONVERSION CTA */}
      <section className="cta-gradient rounded-psi-hero p-24 text-center text-white relative overflow-hidden shadow-2xl max-w-7xl mx-auto">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -ml-64 -mt-64"></div>
         <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-6xl font-black tracking-tighter leading-none">Ready to join your credit union?</h2>
              <p className="text-2xl text-indigo-100/80 font-medium tracking-tight">Secure your financial future with 2.1 million fellow members.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
               <button className="px-12 py-6 bg-[#FFD700] text-[#0B2E4F] rounded-2xl font-black text-2xl hover:scale-105 transition shadow-2xl">Become a Member</button>
               <button className="px-12 py-6 bg-white/10 text-white border border-white/30 rounded-2xl font-black text-2xl hover:bg-white/20 transition">Schedule Appointment</button>
            </div>
            <div className="pt-10 flex items-center justify-center gap-6">
               <div className="text-right border-r border-white/20 pr-6">
                 <p className="text-4xl font-black">24/7</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Live Support</p>
               </div>
               <div className="text-left">
                 <p className="text-4xl font-black">800-PSI-FED</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Global Hotline</p>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

const HeroRateTile: React.FC<{ label: string, rate: string, trend: string }> = ({ label, rate, trend }) => (
  <div className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
    <div className="space-y-1">
      <p className="text-white font-bold">{label}</p>
      <div className="flex items-center gap-2">
         <span className="text-[8px] font-black uppercase tracking-widest text-[#FFD700] px-1.5 py-0.5 border border-[#FFD700]/30 rounded">Trending</span>
         <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-[#2E9E6F]' : 'text-[#FFD700]'}`}>{trend}</span>
      </div>
    </div>
    <div className="text-right">
      <p className="text-4xl font-black text-[#FFD700] tracking-tighter">{rate}%</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">APR*</p>
    </div>
  </div>
);

const RateBand: React.FC<{ rate: string, product: string, action: string }> = ({ rate, product, action }) => (
  <div className="flex items-center gap-6 min-w-fit">
    <div className="text-right">
       <p className="text-4xl font-black text-[#0B2E4F] tracking-tighter leading-none">{rate}</p>
       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fixed</p>
    </div>
    <div className="space-y-1">
       <p className="text-sm font-black text-slate-900">{product}</p>
       <button className="text-[10px] font-black text-[#0B2E4F] uppercase tracking-widest border-b-2 border-[#0B2E4F] pb-0.5 hover:text-[#3BB3C3] hover:border-[#3BB3C3] transition">
         [{action} Now]
       </button>
    </div>
  </div>
);

const TrustCard: React.FC<{ icon: React.ReactNode, title: string, sub: string }> = ({ icon, title, sub }) => (
  <div className="space-y-4 p-8 rounded-psi group hover:bg-slate-50 transition duration-500">
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 scale-125 group-hover:scale-150 transition duration-700">
       {icon}
    </div>
    <h4 className="text-xl font-black text-[#0B2E4F] tracking-tight uppercase">{title}</h4>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
  </div>
);

const BenefitItem: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-4 text-slate-700 font-medium">
    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
      <CheckCircle2 size={16} className="text-[#2E9E6F]" />
    </div>
    {label}
  </div>
);

const EducationCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-psi-lg hover:bg-white/10 transition group cursor-pointer">
    <div className="w-12 h-12 bg-[#FFD700] text-[#0B2E4F] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
      {icon}
    </div>
    <h4 className="text-xl font-black mb-2">{title}</h4>
    <p className="text-sm text-indigo-200 font-medium leading-relaxed">{desc}</p>
  </div>
);

const EligibilityPill: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <div className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm font-black text-xs uppercase tracking-tight text-[#0B2E4F]">
    {icon} {label}
  </div>
);

export default HomepagePreview;
