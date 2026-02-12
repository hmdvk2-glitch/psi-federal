
import React, { useState } from 'react';
import { IANode } from '../types';
import { ChevronRight, ChevronDown, Network, Smartphone, Globe, Info, MousePointerClick, Zap } from 'lucide-react';

const SITE_MAP: IANode[] = [
  {
    label: 'Banking',
    path: '/banking',
    children: [
      { label: 'Checking Accounts', path: '/banking/checking' },
      { label: 'Savings Accounts', path: '/banking/savings' },
      { label: 'Money Market', path: '/banking/money-market' },
      { label: 'CDs', path: '/banking/cds' },
      { label: 'Compare All Accounts', path: '/banking/compare' },
    ],
  },
  {
    label: 'Borrowing',
    path: '/borrowing',
    children: [
      { label: 'Auto Loans', path: '/borrowing/auto' },
      { label: 'Personal Loans', path: '/borrowing/personal' },
      { label: 'Home Equity Loans', path: '/borrowing/home-equity' },
      { label: 'Student Loans', path: '/borrowing/student' },
      { label: 'Credit Cards', path: '/borrowing/credit-cards' },
      { label: 'Loan Application Hub', path: '/borrowing/hub' },
    ],
  },
  {
    label: 'Home Lending',
    path: '/home-lending',
    children: [
      { label: 'Mortgages', path: '/home-lending/mortgages' },
      { label: 'Refinancing', path: '/home-lending/refi' },
      { label: 'First-Time Homebuyers', path: '/home-lending/first-time' },
      { label: 'Mortgage Calculators', path: '/home-lending/calculators' },
    ],
  },
  {
    label: 'Investing & Insurance',
    path: '/investing',
    children: [
      { label: 'Investment Services', path: '/investing/services' },
      { label: 'Retirement Planning', path: '/investing/retirement' },
      { label: 'Life Insurance', path: '/investing/life-insurance' },
      { label: 'Auto/Home Insurance', path: '/investing/property-insurance' },
    ],
  },
  {
    label: 'Business Banking',
    path: '/business',
    children: [
      { label: 'Business Checking', path: '/business/checking' },
      { label: 'Business Loans', path: '/business/loans' },
      { label: 'Merchant Services', path: '/business/merchant' },
      { label: 'Treasury Management', path: '/business/treasury' },
    ],
  },
  {
    label: 'Member Resources',
    path: '/resources',
    children: [
      { label: 'Financial Wellness Hub', path: '/resources/wellness' },
      { label: 'Calculators & Tools', path: '/resources/tools' },
      { label: 'Blog & Education', path: '/resources/blog' },
      { label: 'Mobile & Online Banking', path: '/resources/digital-banking' },
      { label: 'Security Center', path: '/resources/security' },
    ],
  },
  {
    label: 'Membership',
    path: '/membership',
    children: [
      { label: 'Who Can Join', path: '/membership/eligibility' },
      { label: 'Benefits & Perks', path: '/membership/perks' },
      { label: 'Join Now', path: '/membership/join' },
      { label: 'Member Stories', path: '/membership/stories' },
    ],
  },
  {
    label: 'About Us',
    path: '/about',
    children: [
      { label: 'Our Story', path: '/about/story' },
      { label: 'Leadership', path: '/about/leadership' },
      { label: 'Community Impact', path: '/about/community' },
      { label: 'Careers', path: '/about/careers' },
    ],
  },
  {
    label: 'Locations',
    path: '/locations',
    children: [
      { label: 'Branch Locator', path: '/locations/branches' },
      { label: 'ATM Locator', path: '/locations/atms' },
      { label: 'Schedule Appointment', path: '/locations/appointments' },
      { label: 'Contact Us', path: '/contact' },
    ],
  },
];

const TreeNode: React.FC<{ node: IANode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="ml-6 border-l border-slate-200 pl-4 py-2 select-none">
      <div 
        className={`flex items-center gap-2 py-2 px-3 rounded-lg transition cursor-pointer group ${isOpen ? 'bg-[#0056A4]/5 text-[#0056A4]' : 'hover:bg-slate-100 text-slate-600'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        ) : (
          <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-slate-300 -mt-2 ml-1 rounded-bl-sm"></div>
        )}
        <span className={`text-sm ${hasChildren ? 'font-bold' : 'font-medium'}`}>
          {node.label}
        </span>
        {!hasChildren && (
          <span className="ml-2 text-[8px] bg-[#4A9D4A]/10 text-[#4A9D4A] px-1.5 py-0.5 rounded font-black tracking-tighter">CONVERSION PT</span>
        )}
        <span className="text-[10px] font-mono opacity-0 group-hover:opacity-40 ml-auto">{node.path}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="mt-1">
          {node.children!.map((child, idx) => (
            <TreeNode key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const SiteArchitecture: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0056A4] text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h3 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
              <Zap size={20} className="text-[#FFD700]" />
              Modern IA Strategy
            </h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex gap-3 text-sm text-indigo-100">
                <MousePointerClick className="text-[#FFD700] flex-shrink-0" size={18} />
                <div>
                  <p className="font-bold text-white">3-Click Rule</p>
                  <p className="opacity-70 text-xs">Maximum 3 clicks to any product application.</p>
                </div>
              </li>
              <li className="flex gap-3 text-sm text-indigo-100">
                <Smartphone className="text-[#FFD700] flex-shrink-0" size={18} />
                <div>
                  <p className="font-bold text-white">Mobile Prioritization</p>
                  <p className="opacity-70 text-xs">Navigation optimized for 63% mobile-first base.</p>
                </div>
              </li>
              <li className="flex gap-3 text-sm text-indigo-100">
                <Globe className="text-[#FFD700] flex-shrink-0" size={18} />
                <div>
                  <p className="font-bold text-white">Semantic Logic</p>
                  <p className="opacity-70 text-xs">WCAG 2.1 AA logical reading order.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Traffic Insights</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mobile (iOS/Android)</span>
                <span className="text-xs font-bold text-[#4A9D4A]">63%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full">
                <div className="bg-[#4A9D4A] h-full rounded-full" style={{ width: '63%' }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Desktop Browser</span>
                <span className="text-xs font-bold text-slate-500">37%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden p-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">PSI Federal Sitemap v3.0</h2>
                <p className="text-xs text-slate-500 font-medium">Product-First Hierarchical Modernization</p>
              </div>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-[#0056A4] text-white rounded-xl text-xs font-bold hover:opacity-90 transition shadow-lg shadow-[#0056A4]/20">Approve IA</button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto -ml-6 grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {SITE_MAP.map((node, idx) => (
                <TreeNode key={idx} node={node} depth={0} />
              ))}
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
              <Info className="text-[#0056A4] flex-shrink-0 mt-1" />
              <div>
                <h5 className="font-bold text-slate-900 text-sm mb-1">Architecture Validation</h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The current hierarchy reduces path complexity by 28% compared to the v2.0 baseline. High-conversion nodes (Apply, Join, Mortgage) are elevated to Level 2 in the header contextual strip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteArchitecture;
