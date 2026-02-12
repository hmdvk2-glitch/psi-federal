
import React from 'react';
import { UIPattern } from '../types';
import { Layout, CheckCircle, Clock, AlertTriangle, Layers, Filter } from 'lucide-react';

interface PatternLibraryProps {
  patterns: UIPattern[];
}

const PatternLibrary: React.FC<PatternLibraryProps> = ({ patterns }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Northstar Pattern Library</h2>
          <p className="text-slate-500">Living repository of PSI Federal design standards v4.2</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
            Export DS Tokens
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {patterns.map((pattern) => (
          <div key={pattern.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${
                pattern.status === 'Production' ? 'bg-emerald-50 text-emerald-600' :
                pattern.status === 'Deprecated' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
              }`}>
                <Layout size={24} />
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                pattern.status === 'Production' ? 'bg-emerald-100 text-emerald-600' :
                pattern.status === 'Deprecated' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {pattern.status}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 mb-1">{pattern.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{pattern.category} • v{pattern.version}</p>

            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Last Audited</span>
                <span className="text-slate-900">{pattern.lastAudited}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                  <CheckCircle size={10} /> ADA Compliant
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                  <Layers size={10} /> React Component
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition">
              View Specification
            </button>
          </div>
        ))}

        <div className="bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-indigo-300 transition">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition">
            <AlertTriangle className="text-slate-400" />
          </div>
          <p className="text-sm font-bold text-slate-600">Propose New Pattern</p>
          <p className="text-[10px] text-slate-400 uppercase mt-1 tracking-widest">Requires Peer Review</p>
        </div>
      </div>

      <div className="bg-indigo-900 rounded-[40px] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Design Debt Sentinel</h2>
          <p className="text-indigo-200 mb-8 leading-relaxed">
            Our automated auditing system has reduced design debt by <span className="text-white font-bold">42%</span> since implementation. 
            All new features must pass the **PSI-Audit-NAV** check before moving to the Staging environment.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
              <p className="text-2xl font-black">214</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">Active Components</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
              <p className="text-2xl font-black">12.4k</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">Audits Run YTD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternLibrary;
