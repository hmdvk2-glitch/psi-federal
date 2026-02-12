
import React from 'react';
import { RoadmapPhase, Metric } from '../types';
import { 
  Rocket, 
  Target, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  Code, 
  Palette, 
  CheckCircle2, 
  Clock, 
  Layout, 
  Users,
  Briefcase,
  Zap
} from 'lucide-react';

const PHASES: RoadmapPhase[] = [
  {
    id: 'P1',
    title: 'Phase 1: Header/Navigation System',
    timeline: 'Weeks 1-2',
    status: 'COMPLETED',
    deliverables: ['3-Layer Responsive Header', 'Mega Menu Architecture', 'Northstar Mobile Adaptation']
  },
  {
    id: 'P2',
    title: 'Phase 2: Conversion-Optimized Homepage',
    timeline: 'Weeks 3-4',
    status: 'IN_PROGRESS',
    deliverables: ['Hero Funnel Redesign', 'Product Quick-Access Grid', 'Rates API Integration']
  },
  {
    id: 'P3',
    title: 'Phase 3: Product Category Pages',
    timeline: 'Weeks 5-6',
    status: 'PLANNED',
    deliverables: ['Financial Literacy Hub', 'Mortgage Landing Template', 'Auto Loan Funnel']
  },
  {
    id: 'P4',
    title: 'Phase 4: Tools & Calculators',
    timeline: 'Weeks 7-8',
    status: 'PLANNED',
    deliverables: ['Interactive Prequal Flows', 'Debt Payoff Calculator', 'Live Chat Integration']
  },
  {
    id: 'P5',
    title: 'Phase 5: Optimization & Testing',
    timeline: 'Weeks 9-12',
    status: 'PLANNED',
    deliverables: ['A/B Navigation Testing', 'WCAG Audit Remediation', 'Performance Tuning']
  }
];

const SUCCESS_METRICS: Metric[] = [
  { label: 'Mobile Conversion Rate', value: '3.8%', target: '5.0%', trend: 'UP' },
  { label: 'Application Completion', value: '68%', target: '80%', trend: 'UP' },
  { label: 'WCAG Compliance Score', value: '94/100', target: '100/100', trend: 'STABLE' },
  { label: 'Page Load Speed', value: '1.2s', target: '< 1.5s', trend: 'UP' }
];

