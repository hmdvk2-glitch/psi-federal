
import React, { useState } from 'react';
import { TrainingPackage, DesignVariant } from '../types';
import { generateTrainingVariants } from '../services/simulationService';
import { GraduationCap, Sparkles, CheckCircle2, XCircle, Lightbulb, ChevronRight, Copy, Code, BookOpen } from 'lucide-react';

interface TrainingSystemProps {
  packages: TrainingPackage[];
  onNewPackage: (p: TrainingPackage) => void;
}

const TrainingSystem: React.FC<TrainingSystemProps> = ({ packages, onNewPackage }) => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePackageId, setActivePackageId] = useState<string | null>(packages[0]?.timestamp || null);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    try {
      const pkg = await generateTrainingVariants(input);
      onNewPackage(pkg);
      setActivePackageId(pkg.timestamp);
      setActiveVariantIndex(0);
      setInput('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const activePackage = packages.find(p => p.timestamp === activePackageId);
  const activeVariant = activePackage?.variants[activeVariantIndex];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Control Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <GraduationCap size={18} className="text-indigo-600" />
              Educational Engine
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Generate training modules for Northstar v4.2 patterns. Each module includes a compliant reference, error analysis, and innovation proposal.
            </p>
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="e.g. Multi-step Loan Form"
                className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !input.trim()}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Package
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-50 bg-slate-50/50">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Training History</h4>
            </div>
            <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
              {packages.map(p => (
                <button
                  key={p.timestamp}
                  onClick={() => setActivePackageId(p.timestamp)}
                  className={`w-full text-left p-4 hover:bg-slate-50 transition ${activePackageId === p.timestamp ? 'bg-indigo-50/50 text-indigo-700' : 'text-slate-600'}`}
                >
                  <p className="font-bold text-sm truncate">{p.patternName}</p>
                  <p className="text-[10px] opacity-60 uppercase font-medium mt-0.5">{new Date(p.timestamp).toLocaleDateString()}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Display Column */}
        <div className="lg:col-span-3 space-y-6">
          {!activePackage ? (
            <div className="h-full flex flex-col items-center justify-center bg-slate-100 border-2 border-dashed border-slate-200 rounded-[40px] p-20 text-center">
              <BookOpen size={48} className="text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">Education Repository Empty</h3>
              <p className="text-slate-500 max-w-xs mx-auto">Generate your first educational variant package using the Northstar engine.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Variant Toggles */}
              <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit">
                {activePackage.variants.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVariantIndex(idx)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      activeVariantIndex === idx 
                        ? 'bg-slate-900 text-white shadow-lg' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {v.type === 'COMPLIANT' && <CheckCircle2 size={14} className="text-emerald-400" />}
                    {v.type === 'ERROR' && <XCircle size={14} className="text-red-400" />}
                    {v.type === 'INNOVATION' && <Lightbulb size={14} className="text-amber-400" />}
                    {v.title}
                  </button>
                ))}
              </div>

              {/* Active Variant Content */}
              {activeVariant && (
                <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                  <div className={`p-8 ${
                    activeVariant.type === 'COMPLIANT' ? 'bg-emerald-50/30' : 
                    activeVariant.type === 'ERROR' ? 'bg-red-50/30' : 'bg-amber-50/30'
                  }`}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              activeVariant.type === 'COMPLIANT' ? 'bg-emerald-100 text-emerald-700' :
                              activeVariant.type === 'ERROR' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                           }`}>
                             {activeVariant.type}
                           </span>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeVariant.patternId}</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{activeVariant.title}</h2>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-slate-400 hover:text-indigo-600 transition"><Copy size={16} /></button>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed max-w-3xl">{activeVariant.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <CheckCircle2 size={14} className="text-indigo-500" />
                          Compliance & Logic
                        </h4>
                        <ul className="space-y-3">
                          {activeVariant.complianceNotes.map((note, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-slate-700">
                              <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">{idx + 1}</span>
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {activeVariant.businessImpact && (
                        <div className="p-5 bg-slate-900 rounded-3xl text-white">
                          <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Impact Analysis</h4>
                          <p className="text-sm leading-relaxed text-slate-300 italic">"{activeVariant.businessImpact}"</p>
                        </div>
                      )}

                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">QA Validation</h4>
                        <div className="space-y-2">
                          {activeVariant.qaChecklist.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs text-slate-600">
                              <input type="checkbox" checked={activeVariant.type === 'COMPLIANT'} readOnly className="rounded border-slate-300 bg-white" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center px-4">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Code size={14} /> React / TypeScript
                        </h4>
                        <span className="text-[10px] font-mono text-indigo-500">v4.2-STABLE</span>
                      </div>
                      <div className="bg-slate-900 rounded-3xl p-6 font-mono text-xs text-indigo-300 overflow-x-auto h-[400px] shadow-xl">
                        <pre className="whitespace-pre-wrap">{activeVariant.codeSnippet}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingSystem;
