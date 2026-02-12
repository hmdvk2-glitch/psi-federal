
import React from 'react';
import { FraudAlert, Transaction, FraudRisk } from '../types';
import { ShieldAlert, CheckCircle2, AlertOctagon, Info } from 'lucide-react';

interface FraudPanelProps {
  alerts: FraudAlert[];
  transactions: Transaction[];
  onDismiss: (id: string) => void;
}

const FraudPanel: React.FC<FraudPanelProps> = ({ alerts, transactions, onDismiss }) => {
  const activeAlerts = alerts.filter(a => !a.isDismissed);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShieldAlert className="text-red-500" />
          Active Intelligence Alerts
        </h2>

        {activeAlerts.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center">
            <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
            <h3 className="text-lg font-bold text-emerald-900">System Clean</h3>
            <p className="text-emerald-700">No active suspicious activities detected by the simulation engine.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map(alert => {
              const txn = transactions.find(t => t.id === alert.transactionId);
              return (
                <div key={alert.id} className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-red-500 border border-slate-200 flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    alert.severity === FraudRisk.CRITICAL ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <AlertOctagon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900">{alert.reason}</h4>
                        <p className="text-xs text-slate-500 mt-1">
                          Detected {new Date(alert.timestamp).toLocaleTimeString()} • Transaction {alert.transactionId}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        alert.severity === FraudRisk.CRITICAL ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    {txn && (
                      <div className="mt-4 bg-slate-50 rounded-xl p-3 flex items-center justify-between text-sm">
                        <span className="text-slate-600">{txn.type} to {txn.counterparty || 'External Node'}</span>
                        <span className="font-bold text-slate-900">${txn.amount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="mt-4 flex gap-3">
                      <button 
                        onClick={() => onDismiss(alert.id)}
                        className="px-4 py-2 text-sm font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition shadow-sm"
                      >
                        Initiate Freeze
                      </button>
                      <button 
                        onClick={() => onDismiss(alert.id)}
                        className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                      >
                        Dismiss False Positive
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Info size={18} className="text-indigo-400" />
            Detection Parameters
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">ML Confidence Threshold</span>
              <span className="font-bold text-indigo-400">85%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: '85%' }}></div>
            </div>
            <div className="pt-4 space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800" />
                Geographical Anomaly Detection
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800" />
                Velocity Monitoring (72h)
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" checked readOnly className="rounded border-slate-700 bg-slate-800" />
                SAR Automation Enabled
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-4">Risk Distribution</h3>
          <div className="space-y-4 text-sm">
             <div className="flex justify-between items-center">
               <span className="text-slate-600">AML Alerts</span>
               <span className="font-bold text-slate-900">12</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-slate-600">ID Theft Flags</span>
               <span className="font-bold text-slate-900">4</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-slate-600">Card Not Present</span>
               <span className="font-bold text-slate-900">28</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudPanel;