const ModernizationPlan: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-7xl mx-auto">
      {/* Executive Summary */}
      <section className="bg-white rounded-[40px] p-12 border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0B2E4F]/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#0B2E4F] text-white rounded-full text-[10px] font-black uppercase tracking-widest">Confidential</span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border border-slate-200 px-2 py-1 rounded">Project: Northstar Overhaul</span>
            </div>
            <h1 className="text-5xl font-black text-[#0B2E4F] tracking-tighter leading-none">Institutional Modernization Plan</h1>
            <p className="text-2xl text-slate-600 leading-relaxed font-medium max-w-2xl">
              Driving a <span className="text-[#2E9E6F] font-black underline decoration-[#FFD700] decoration-4">15% ROI projection</span> through product-first information architecture and conversion-optimized mobile paths.
            </p>
            <div className="flex gap-4">
               <button className="px-10 py-5 bg-[#0B2E4F] text-white rounded-2xl font-black shadow-2xl shadow-black/20 hover:bg-[#071F36] transition flex items-center gap-2">
                 <Rocket size={20} /> Deploy Active Phase
               </button>
               <button className="px-10 py-5 bg-slate-100 text-slate-700 rounded-2xl font-black hover:bg-slate-200 transition">Strategy Deck PDF</button>
            </div>
          </div>
          <div className="lg:w-96 grid grid-cols-2 gap-4">
             {SUCCESS_METRICS.map((m, i) => (
               <div key={i} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 shadow-sm hover:border-[#0B2E4F]/20 transition">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{m.label}</p>
                  <p className="text-2xl font-black text-[#0B2E4F]">{m.value}</p>
                  <p className="text-[10px] font-black text-[#2E9E6F] flex items-center gap-1 mt-2">
                    <TrendingUp size={12} /> Target: {m.target}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center px-4">
             <h2 className="text-2xl font-black text-[#0B2E4F] tracking-tight uppercase flex items-center gap-3">
               <Calendar className="text-[#0B2E4F]" size={24} />
               Implementation Roadmap
             </h2>
             <span className="px-4 py-2 bg-slate-100 rounded-full text-xs font-black text-slate-500 uppercase">Week 4 of 12</span>
          </div>
          <div className="space-y-6">
            {PHASES.map((phase) => (
              <div key={phase.id} className={`p-8 rounded-[40px] border transition-all duration-500 ${
                phase.status === 'COMPLETED' ? 'bg-[#2E9E6F]/5 border-[#2E9E6F]/20 grayscale-[0.5]' : 
                phase.status === 'IN_PROGRESS' ? 'bg-[#0B2E4F]/5 border-[#0B2E4F]/30 ring-2 ring-[#0B2E4F]/5 shadow-xl' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-black text-[#0B2E4F] tracking-tight uppercase">{phase.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{phase.timeline}</span>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    phase.status === 'COMPLETED' ? 'bg-[#2E9E6F] text-white' : 
                    phase.status === 'IN_PROGRESS' ? 'bg-[#0B2E4F] text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.deliverables.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                         phase.status === 'COMPLETED' ? 'bg-[#2E9E6F]/10 text-[#2E9E6F]' : 'bg-slate-100 text-slate-400'
                       }`}>
                         {phase.status === 'COMPLETED' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                       </div>
                       {d}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0B2E4F] text-white p-10 rounded-[40px] shadow-2xl space-y-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-[50px] -mr-20 -mt-20"></div>
             <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase">
               <Palette className="text-[#FFD700]" size={24} />
               Design DNA
             </h2>
             <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Core Palette</p>
                  <div className="flex gap-4">
                     <TokenSwatch color="#0B2E4F" label="NAVY" />
                     <TokenSwatch color="#2E9E6F" label="GREEN" />
                     <TokenSwatch color="#FFD700" label="GOLD" />
                     <TokenSwatch color="#2C3E50" label="GRAY" />
                  </div>
                </div>
                <div className="pt-8 border-t border-white/10">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Performance Budget</p>
                   <PerformanceRow label="Initial Load" value="1.4s" status="PASS" />
                   <PerformanceRow label="CLS" value="0.08" status="PASS" />
                   <PerformanceRow label="Accessibility" value="98%" status="PASS" />
                </div>
             </div>
          </div>
          
          <div className="bg-[#2E9E6F]/5 p-8 rounded-[40px] border border-[#2E9E6F]/20 space-y-6">
             <h4 className="font-black text-[#0B2E4F] uppercase tracking-widest text-sm flex items-center gap-2">
               <Zap className="text-[#2E9E6F]" size={16} /> Strategy Impact
             </h4>
             <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
               "By aligning the information architecture with member primary tasks, we reduce the time-to-conversion by an estimated 28% while reinforcing institutional stability."
             </p>
             <div className="flex gap-4 pt-2">
                <div className="bg-white px-4 py-2 rounded-xl border border-[#2E9E6F]/10">
                   <p className="text-xl font-black text-[#2E9E6F]">2.1M</p>
                   <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Active Members</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-[#2E9E6F]/10">
                   <p className="text-xl font-black text-[#2E9E6F]">15%</p>
                   <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">Growth Forecast</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TokenSwatch: React.FC<{ color: string, label: string }> = ({ color, label }) => (
  <div className="text-center group cursor-help">
    <div className="w-12 h-12 rounded-xl shadow-xl mb-2 border border-white/20 group-hover:scale-110 transition" style={{ backgroundColor: color }}></div>
    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{label}</span>
  </div>
);

const PerformanceRow: React.FC<{ label: string, value: string, status: string }> = ({ label, value, status }) => (
  <div className="flex justify-between items-center mb-3">
    <span className="text-xs font-bold text-slate-300">{label}</span>
    <div className="flex items-center gap-2">
       <span className="text-xs font-black text-white">{value}</span>
       <span className="px-1.5 py-0.5 bg-[#2E9E6F] text-white text-[8px] font-black rounded uppercase">{status}</span>
    </div>
  </div>
);

export default ModernizationPlan;
