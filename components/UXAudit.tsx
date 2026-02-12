
import React, { useState } from 'react';
import { AuditReport } from '../types';
import { performUXAudit } from '../services/simulationService';
import { Search, ShieldCheck, ShieldAlert, Smartphone, Clock, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';

interface UXAuditProps {
  reports: AuditReport[];
  onNewReport: (r: AuditReport) => void;
}

const UXAudit: React.FC<UXAuditProps> = ({ reports, onNewReport }) => {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAudit = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    try {
      const report = await performUXAudit(input);
      onNewReport(report);
      setInput('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-500" />
            New Pattern Audit
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Submit a UI pattern description, Figma link, or accessibility query for NCUA/ADA validation.
          </p>
          <div className="space-y-4">
            <textarea
              className="w-full h-32 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 transition outline-none resize-none"
              placeholder="Example: 'A mega menu for a financial dashboard with 3-tier hierarchy and mobile hamburger adaptation...'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleAudit}
              disabled={isAnalyzing || !input.trim()}
              className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-50 shadow-lg shadow-indigo-600/10"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing Pattern...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Run PSI-Audit-NAV
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h4 className="font-bold mb-4 flex items-center gap-2 relative z-10">
            <ShieldCheck className="text-indigo-400" />
            Compliance Thresholds
          </h4>
          <div className="space-y-4 relative z-10">
            <ThresholdItem label="ADA WCAG 2.1 AA" status="Required" />
            <ThresholdItem label="NCUA Disclosure Part 707" status="Mandatory" />
            <ThresholdItem label="CCPA Privacy Policy" status="Enabled" />
            <ThresholdItem label="Mobile Touch Target (44px)" status="Required" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Audit Intelligence Feed</h2>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            {reports.length} Reports Generated
          </span>
        </div>

        {reports.length === 0 ? (
          <div className="bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-900">No Audits Performed</h3>
            <p className="text-slate-500 text-sm">Submit your first UI pattern for a simulation-based regulatory audit.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-200 transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          report.status === 'Approved' ? 'bg-emerald-100 text-emerald-600' : 
                          report.status === 'Failed' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {report.status}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500 font-mono">{report.id}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg">{report.patternName}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900">{report.alignmentScore}%</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alignment Score</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                        <Smartphone size={12} /> Mobile Readiness
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">{report.mobileReadiness}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                        <AlertCircle size={12} /> Critical Issues
                      </p>
                      <ul className="text-xs text-red-600 space-y-1">
                        {report.criticalIssues.length > 0 ? report.criticalIssues.map((issue, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                             <span className="mt-1 w-1 h-1 bg-red-400 rounded-full flex-shrink-0"></span>
                             {issue}
                          </li>
                        )) : <li className="text-emerald-600">No critical issues detected.</li>}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {report.complianceChecklist.map((item, idx) => (
                      <span key={idx} className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                        item.passed ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                      }`}>
                        {item.passed ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
                        {item.label}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                      Analyzed on {new Date(report.timestamp).toLocaleDateString()}
                    </p>
                    <button className="text-indigo-600 text-xs font-bold flex items-center gap-1 hover:underline">
                      Full Remediation Plan <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ThresholdItem: React.FC<{ label: string; status: string }> = ({ label, status }) => (
  <div className="flex justify-between items-center text-xs py-2 border-b border-indigo-500/20 last:border-0">
    <span className="text-indigo-200">{label}</span>
    <span className="font-bold text-white">{status}</span>
  </div>
);

export default UXAudit;
