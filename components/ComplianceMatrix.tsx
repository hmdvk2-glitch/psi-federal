
import React from 'react';
import { ComplianceRequirement } from '../types';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, Info, Accessibility } from 'lucide-react';

const REQUIREMENTS: ComplianceRequirement[] = [
  { id: '1', category: 'Accessibility', requirement: 'Color contrast ratio ≥ 4.5:1', status: 'PASS', note: 'All text elements validated via Northstar tokens.' },
  { id: '2', category: 'Accessibility', requirement: 'Keyboard Focus Management', status: 'PASS', note: 'Logical focus traps implemented for Mega Menus.' },
  { id: '3', category: 'Regulatory', requirement: 'NCUA Part 707 Disclosures', status: 'PASS', note: 'Integrated into Contextual Strip Layer 3.' },
  { id: '4', category: 'Regulatory', requirement: 'Equal Housing Lender Disclosure', status: 'PASS', note: 'Footer asset standardized across site.' },
  { id: '5', category: 'Experience', requirement: '3-Click Conversion Rule', status: 'FAIL', note: 'Investment services currently require 4 clicks.' },
  { id: '6', category: 'Privacy', requirement: 'CCPA Data Opt-Out', status: 'PASS', note: 'Persistent footer link implemented.' },
];

const ComplianceMatrix: React.FC = () => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-10 border-b border-slate-50 bg-[#F8F9FA]/50 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Accessibility className="text-[#0056A4]" size={28} />
             Regulatory Compliance Matrix
          </h2>
          <p className="text-slate-500 mt-1">Audit status for Northstar Overhaul Project v3.0</p>
        </div>
        <div className="text-right">
           <p className="text-4xl font-black text-[#4A9D4A]">83%</p>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Readiness Score</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
            <tr>
              <th className="px-10 py-5">Requirement</th>
              <th className="px-10 py-5">Category</th>
              <th className="px-10 py-5">Status</th>
              <th className="px-10 py-5">Compliance Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {REQUIREMENTS.map((req) => (
              <tr key={req.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-10 py-6">
                  <p className="font-bold text-slate-900 text-sm">{req.requirement}</p>
                  <p className="text-[10px] text-slate-400 font-medium">REQ-ID: {req.id}</p>
                </td>
                <td className="px-10 py-6">
                   <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                     {req.category}
                   </span>
                </td>
                <td className="px-10 py-6">
                   <div className="flex items-center gap-2">
                     {req.status === 'PASS' ? (
                       <CheckCircle2 className="text-[#4A9D4A]" size={16} />
                     ) : (
                       <ShieldAlert className="text-red-500" size={16} />
                     )}
                     <span className={`text-xs font-black ${req.status === 'PASS' ? 'text-[#4A9D4A]' : 'text-red-500'}`}>
                       {req.status}
                     </span>
                   </div>
                </td>
                <td className="px-10 py-6">
                   <p className="text-xs text-slate-600 italic leading-relaxed max-w-xs group-hover:text-slate-900 transition-colors">"{req.note}"</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-8 bg-slate-900 text-white flex items-start gap-6">
         <Info className="text-indigo-400 flex-shrink-0 mt-1" />
         <div>
            <h4 className="font-bold text-sm mb-1 uppercase tracking-widest text-indigo-300">Auditor's Final Recommendation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The Northstar Overhaul demonstrates exceptional adherence to WCAG 2.1 AA standards. The single failing node (Investment Services Navigation) is scheduled for remediation in Phase 5. The implementation of high-yield rate displays in the Contextual Strip satisfies all NCUA Part 707 requirements.
            </p>
         </div>
      </div>
    </div>
  );
};

export default ComplianceMatrix;
